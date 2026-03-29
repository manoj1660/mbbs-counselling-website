import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import University from "@/models/University";
import cloudinary from "@/lib/cloudinary";
import { isAdmin } from "@/lib/isAdmin";

export async function POST(req) {
  try {
    await connectDB();
    
    // 1. Admin Authorization Check
    const auth = isAdmin(req);
    if (!auth.ok) return auth.response;

    const formData = await req.formData();
    const id = formData.get("id"); // MongoDB _id (Edit page se aayega)
    const file = formData.get("file"); // New image file (Optional)
    
    // 2. Prepare Data Object (Fields update karne ke liye)
    const uniData = {
      name: formData.get("name"),
      slug: formData.get("slug"),
      country: formData.get("country")?.toLowerCase(),
      location: formData.get("location"),
      established: formData.get("established"),
      ranking: formData.get("ranking"),
      fee: formData.get("fee"),
      tags: JSON.parse(formData.get("tags") || "[]"),
    };

    // 3. Handle Image Upload (ONLY if a new file is provided)
    if (file && file instanceof File && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "mission_global/universities" },
          (error, result) => (error ? reject(error) : resolve(result))
        ).end(buffer);
      });
      
      uniData.image = uploadRes.secure_url; // Set new Cloudinary URL
    }
    // Note: Agar file nahi hai, toh uniData.image undefined rahega, 
    // findByIdAndUpdate ise touch nahi karega (purani image safe rahegi).

    let result;
    if (id) {
      // 🔄 UPDATE MODE
      // { new: true } se updated document return hota hai result mein
      result = await University.findByIdAndUpdate(
        id, 
        { $set: uniData }, 
        { new: true, runValidators: true }
      );
      
      if (!result) {
        return NextResponse.json({ error: "University not found to update" }, { status: 404 });
      }
    } else {
      // ✨ CREATE MODE
      // Check for duplicate slug before creating
      const existing = await University.findOne({ slug: uniData.slug });
      if (existing) {
        return NextResponse.json({ error: "Slug already exists!" }, { status: 400 });
      }
      result = await University.create(uniData);
    }

    return NextResponse.json({ 
      success: true, 
      message: id ? "University updated successfully" : "University created successfully",
      data: result 
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}