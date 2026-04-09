"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Loader2, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- FIXED UI CLASSES (Hardcoded colors for visibility) ---
  const inputBaseClass = "w-full pl-12 pr-4 py-4 bg-white text-[#0f172a] border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-blue-100 border border-slate-100 relative overflow-hidden"
      >
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-[4rem] -mr-10 -mt-10"></div>

        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200">
            <ShieldCheck className="text-white" size={32} />
          </div>
          
          <h2 className="text-3xl font-black text-[#0f172a] mb-2">Welcome Back</h2>
          <p className="text-slate-500 mb-10 font-medium">Please enter your details to login</p>

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="email"
                required
                placeholder="Email Address"
                className={inputBaseClass}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="password"
                required
                placeholder="Password"
                className={inputBaseClass}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 active:scale-95"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Sign In</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest mt-6 font-bold">
              Authorized Personnel Access Only
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}