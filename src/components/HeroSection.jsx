"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import LayoutTextFlipDemo from "./layout-text-flip-demo";
import { HeroVideoDialogDemoTopInBottomOut } from "./HeroVideoDialogDemoTopInBottomOut";

export default function HeroSection() {
  const { scrollY } = useScroll();

  // Parallax layers
  const yHeading = useTransform(scrollY, [0, 600], [0, -140]);
  const yText = useTransform(scrollY, [0, 600], [0, -80]);
  const yButtons = useTransform(scrollY, [0, 600], [0, -50]);
  const yVideo = useTransform(scrollY, [0, 600], [0, -20]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="max-w-5xl mx-auto mt-27 px-6 text-center">
        {/* Heading */}
        <motion.div
          style={{ y: yHeading }}
          className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
        >
          <LayoutTextFlipDemo />
        </motion.div>

        {/* Description */}
        <motion.p
          style={{ y: yText }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Get admission in top NMC approved medical universities across Russia,
          Kazakhstan, Uzbekistan, Kyrgyzstan and other countries.
        </motion.p>

        {/* Buttons */}
        <motion.div
          style={{ y: yButtons }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-5"
        >
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition hover:scale-105">
            Apply Now
          </button>

          <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition hover:scale-105">
            Free Counselling
          </button>
        </motion.div>

        {/* Trust Text */}
        <motion.p
          style={{ y: yButtons }}
          className="mt-8 text-sm text-gray-500"
        >
          Trusted by 5000+ students for MBBS admissions abroad
        </motion.p>

        {/* VIDEO SECTION BELOW */}
        <motion.div
          style={{ y: yVideo }}
          className="mt-16 flex justify-center rounded-2xl shadow-xl border bg-white/60 backdrop-blur p-4"
        >
          <HeroVideoDialogDemoTopInBottomOut />
        </motion.div>
      </div>
    </section>
  );
}
