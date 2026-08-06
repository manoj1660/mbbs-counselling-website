import React, { Suspense } from "react";
import connectDB from "@/lib/db";
import CountryDetail from "@/models/CountryDetail";
import University from "@/models/University";
import CountryContent from "./CountryContent";

export async function generateMetadata({ params }) {
  const { country } = await params;
  const slugLower = country.toLowerCase();
  await connectDB();
  
  const baseUrl = "https://www.mbbsstudyabroad.com";
  const canonicalUrl = `${baseUrl}/universities/${slugLower}`;
  // Aapke images folder ki exact PNG image
  const defaultOgImage = `${baseUrl}/images/hero-video.png`;

  const data = await CountryDetail.findOne({ slug: slugLower }).lean();

  if (!data) {
    const fallbackTitle = `Study MBBS in ${country.charAt(0).toUpperCase() + country.slice(1)} | Admission 2026`;
    const fallbackDesc = `Explore top NMC approved medical universities in ${country}. Get details on fee structure, eligibility, and direct admission for 2026.`;

    return { 
      title: fallbackTitle,
      description: fallbackDesc,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: fallbackTitle,
        description: fallbackDesc,
        url: canonicalUrl,
        siteName: "MBBS Study Abroad",
        images: [
          {
            url: defaultOgImage,
            width: 1200,
            height: 630,
            alt: fallbackTitle,
          },
        ],
        type: "article",
      },
    };
  }

  const title = data.seo?.metaTitle || `${data.title} | Study MBBS Abroad 2026`;
  const description = data.seo?.metaDescription || data.description?.substring(0, 160);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "MBBS Study Abroad",
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
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