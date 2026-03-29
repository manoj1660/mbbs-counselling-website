"use client";
import React from "react";
import UniversityHeroText from "@/components/university/UniversityHeroText";
import TopCountries from "@/components/university/TopCountries";
import AllCountries from "@/components/university/AllCountries";

export default function UniversitiesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero usually stays full width for background effects */}
      <UniversityHeroText />
      {/* This container centers your content and adds breathing room on the sides */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 space-y-20">
        
        <section>
          <TopCountries />
        </section>

        {/* Decorative Divider */}
        <div className="border-t border-slate-100" />

        <section>
          <AllCountries />
        </section>

      </div>
    </main>
  );
}