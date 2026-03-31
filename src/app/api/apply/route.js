import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Lead from "@/models/Lead";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // 1. Save to MongoDB
    const newLead = await Lead.create(body);

    // 2. Forward to Google Sheets (Silent Background Request)
    const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxm2cQl_q2DC4oYMuJ4TzzdJfKjRrX3I8fsVa5MzIdzvmpQlaWzLOV0rWmmTo00a-pF_w/exec";
    
    fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).catch(err => console.error("Sheet Error:", err)); 

    return NextResponse.json({ success: true, data: newLead }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}