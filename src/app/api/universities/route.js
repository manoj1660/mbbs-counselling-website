import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import University from "@/models/University";
import cloudinary from "@/lib/cloudinary";
import { isAdmin } from "@/lib/isAdmin";

// ✅ PUBLIC GET: Fetch all or filter by country
export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const country = searchParams.get("country");

    const query = country ? { country: country.toLowerCase() } : {};
    const universities = await University.find(query).sort({ createdAt: -1 });

    return NextResponse.json(universities, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// 🔐 ADMIN POST: Create or Update University
export async function POST(req) {
  try {
    await connectDB();
    const auth = isAdmin(req);
    if (!auth.ok) return auth.response;

    const formData = await req.formData();
    const id = formData.get("id"); // MongoDB _id for updates
    const slug = formData.get("slug");
    const file = formData.get("file");
    
    // Prepare Data Object
    const uniData = {
      name: formData.get("name"),
      slug: slug,
      country: formData.get("country").toLowerCase(),
      location: formData.get("location"),
      established: formData.get("established"),
      ranking: formData.get("ranking"),
      fee: formData.get("fee"),
      tags: JSON.parse(formData.get("tags") || "[]"),
    };

    // Handle Image Upload if a new file is provided
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "mission_global/universities" },
          (error, result) => (error ? reject(error) : resolve(result))
        ).end(buffer);
      });
      uniData.image = uploadRes.secure_url;
    }

    let result;
    if (id) {
      result = await University.findByIdAndUpdate(id, uniData, { new: true });
    } else {
      result = await University.create(uniData);
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}