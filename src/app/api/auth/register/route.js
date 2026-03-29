import  connectDB  from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();

  const { username, email, password, role } = await req.json();

  const existing = await User.findOne({ email });
  if (existing) {
    return Response.json({ message: "User exists" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashed,
    role: role || "user"
  });

  return Response.json({ message: "User created", user });
}









// import bcrypt from "bcryptjs";
// import User from "@/models/User.js";
// import connectDB from "@/lib/db.js";
// import { generateToken } from "@/lib/auth.js";

// const JWT_SECRET = process.env.JWT_SECRET;

// // Make sure DB is connected
// await connectDB();

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { username, email, password } = body;

//     if (!username || !email || !password) {
//       return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return new Response(JSON.stringify({ message: "Email already exists" }), { status: 400 });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({ username, email, password: hashedPassword });

//     const token = generateToken(user); // your JWT helper

//     return new Response(
//       JSON.stringify({
//         token,
//         user: { id: user._id, username, email, role: user.role },
//       }),
//       { status: 201 }
//     );
//   } catch (err) {
//     console.error(err);
//     return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
//   }
// }