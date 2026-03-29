import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import UniversityDetail from "@/models/UniversityDetail";

// 🌐 GET: Fetch University Details (Used by Admin & Public User)
export async function GET(req, { params }) {
  try {
    // Next.js 15/16 mein params ek Promise hota hai
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Slug is missing" },
        { status: 400 }
      );
    }

    await connectDB();

    // Database se details find karna
    const university = await UniversityDetail.findOne({ slug });

    if (!university) {
      return NextResponse.json(
        { success: false, message: "University details not found" },
        { status: 404 }
      );
    }

    // Success Response
    return NextResponse.json({
      success: true,
      data: university
    });

  } catch (error) {
    console.error("GET_UNIVERSITY_DETAIL_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}