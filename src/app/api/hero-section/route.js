import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import HeroSection from "@/models/UniversityHeroSection";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");

  try {
    const data = await HeroSection.findOne({ page });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Error fetching" }, { status: 500 });
  }
}