"use client";
import React from "react";
import { LinkPreview } from "@/components/ui/link-preview"; // adjust path
import CountryListSection from "@/components/university/AllCountries";
export default function CountryTextHero() {
  return (
    <section className="relative pt-32 pb-20 px-6 bg-gradient-to-b from-white to-blue-50/50">
      <div className="max-w-5xl mx-auto text-center">
        {/* Minimalist Tag */}
        <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">
          2026 Admissions Open
        </span>

        {/* The Text-Heavy Header */}
        <h1 className="text-4xl md:text-6xl font-medium text-slate-900 leading-tight tracking-tight">
          Start your medical career in top destinations like{" "}
          <LinkPreview 
            url="https://your-site.com/russia" 
            className="font-bold text-blue-600 underline decoration-blue-200 underline-offset-4"
          >
            Russia
          </LinkPreview>
          , explore the high-standard labs in{" "}
          <LinkPreview 
            url="https://your-site.com/georgia" 
            className="font-bold text-blue-600 underline decoration-blue-200 underline-offset-4"
          >
            Georgia
          </LinkPreview>
          , or choose the affordable excellence of{" "}
          <LinkPreview 
            url="https://your-site.com/kazakhstan" 
            className="font-bold text-blue-600 underline decoration-blue-200 underline-offset-4"
          >
            Kazakhstan
          </LinkPreview>
          . We provide direct access to verified clinical training.
        </h1>
      </div>

      <CountryListSection />
    </section>
    
  );
}
