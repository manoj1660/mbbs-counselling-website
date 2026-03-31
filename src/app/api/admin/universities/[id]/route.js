import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import University from "@/models/University";
import { isAdmin } from "@/lib/isAdmin";

// 🔍 GET: Single University Details for Edit Page
export async function GET(req, { params }) {
  try {
    await connectDB();

    // ✅ Next.js 15 Fix: params ko await karna zaroori hai
    const resolvedParams = await params;
    const id = resolvedParams.id;

    // Validate if ID is provided
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const uni = await University.findById(id);

    if (!uni) {
      return NextResponse.json({ error: "University not found" }, { status: 404 });
    }

    return NextResponse.json(uni);
  } catch (err) {
    console.error("Fetch Error:", err);
    return NextResponse.json({ error: "Server error while fetching" }, { status: 500 });
  }
}

// 🗑️ DELETE: Remove University from DB
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    
    // Admin check
    const auth = isAdmin(req);
    if (!auth.ok) return auth.response;

    // ✅ Next.js 15 Fix: params ko await karein
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const deletedUni = await University.findByIdAndDelete(id);

    if (!deletedUni) {
      return NextResponse.json({ error: "University not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}


// 🌟 PATCH: Update specific fields (like isFeatured)
export async function PATCH(req, { params }) {
  try {
    await connectDB();

    // Admin check
    const auth = isAdmin(req);
    if (!auth.ok) return auth.response;

    // Next.js 15 Fix
    const { id } = await params;
    
    // Request body se data nikalein
    const body = await req.json();
    const { isFeatured } = body;

    // Sirf isFeatured field ko update karein
    const updatedUni = await University.findByIdAndUpdate(
      id,
      { isFeatured },
      { new: true } // Updated document wapas chahiye
    );

    if (!updatedUni) {
      return NextResponse.json({ error: "University not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      message: "Status updated", 
      isFeatured: updatedUni.isFeatured 
    });

  } catch (err) {
    console.error("Patch Error:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}