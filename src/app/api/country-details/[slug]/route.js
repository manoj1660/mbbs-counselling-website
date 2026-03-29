import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import CountryDetail from "@/models/CountryDetail";
// api/country-details/[slug]/route.js
export async function GET(req, { params }) {
  try {
    // In Next.js 15/16, params is a Promise
    const resolvedParams = await params; 
    const countrySlug = resolvedParams.slug; // This must match the [slug] folder name

    await connectDB();

    const country = await CountryDetail.findOne({
      slug: countrySlug,
    });

    if (!country) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: country });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}