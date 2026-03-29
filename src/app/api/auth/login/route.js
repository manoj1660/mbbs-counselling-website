import connectDB from "@/lib/db"; 
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 400 }
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 400 }
    );
  }

  const token = signToken(user);

  // ✅ IMPORTANT FIX
  const response = NextResponse.json({
    message: "Login success",
    role: user.role,
  });

  response.cookies.set("token", token, {
  httpOnly: true,
  path: "/",
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 7, // ✅ 7 days login
});

  return response;
}