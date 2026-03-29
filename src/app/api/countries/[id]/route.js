import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Country from "@/models/Country";

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    // Yahan hum database se entry delete kar rahe hain
    const deletedCountry = await Country.findByIdAndDelete(id);

    if (!deletedCountry) {
      return NextResponse.json({ error: "Country nahi mili" }, { status: 404 });
    }

    return NextResponse.json({ message: "Country deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}