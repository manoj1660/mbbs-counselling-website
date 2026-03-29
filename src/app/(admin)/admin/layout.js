import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const SECRET = process.env.JWT_SECRET;

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies(); // ✅ FIX
  const token = cookieStore.get("token")?.value;

  // ❌ Not logged in
  if (!token) {
    redirect("/login");
  }

  try {
    const user = jwt.verify(token, SECRET);

    // ❌ Not admin
    if (user.role !== "admin") {
      redirect("/");
    }

  } catch (err) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-5">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <ul className="space-y-3">
          <li><a href="/admin">Dashboard</a></li>
          <li><a href="/admin/countries">Countries</a></li>
          <li><a href="/admin/universities">Universities</a></li>
          <li><a href="/admin/users">Users</a></li>
          <li><a href="/admin/settings">Settings</a></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}