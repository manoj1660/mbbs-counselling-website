import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Country from '@/models/Country';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function POST(req) {
  try {
    // 1. Authentication & Role Check
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    if (payload.role !== 'admin') return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await connectDB();

    // 2. Parse Form Data (Better for Image Uploads)
    const formData = await req.formData();
    const file = formData.get('image');
    const name = formData.get('name');
    const slug = formData.get('slug');
    const students = formData.get('students');
    const fee = formData.get('fee');
    const isTop = formData.get('isTop') === 'true';

    if (!file) return NextResponse.json({ error: "Image is required" }, { status: 400 });

    // 3. Convert File to Buffer for Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 4. Upload to Cloudinary
    const cloudinaryRes = await uploadToCloudinary(buffer, 'mission_global/countries');

    // 5. Save to MongoDB
    const newCountry = await Country.create({
      name,
      slug,
      students,
      fee,
      image: cloudinaryRes.secure_url,
      cloudinaryId: cloudinaryRes.public_id,
      isTop,
    });

    return NextResponse.json({ message: "Country added!", data: newCountry }, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}