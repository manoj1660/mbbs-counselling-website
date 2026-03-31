import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import CountryDetail from "@/models/CountryDetail";
import { isAdmin } from "@/lib/isAdmin";

// ✅ GET (single country detail)
export async function GET(req, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params; // Next.js 15+ compatibility

    const data = await CountryDetail.findOne({
      slug: resolvedParams.slug,
    });

    if (!data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Frontend ko standard format mein data bhejne ke liye success wrapper
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 🟡 PUT (UPDATE country detail)
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;

    // 🔐 Admin check (Await if it's an async function)
    const auth = await isAdmin(req);
    if (!auth.ok) return auth.response;

    const body = await req.json();

    const updated = await CountryDetail.findOneAndUpdate(
      { slug: resolvedParams.slug },
      {
        $set: {
          title: body.title,
          image: body.image,
          heroText: body.heroText,
          description: body.description,
          feeRange: body.feeRange,
          stats: body.stats,
          whyStudy: body.whyStudy,
          eligibility: body.eligibility,
          // 🚀 IMPORTANT: SEO Update add kar diya
          seo: {
            metaTitle: body.seo?.metaTitle || "",
            metaDescription: body.seo?.metaDescription || "",
            keywords: body.seo?.keywords || []
          }
        }
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Country not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Updated successfully ✅",
    });

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ❌ DELETE
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const resolvedParams = await params;

    const auth = await isAdmin(req);
    if (!auth.ok) return auth.response;

    const deleted = await CountryDetail.findOneAndDelete({
      slug: resolvedParams.slug,
    });

    if (!deleted) {
      return NextResponse.json({ error: "Country not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Deleted successfully 🗑️",
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}