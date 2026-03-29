import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Country from "@/models/Country";
import cloudinary from "@/lib/cloudinary";
import { isAdmin } from "@/lib/isAdmin"; // ✅

/**
 * ==========================================
 * 1. GET: Admin Only (Edit Page)
 * ==========================================
 */
export async function GET(req, { params }) {
  try {
    await connectDB();

    // 🔐 Admin Check
    const auth = isAdmin(req);
    if (!auth.ok) return auth.response;

    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "ID missing hai" }, { status: 400 });
    }

    const country = await Country.findById(id);

    if (!country) {
      return NextResponse.json(
        { error: "Country DB mein nahi mili" },
        { status: 404 }
      );
    }

    return NextResponse.json(country);

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

/**
 * ==========================================
 * 2. PUT: Admin Only
 * ==========================================
 */
export async function PUT(req, { params }) {
  try {
    await connectDB();

    const auth = isAdmin(req);
    if (!auth.ok) return auth.response;

    const { id } = await params;
    const formData = await req.formData();

    const updateData = {
      name: formData.get("name"),
      slug: formData.get("slug"),
      fee: formData.get("fee"),
      students: formData.get("students"),
      isTop: formData.get("isTop") === "true",
    };

    const file = formData.get("file");

    if (file && typeof file !== "string" && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadRes = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "mission_global/countries",
            public_id: `country_${updateData.slug || id}`,
            overwrite: true,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      updateData.image = uploadRes.secure_url;
    }

    const updatedCountry = await Country.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCountry) {
      return NextResponse.json({ error: "Country not found" }, { status: 404 });
    }

    return NextResponse.json(updatedCountry);

  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Slug already exists!" },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * ==========================================
 * 3. DELETE: Admin Only
 * ==========================================
 */
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const auth = isAdmin(req);
    if (!auth.ok) return auth.response;

    const { id } = await params;

    const country = await Country.findById(id);
    if (!country) {
      return NextResponse.json(
        { error: "Country nahi mili!" },
        { status: 404 }
      );
    }

    if (country.image) {
      try {
        const publicId = `mission_global/countries/country_${country.slug}`;
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error("Cloudinary error:", err.message);
      }
    }

    await Country.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted successfully!" });

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}