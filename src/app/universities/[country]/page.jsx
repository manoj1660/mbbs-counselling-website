'use client';

import React, { useState } from 'react';
import { COUNTRY_DETAILS } from '@/data/countryDetails';
import { UNIVERSITIES } from '@/data/universities';
import { ChevronRight, MapPin, Award, Building2, CheckCircle, GraduationCap, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

const ITEMS_PER_PAGE = 6;

export default function CountryDetailPage({ params }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [paramsResolved, setParamsResolved] = React.useState(false);
  const [countrySlug, setCountrySlug] = React.useState('');

  React.useEffect(() => {
    params.then(({ country }) => {
      setCountrySlug(country.toLowerCase());
      setParamsResolved(true);
    });
  }, [params]);

  if (!paramsResolved) return <div className="h-screen flex items-center justify-center bg-white text-blue-600 font-bold">Loading...</div>;

  const details = COUNTRY_DETAILS[countrySlug];
  const countryUnis = UNIVERSITIES.filter(u => u.country === countrySlug);

  if (!details) return <div className="py-20 text-center">Country Not Found</div>;

  // Pagination logic
  const totalPages = Math.ceil(countryUnis.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUnis = countryUnis.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
    <main className="bg-[#fcfcfd] min-h-screen">
      
      {/* --- 1. THE FULL-SCREEN CINEMATIC HERO --- */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-slate-900">
        <img 
          src={`/images/countries/${countrySlug}.jpg`} 
          className="absolute inset-0 w-full h-full object-cover opacity-70 scale-105 transition-transform duration-1000 hover:scale-100" 
          alt={countrySlug} 
        />
        {/* Deep Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fcfcfd] via-transparent to-black/40" />
        
        <div className="absolute inset-0 flex flex-col justify-end pb-24 px-6 md:px-12 max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-[0.3em] mb-6">
            <Link href="/universities" className="hover:text-white">Destinations</Link>
            <ChevronRight size={14} />
            <span className="text-blue-400 capitalize">{countrySlug}</span>
          </nav>
          
          <h1 className="text-6xl md:text-9xl font-black text-white leading-none tracking-tighter mb-6 drop-shadow-2xl">
            {details.title.replace('MBBS in ', '')}<span className="text-blue-500">.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl font-medium leading-relaxed drop-shadow-lg">
            {details.heroText}
          </p>
        </div>
      </section>

      {/* --- 2. THE FLOATING INFO STRIP (Glassmorphism) --- */}
      <div className="relative z-20 -mt-16 px-6">
        <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-[3rem] p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center md:text-left">
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Total Budget</p>
            <p className="text-2xl font-bold text-slate-900">{details.feeRange.split(' ')[0]}</p>
          </div>
          <div className="text-center md:text-left border-l border-slate-100 pl-8">
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Students</p>
            <p className="text-2xl font-bold text-slate-900">{details.stats.students}</p>
          </div>
          <div className="text-center md:text-left border-l border-slate-100 pl-8">
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Medium</p>
            <p className="text-2xl font-bold text-slate-900">{details.stats.medium}</p>
          </div>
          <div className="text-center md:text-left border-l border-slate-100 pl-8">
             <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
               Apply Now
             </button>
          </div>
        </div>
      </div>

      {/* --- 3. THE BENTO OVERVIEW --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-16">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight flex items-center gap-4">
              <span className="w-12 h-1 bg-blue-600 rounded-full" />
              Academic Standards
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed italic">
              "{details.description}"
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {details.whyStudy.map((point, i) => (
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
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px]" />
            <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
               <Star className="text-yellow-400 fill-yellow-400" /> Eligibility
            </h3>
            <div className="space-y-8 relative z-10">
               <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">PCB Required</span>
                  <span className="font-bold text-lg">{details.eligibility.pcb}</span>
               </div>
               <div className="flex justify-between items-center border-t border-white/10 pt-8">
                  <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Entrance Exam</span>
                  <span className="font-bold text-lg">{details.eligibility.neet}</span>
               </div>
               <div className="flex justify-between items-center border-t border-white/10 pt-8">
                  <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Age Limit</span>
                  <span className="font-bold text-lg">{details.eligibility.age}</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. THE UNIVERSITY SHOWCASE --- */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter">
              Featured <br/> <span className="text-blue-600 underline decoration-slate-100 underline-offset-8">Institutions.</span>
            </h2>
            <p className="text-slate-400 font-bold uppercase text-xs tracking-[0.2em] mt-4 md:mt-0">
               {countryUnis.length} Verified Universities found
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {paginatedUnis.map((uni) => (
              <Link key={uni.id} href={`/universities/${countrySlug}/${uni.name.toLowerCase().replace(/ /g, '-')}`} className="group">
                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden mb-8 shadow-2xl">
                  <img src={uni.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-8 left-8">
                    <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black text-blue-600 uppercase">
                      {uni.ranking}
                    </span>
                  </div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mb-2">
                      <MapPin size={14} className="text-blue-400" /> {uni.location}
                    </p>
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">{uni.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Luxury Pagination Buttons */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-6 mt-20">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all disabled:opacity-30"
              >
                <ArrowRight className="rotate-180" size={24} />
              </button>
              <span className="text-slate-400 font-black text-sm uppercase tracking-widest">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all disabled:opacity-30"
              >
                <ArrowRight size={24} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* --- 5. MINIMALIST CTA --- */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex p-4 bg-blue-50 rounded-2xl text-blue-600 mb-8">
            <GraduationCap size={32} />
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8 leading-none">
            Your Future <br/> Starts Here.
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all">
              Book Free Consultation
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}