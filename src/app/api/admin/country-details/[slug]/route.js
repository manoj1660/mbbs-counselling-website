import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import CountryDetail from "@/models/CountryDetail";
import { isAdmin } from "@/lib/isAdmin";


// ✅ GET (single country detail)
export async function GET(req, { params }) {
  try {
    await connectDB();

    const data = await CountryDetail.findOne({
      slug: params.slug,
    });

    if (!data) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


// 🟡 PUT (UPDATE country detail)
export async function PUT(req, { params }) {
  try {
    await connectDB();

    // 🔐 Admin check
    const auth = isAdmin(req);
    if (!auth.ok) return auth.response;

    const body = await req.json();

    const updated = await CountryDetail.findOneAndUpdate(
      { slug: params.slug },
      {
        title: body.title,
        image: body.image,
        heroText: body.heroText,
        description: body.description,
        feeRange: body.feeRange,

        // 🧠 complex fields
        stats: body.stats,
        whyStudy: body.whyStudy,
        eligibility: body.eligibility,
      },
      { new: true } // return updated doc
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Country not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Updated successfully ✅",
    });

  } catch (error) {
    console.error("UPDATE ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


// ❌ DELETE
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const auth = isAdmin(req);
    if (!auth.ok) return auth.response;

    const deleted = await CountryDetail.findOneAndDelete({
      slug: params.slug,
    });

    if (!deleted) {
      return NextResponse.json(
        { error: "Country not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Deleted successfully 🗑️",
    });

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}