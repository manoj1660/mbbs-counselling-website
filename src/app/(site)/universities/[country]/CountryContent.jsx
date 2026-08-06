"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, MapPin, CheckCircle, Star, ArrowRight, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BudgetRoadmap } from "@/components/BudgetRoadmap";

const ITEMS_PER_PAGE = 6;

export default function CountryContent({ details, countryUnis, countrySlug }) {
  const searchParams = useSearchParams();

  // Read current page from URL (?page=2), default to 1
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  const totalPages = Math.ceil((countryUnis?.length || 0) / ITEMS_PER_PAGE);

  // Sync state whenever URL query params change
  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUnis = countryUnis?.slice(startIdx, startIdx + ITEMS_PER_PAGE) || [];

  return (
    <main className="bg-[#fcfcfd] min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-slate-900">
        <Image
          src={details?.image || `/images/countries/${countrySlug}.jpg`}
          alt={`Study MBBS in ${details?.title || countrySlug} - Official University Campus View`}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover opacity-70 scale-105 transition-transform duration-1000 hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fcfcfd] via-transparent to-black/40" />
        <div className="absolute inset-0 flex flex-col justify-end pb-24 px-6 md:px-12 max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-[0.3em] mb-6 relative z-10">
            <Link href="/universities" className="hover:text-white">Destinations</Link>
            <ChevronRight size={14} />
            <span className="text-blue-400 capitalize">{countrySlug}</span>
          </nav>
          <h1 className="text-6xl md:text-9xl font-black text-white leading-none tracking-tighter mb-6 drop-shadow-2xl relative z-10">
            {details?.title?.replace("MBBS in ", "") || countrySlug}<span className="text-blue-500">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl font-medium leading-relaxed drop-shadow-lg relative z-10">
            {details?.heroText}
          </p>
        </div>
      </section>

      {/* 2. INFO STRIP */}
      <div className="relative z-20 -mt-16 px-6">
        <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-[3rem] p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Total Budget</p>
            <p className="text-2xl font-bold text-slate-900">{details?.feeRange}</p>
          </div>
          <div className="border-l border-slate-100 pl-8">
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Students</p>
            <p className="text-2xl font-bold text-slate-900">{details?.stats?.students}</p>
          </div>
          <div className="border-l border-slate-100 pl-8">
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Medium</p>
            <p className="text-2xl font-bold text-slate-900">{details?.stats?.medium}</p>
          </div>
          <div className="border-l border-slate-100 pl-8">
            <Link href="/apply" className="block w-full bg-blue-600 text-center text-white py-4 rounded-2xl font-bold hover:shadow-lg transition-all">Apply Now</Link>
          </div>
        </div>
      </div>

      {/* 3. BENTO OVERVIEW */}
      <section className="py-32 px-6 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-16">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight flex items-center gap-4">
              <span className="w-12 h-1 bg-blue-600 rounded-full" /> Academic Standards
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed italic text-justify">"{details?.description}"</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {details?.whyStudy?.map((point, i) => (
              <div key={i} className="group p-8 bg-white border border-slate-100 rounded-[2rem] hover:border-blue-200 hover:shadow-xl transition-all duration-500">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <CheckCircle size={24} />
                </div>
                <p className="text-lg font-bold text-slate-800 leading-snug">{point}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-slate-900 p-10 rounded-[3rem] text-white sticky top-24 overflow-hidden shadow-2xl">
            <h3 className="text-2xl font-bold mb-10 flex items-center gap-3"><Star className="text-yellow-400 fill-yellow-400" /> Eligibility</h3>
            <div className="space-y-8 relative z-10">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">PCB Required</span>
                <span className="font-bold text-lg">{details?.eligibility?.pcb}</span>
              </div>
              <div className="flex justify-between items-center border-t border-white/10 pt-8">
                <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Entrance Exam</span>
                <span className="font-bold text-lg">{details?.eligibility?.neet}</span>
              </div>
              <div className="flex justify-between items-center border-t border-white/10 pt-8">
                <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Age Limit</span>
                <span className="font-bold text-lg">{details?.eligibility?.age}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. UNIVERSITY SHOWCASE */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Featured <br /> <span className="text-blue-600 underline decoration-slate-100 underline-offset-8">Institutions.</span></h2>
            <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em]">{countryUnis?.length || 0} Verified Universities</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedUnis.map((uni) => (
              <Link key={uni._id} href={`/universities/${countrySlug}/${uni.slug}`} className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl hover:shadow-blue-300/30 transition-all duration-300">
                <div className="h-60 overflow-hidden relative">
                  <Image 
                    src={uni.image || "/images/placeholder.jpg"} 
                    alt={`${uni.name} Campus - Study MBBS in ${details?.title || countrySlug}`} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute top-5 left-5 z-10">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-[10px] font-black text-blue-700 rounded-xl uppercase">{uni.ranking || "Top Ranked"}</span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase mb-3"><MapPin size={14} /> {uni.location}</div>
                  <h4 className="text-xl font-bold text-slate-900 mb-6 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">{uni.name}</h4>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Annual Fee</p>
                      <p className="text-xl font-black text-slate-800">{uni.fee || uni.fees}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <ArrowRight size={24} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Crawlable SEO Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-6 mt-20">
              {/* Previous Page Link */}
              {currentPage > 1 ? (
                <Link
                  href={`/universities/${countrySlug}?page=${currentPage - 1}`}
                  className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                  aria-label="Previous Page"
                >
                  <ArrowRight className="rotate-180" size={24} />
                </Link>
              ) : (
                <button
                  disabled
                  className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center opacity-30 cursor-not-allowed"
                  aria-label="Previous Page Disabled"
                >
                  <ArrowRight className="rotate-180" size={24} />
                </button>
              )}

              {/* Page Indicator */}
              <span className="text-slate-400 font-black text-sm uppercase tracking-widest">
                Page {currentPage} of {totalPages}
              </span>

              {/* Next Page Link */}
              {currentPage < totalPages ? (
                <Link
                  href={`/universities/${countrySlug}?page=${currentPage + 1}`}
                  className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                  aria-label="Next Page"
                >
                  <ArrowRight size={24} />
                </Link>
              ) : (
                <button
                  disabled
                  className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center opacity-30 cursor-not-allowed"
                  aria-label="Next Page Disabled"
                >
                  <ArrowRight size={24} />
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <BudgetRoadmap />
    </main>
  );
}