"use client";

import { useState, useEffect } from "react"; // 1. Hook add kiya
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import LayoutTextFlipDemo from "./layout-text-flip-demo";
import { HeroVideoDialogDemoTopInBottomOut } from "./HeroVideoDialogDemoTopInBottomOut";
import { Sparkles, ArrowRight, MousePointerClick } from "lucide-react";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false); // 2. Mount state
  const { scrollY } = useScroll();

  // 3. Smooth spring animations (optional but better for parallax)
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30 });

  const yHeading = useTransform(smoothY, [0, 600], [0, -100]);
  const yText = useTransform(smoothY, [0, 600], [0, -60]);
  const yButtons = useTransform(smoothY, [0, 600], [0, -30]);
  const yVideo = useTransform(smoothY, [0, 800], [0, -50]);

  // 4. Hydration Fix
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white py-20">
      {/* --- SUBTLE DECORATION --- */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        suppressHydrationWarning
      >
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 pt-10 text-center">
        {/* --- 1. PREMIUM BADGE --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-8"
        >
          <div className="px-4 py-1.5 rounded-full border border-blue-200 bg-white shadow-sm flex items-center gap-2">
            <Sparkles size={14} className="text-blue-600" />
            <span className="text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase">
              NMC Approved Universities 2026
            </span>
          </div>
        </motion.div>
        <a
          href="/mbbsbroucher.pdf"
          // download="mbbsbroucher.pdf"
          className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-b from-amber-300 via-amber-400 to-yellow-500 px-7 py-4 text-sm font-bold text-neutral-950 tracking-wide transition-all duration-300 ease-out active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(251,191,36,0.8)]"
        >
          {/* Intense Multi-layer Background Glow Effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

          {/* Flowing Laser Light Streak (Shimmer Effect) */}
          <span
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"
            style={{ transform: "skewX(-20deg)" }}
          />

          {/* Premium Download SVG Icon */}
          <svg
            className="h-5 w-5 text-neutral-950 transition-transform duration-300 group-hover:translate-y-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>

          <span className="relative z-10">DOWNLOAD OFFICIAL BROCHURE</span>

          {/* Extra Glowing Pulse Indicator */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-950 opacity-40"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-neutral-950"></span>
          </span>
        </a>
        {/* --- 2. HEADING (Added Mount Check for Parallax Style) --- */}
        <motion.div
          style={{ y: mounted ? yHeading : 0 }} // 5. Only apply parallax after mount
          className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight"
        >
          <LayoutTextFlipDemo />
        </motion.div>

        {/* --- 3. DESCRIPTION --- */}
        <motion.p
          style={{ y: mounted ? yText : 0 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
        >
          Empowering medical aspirants with
          <span className="text-blue-600 font-bold"> direct admissions </span>
          and transparent guidance for MBBS in Russia, Kazakhstan, & beyond.
        </motion.p>

        {/* --- 4. BUTTONS --- */}
        <motion.div
          style={{ y: mounted ? yButtons : 0 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row justify-center gap-4 items-center"
        >
          <Link
            href="/apply"
            className="group relative bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-1 flex items-center gap-2"
          >
            Apply Now
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>

          <Link
            href="/apply"
            className="px-10 py-4 rounded-2xl font-bold text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <MousePointerClick size={18} className="text-blue-600" />
            Free Counselling
          </Link>
        </motion.div>

        {/* --- 5. SOCIAL PROOF --- */}
        <motion.div
          style={{ y: mounted ? yButtons : 0 }}
          className="mt-12 flex flex-col items-center gap-3"
          suppressHydrationWarning // 6. Suppress image and social proof mismatches
        >
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-sm"
              >
                <img src={`https://i.pravatar.cc/100?u=${i}`} alt="student" />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-4 border-white bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
              5k+
            </div>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            Trusted by 5,000+ medical students
          </p>
        </motion.div>

        {/* --- 6. VIDEO DIALOG --- */}
        <motion.div
          style={{ y: mounted ? yVideo : 0 }}
          className="mt-16 relative"
        >
          <div className="absolute -inset-4 bg-blue-100/50 rounded-[3rem] blur-2xl z-0"></div>
          <div className="relative z-10 flex justify-center rounded-[2.5rem] overflow-hidden border border-slate-100 bg-white/80 backdrop-blur-md p-3 md:p-6 shadow-2xl shadow-slate-200">
            <HeroVideoDialogDemoTopInBottomOut />
          </div>
        </motion.div>
      </div>

      {/* --- SCROLL INDICATOR --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-5 h-8 border-2 border-slate-400 rounded-full flex justify-center p-1"
        >
          <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
}
