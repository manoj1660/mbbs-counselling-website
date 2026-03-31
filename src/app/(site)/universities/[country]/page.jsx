import React from "react";
import connectDB from "@/lib/db";
import CountryDetail from "@/models/CountryDetail";
import University from "@/models/University";
import CountryContent from "./CountryContent";

export async function generateMetadata({ params }) {
  const { country } = await params;
  const slugLower = country.toLowerCase();
  await connectDB();
  
  const data = await CountryDetail.findOne({ slug: slugLower }).lean();
  if (!data) return { title: `Study MBBS in ${country} | 2026 Admissions` };

  return {
    title: data.seo?.metaTitle || `${data.title} | Study MBBS Abroad 2026`,
    description: data.seo?.metaDescription || data.description?.substring(0, 160),
    // ... baaki metadata same rahega
  };
}

export default async function CountryDetailPage({ params }) {
  const { country: countrySlug } = await params;
  const slugLower = countrySlug.toLowerCase(); // Ye "russia" hai
  
  await connectDB();

  // 1. Desh ki details nikalne ke liye slug hi use hoga (Ye bilkul sahi hai)
  const countryDetails = await CountryDetail.findOne({ slug: slugLower }).lean();

  // 2. Universities dhoondne ke liye hum 'country' field ka use kar rahe hain
  // Kyunki DB mein university ke andar uska desh 'country' field mein "russia" likha hoga
  const countryUnis = await University.find({ 
    country: { $regex: new RegExp(`^${slugLower}$`, "i") } 
  }).lean();

 
  if (!countryDetails) {
    return <div className="p-20 text-center font-bold text-slate-400">Country Not Found</div>;
  }

  return (
    <CountryContent 
      details={JSON.parse(JSON.stringify(countryDetails))} 
      countryUnis={JSON.parse(JSON.stringify(countryUnis))} 
      countrySlug={countrySlug} 
    />
  );
}