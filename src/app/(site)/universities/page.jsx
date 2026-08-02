import React from "react";
import connectDB from "@/lib/db";
import PageSetting from "@/models/PageSetting";
import UniversityHeroText from "@/components/university/UniversityHeroText";
import TopCountries from "@/components/university/TopCountries";
import AllCountries from "@/components/university/AllCountries";

// --- DYNAMIC SEO METADATA ---
export async function generateMetadata() {
  await connectDB();
  // Hum database se "universities-main" naam ka record dhoondhenge
  const data = await PageSetting.findOne({
    pageName: "universities-main",
  }).lean();

  return {
    title: data?.seo?.metaTitle || "All Universities | Study MBBS Abroad 2026",
    description:
      data?.seo?.metaDescription ||
      "Explore top medical universities worldwide.",
    keywords: data?.seo?.keywords?.join(", ") || [
      "MBBS Universities",
      "Study Abroad",
    ],
    alternates: {
      canonical: "/universities",
    },
  };
}

export default async function UniversitiesPage() {
  // Agar aap chaho toh Hero text bhi DB se la sakte ho
  // const pageData = await PageSetting.findOne({ pageName: "universities-main" }).lean();

  return (
    <main className="min-h-screen bg-white">
      <UniversityHeroText />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 space-y-20">
        <section>
          <TopCountries />
        </section>

        <div className="border-t border-slate-100" />

        <section>
          <AllCountries />
        </section>
      </div>
    </main>
  );
}
