import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Country from "@/models/Country";
import cloudinary from "@/lib/cloudinary";
import { isAdmin } from "@/lib/isAdmin"; // ✅ use this
export async function POST(req) {
  try {
    await connectDB();

    const auth = isAdmin(req);
    if (!auth.ok) {
      return auth.response; // ✅ IMPORTANT
    }

    // ✅ Continue logic
    const formData = await req.formData();

    const file = formData.get("file");
    const name = formData.get("name");
    const slug = formData.get("slug");
    const fee = formData.get("fee");
    const students = formData.get("students");
    const isTop = formData.get("isTop") === "true";

    if (!file) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // Convert file → buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadRes = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "mission_global/countries" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });

    // Save to DB
    const newCountry = await Country.create({
      name,
      slug,
      fee,
      students,
      isTop,
      image: uploadRes.secure_url,
    });

    return NextResponse.json(newCountry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
