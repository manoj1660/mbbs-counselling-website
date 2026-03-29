import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import UniversityDetail from "@/models/UniversityDetail";
import { isAdmin } from "@/lib/isAdmin";

export async function POST(req) {
  try {
    await connectDB();

    const auth = isAdmin(req);
    if (!auth.ok) return auth.response;

    const body = await req.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json({ error: "University Slug is required" }, { status: 400 });
    }

    // CREATE OR UPDATE (Upsert)
    const data = await UniversityDetail.findOneAndUpdate(
      { slug },
      { ...body, updatedAt: Date.now() },
      { new: true, upsert: true, runValidators: true }
    );

    return NextResponse.json({ 
      success: true, 
      message: "University details published successfully! ✅",
      data 
    }, { status: 200 });

  } catch (error) {
    console.error("ADMIN_DETAILS_POST_ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}