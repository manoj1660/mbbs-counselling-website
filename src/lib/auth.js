import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export function signToken(user) {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email
    },
    SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}

// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET;

// if (!JWT_SECRET) {
//   throw new Error("Please define the JWT_SECRET environment variable");
// }

// // Generate JWT
// export const generateToken = (user) => {
//   return jwt.sign(
//     { id: user._id, role: user.role },
//     JWT_SECRET,
//     { expiresIn: "7d" } // token valid for 7 days
//   );
// };

// // Verify JWT
// export const verifyToken = (token) => {
//   return jwt.verify(token, JWT_SECRET);
// };