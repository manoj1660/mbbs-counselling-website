import { NextResponse } from "next/server";
import { verifyToken } from "./auth";

export function isAdmin(req) {
  const token = req.cookies.get("token")?.value;

  // ❌ Not logged in → login page
  if (!token) {
    return {
      ok: false,
      response: NextResponse.redirect(new URL("/login", req.url)),
    };
  }

  const user = verifyToken(token);

  // ❌ Invalid token → login
  if (!user) {
    return {
      ok: false,
      response: NextResponse.redirect(new URL("/login", req.url)),
    };
  }

  // ❌ Not admin → home page
  if (user.role !== "admin") {
    return {
      ok: false,
      response: NextResponse.redirect(new URL("/", req.url)),
    };
  }

  // ✅ Admin
  return { ok: true, user };
}