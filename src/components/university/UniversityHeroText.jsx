"use client";
import React from "react";
import Link from "next/link";
export default function UniversityHeroText() {
  return (
    
    <section className="relative pt-32 pb-20 px-6 bg-linear-to-b from-white to-blue-50/50">
  <div className="max-w-5xl mx-auto text-center">
    
    {/* Tagline */}
    <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
      MBBS Abroad 2026
    </span>

    {/* Shiny Heading */}
    <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
      <span className="bg-linear-to-r from-blue-600 via-sky-400 to-blue-600 bg-size-[200%_auto] bg-clip-text text-transparent animate-shine">
        Turn Your Dream of Becoming a Doctor into Reality
      </span>
    </h1>

    {/* Subheading */}
    <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
      Get expert guidance for MBBS admissions in top international universities with
      affordable fees, globally recognized degrees, and hands-on clinical training.
      We support you at every step — from choosing the right country to securing your admission.
    </p>

    {/* Highlights */}
    <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-slate-700">
      <span className="px-4 py-2 bg-white rounded-full shadow-sm">No Donation</span>
      <span className="px-4 py-2 bg-white rounded-full shadow-sm">100% Transparent Process</span>
      <span className="px-4 py-2 bg-white rounded-full shadow-sm">Top Government Universities</span>
      <span className="px-4 py-2 bg-white rounded-full shadow-sm">Complete Admission Support</span>
    </div>

    {/* CTA */} 
    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
      <Link href="/apply" className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition">
        Apply Now
      </Link>
      <Link href="/apply" className="px-8 py-3 bg-white border border-slate-300 text-slate-800 font-medium rounded-lg hover:bg-slate-50 transition">
        Free Counselling
      </Link>
    </div>

  </div>
</section>
    
  );
}
