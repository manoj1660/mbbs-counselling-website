import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import HeroSection from "@/models/UniversityHeroSection";

export async function POST(req) {
  await connectDB();

  try {
    const { page, content } = await req.json();

    const updated = await HeroSection.findOneAndUpdate(
      { page },
      { content },
      { upsert: true, new: true }
    );

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}