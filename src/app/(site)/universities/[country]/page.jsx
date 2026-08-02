import React, { Suspense } from "react";
import connectDB from "@/lib/db";
import CountryDetail from "@/models/CountryDetail";
import University from "@/models/University";
import CountryContent from "./CountryContent";

export async function generateMetadata({ params }) {
  const { country } = await params;
  const slugLower = country.toLowerCase();
  await connectDB();
  
  const data = await CountryDetail.findOne({ slug: slugLower }).lean();
  if (!data) {
    return { 
      title: `Study MBBS in ${country} | Admissions`,
      alternates: {
        canonical: `/universities/${slugLower}`,
      },
    };
  }

  return {
    title: data.seo?.metaTitle || `${data.title} | Study MBBS Abroad 2026`,
    description: data.seo?.metaDescription || data.description?.substring(0, 160),
    alternates: {
      canonical: `/universities/${slugLower}`,
    },
  };
}

export default async function CountryDetailPage({ params }) {
  const { country: countrySlug } = await params;
  const slugLower = countrySlug.toLowerCase();
  
  await connectDB();

  // 1. Fetch country details
  const countryDetails = await CountryDetail.findOne({ slug: slugLower }).lean();

  // 2. Fetch universities for this country (case-insensitive regex match)
  const countryUnis = await University.find({ 
    country: { $regex: new RegExp(`^${slugLower}$`, "i") } 
  }).lean();

  if (!countryDetails) {
    return <div className="p-20 text-center font-bold text-slate-400">Country Not Found</div>;
  }

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-slate-400">Loading universities...</div>}>
      <CountryContent 
        details={JSON.parse(JSON.stringify(countryDetails))} 
        countryUnis={JSON.parse(JSON.stringify(countryUnis))} 
        countrySlug={countrySlug} 
      />
    </Suspense>
  );
}