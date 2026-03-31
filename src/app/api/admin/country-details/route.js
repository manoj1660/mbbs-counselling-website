import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import CountryDetail from "@/models/CountryDetail";
import cloudinary from "@/lib/cloudinary";
import { isAdmin } from "@/lib/isAdmin";

export async function POST(req) {
  try {
    await connectDB();

    // 1. Authorization Check
    const auth = await isAdmin(req); 
    if (!auth.ok) return auth.response;

    const formData = await req.formData();

    // 2. Fetching Basic Data
    const slug = formData.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    // 3. Array & SEO Data Parsing (Safe Parsing)
    let whyStudy = [];
    let seoData = { metaTitle: "", metaDescription: "", keywords: [] };

    try {
      whyStudy = JSON.parse(formData.get("whyStudy") || "[]");
      seoData = JSON.parse(formData.get("seo") || "{}");
    } catch (e) {
      console.error("JSON Parsing Error:", e);
    }

    // 4. Image Processing
    const file = formData.get("file");
    let imageUrl;

    if (file && typeof file !== "string" && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadRes = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { 
            folder: "mission_global/country-details",
            resource_type: "auto" 
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });
      imageUrl = uploadRes.secure_url;
    }

    // 5. Constructing Update Object (Matching Schema exactly)
    const updateData = {
      title: formData.get("title") || "",
      heroText: formData.get("heroText") || "",
      description: formData.get("description") || "",
      feeRange: formData.get("feeRange") || "",
      stats: {
        students: formData.get("students") || "",
        colleges: formData.get("colleges") || "",
        medium: formData.get("medium") || "English",
      },
      eligibility: {
        pcb: formData.get("pcb") || "",
        age: formData.get("age") || "",
        neet: formData.get("neet") || "",
      },
      whyStudy: whyStudy,
      seo: {
        metaTitle: seoData.metaTitle || "",
        metaDescription: seoData.metaDescription || "",
        keywords: seoData.keywords || [],
      },
    };

    // If a new image was uploaded, add it to the update
    if (imageUrl) {
      updateData.image = imageUrl;
    }

    // 6. DB Operation (Update if exists, Create if not)
    const data = await CountryDetail.findOneAndUpdate(
      { slug: slug },
      { $set: updateData }, // $set use karna safe hota hai
      { new: true, upsert: true, runValidators: true }
    );

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error) {
    console.error("Critical Backend Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error: " + error.message },
      { status: 500 }
    );
  }
}