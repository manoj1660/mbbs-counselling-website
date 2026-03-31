import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import PageSetting from "@/models/PageSetting";
import { isAdmin } from "@/lib/isAdmin";

// ✅ 1. GET Method: Data fetch karne ke liye (Admin panel load hote waqt)
export async function GET(req) {
  try {
    await connectDB();
    
    // URL se pageName nikalna (e.g., ?pageName=universities-main)
    const { searchParams } = new URL(req.url);
    const pageName = searchParams.get("pageName");

    if (!pageName) {
      return NextResponse.json({ error: "Page name is required" }, { status: 400 });
    }

    const data = await PageSetting.findOne({ pageName }).lean();
    
    // Agar data nahi milta toh khali object bhejdo bajaye error ke
    return NextResponse.json({ success: true, data: data || null });
  } catch (error) {
    console.error("GET SETTINGS ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ 2. POST Method: Data save/update karne ke liye
export async function POST(req) {
  try {
    await connectDB();

    const auth = await isAdmin(req);
    if (!auth.ok) return auth.response;

    const body = await req.json();
    const { pageName, seo } = body;

    if (!pageName) {
      return NextResponse.json({ error: "Page name is required" }, { status: 400 });
    }

    // Upsert: true matlab agar pageName nahi mila toh naya bana dega
    const updated = await PageSetting.findOneAndUpdate(
      { pageName },
      { $set: { pageName, seo } },
      { upsert: true, new: true, runValidators: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("POST SETTINGS ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}