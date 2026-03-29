import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import UniversityDetail from "@/models/UniversityDetail";
import { isAdmin } from "@/lib/isAdmin";

// 🟢 GET: Single University Detail by Slug
export async function GET(req, { params }) {
  try {
    const { slug } = await params;
    await connectDB();

    const data = await UniversityDetail.findOne({ slug });

    if (!data) {
      return NextResponse.json({ success: false, message: "Details not found for this university" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// ❌ DELETE: Remove Deep Details
export async function DELETE(req, { params }) {
  try {
    const { slug } = await params;
    await connectDB();

    const auth = isAdmin(req);
    if (!auth.ok) return auth.response;

    const deleted = await UniversityDetail.findOneAndDelete({ slug });

    if (!deleted) {
      return NextResponse.json({ error: "Details not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "University details deleted successfully 🗑️" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}