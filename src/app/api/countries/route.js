import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Country from '@/models/Country';

export async function GET() {
  await connectDB();
  try {
    const countries = await Country.find({}).sort({ isTop: -1, createdAt: -1 });
    return NextResponse.json(countries);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}