import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return Response.json({ user: null });
  }

  const user = verifyToken(token);

  if (!user) {
    return Response.json({ user: null });
  }

  return Response.json({ user });
}