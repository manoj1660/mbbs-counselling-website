import React from 'react';
import AdmissionPage from './AdmissionPage';
 // Agar aapne ise alag file mein rakha hai

// --- 1. SEO METADATA (Server Side) ---
export const metadata = {
  title: "MBBS Abroad Admission 2026 | NMC Approved Universities | Apply Now",
  description: "Secure direct admission in top NMC & WHO approved medical universities abroad. Low tuition fees, English medium, and complete visa support. Apply for 2026-27 intake today!",
  keywords: [
    "MBBS abroad 2026",
    "MBBS in Russia",
    "MBBS in Georgia",
    "NMC approved medical universities",
    "MBBS abroad for Indian students",
    "low cost MBBS abroad",
    "MBBS admission process",
    "NEET qualified MBBS abroad"
  ],
  alternates: {
    canonical: "https://www.mbbsstudyabroad.com/apply",
  },
};

export default function Page() {
  return <AdmissionPage/>
}