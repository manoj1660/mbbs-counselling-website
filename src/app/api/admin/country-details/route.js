import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import CountryDetail from "@/models/CountryDetail";
import cloudinary from "@/lib/cloudinary";
import { isAdmin } from "@/lib/isAdmin";

export async function POST(req) {
  try {
    await connectDB();

    const auth = isAdmin(req);
    if (!auth.ok) return auth.response;

    const formData = await req.formData();

    // TEXT FIELDS
    const slug = formData.get("slug");
    const title = formData.get("title");
    const heroText = formData.get("heroText");
    const description = formData.get("description");
    const feeRange = formData.get("feeRange");

    // STATS
    const students = formData.get("students");
    const colleges = formData.get("colleges");
    const medium = formData.get("medium");

    // ELIGIBILITY
    const pcb = formData.get("pcb");
    const age = formData.get("age");
    const neet = formData.get("neet");

    // ARRAY (whyStudy)
    const whyStudy = JSON.parse(formData.get("whyStudy") || "[]");

    // IMAGE (optional for update)
    const file = formData.get("file");

    let imageUrl;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "mission_global/country-details" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });

      imageUrl = uploadRes.secure_url;
    }

    // CREATE OR UPDATE
    const existing = await CountryDetail.findOne({ slug });

    let data;

    if (existing) {
      data = await CountryDetail.findOneAndUpdate(
        { slug },
        {
          title,
          heroText,
          description,
          feeRange,
          stats: { students, colleges, medium },
          eligibility: { pcb, age, neet },
          whyStudy,
          ...(imageUrl && { image: imageUrl }),
        },
        { new: true }
      );
    } else {
      data = await CountryDetail.create({
        slug,
        title,
        heroText,
        description,
        feeRange,
        stats: { students, colleges, medium },
        eligibility: { pcb, age, neet },
        whyStudy,
        image: imageUrl,
      });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}