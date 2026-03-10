"use client";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "motion/react";

export default function LayoutTextFlipDemo() {
  return (
    <div className="mt-10 px-4">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex items-center justify-center text-center"
      >

        <h1 className="font-bold leading-tight text-gray-900
        text-4xl sm:text-5xl md:text-6xl lg:text-7xl">

          <LayoutTextFlip
            text="Study MBBS in "
            words={[
              "Russia",
              "Kazakhstan",
              "Uzbekistan",
              "Kyrgyzstan",
              "Georgia",
            ]}
          />

        </h1>

      </motion.div>


    </div>
  );
}