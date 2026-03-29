import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Debug header response
  let res = NextResponse.next();

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const user = verifyToken(token);

      if (!user || user.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }

      // ✅ Success
      return res;
    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};