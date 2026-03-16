"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  MapPin,
  CheckCircle2,
  MessageCircle,
  Info,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { UNIVERSITIES } from "@/data/universities";

const countries = [
  { name: "Russia", flag: "🇷🇺" },
  { name: "Kazakhstan", flag: "🇰🇿" },
  { name: "Kyrgyzstan", flag: "🇰🇬" },
  { name: "Uzbekistan", flag: "🇺🇿" },
  { name: "Nepal", flag: "🇳🇵" },
  { name: "Bangladesh", flag: "🇧🇩" },
  { name: "China", flag: "🇨🇳" },
  { name: "Philippines", flag: "🇵🇭" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Poland", flag: "🇵🇱" },
  { name: "Georgia", flag: "🇬🇪" }
];

export default function PartnerSection() {
  const [activeCountry, setActiveCountry] = useState("Russia");
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -240, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 240, behavior: "smooth" });
  };

  const displayUniversities = UNIVERSITIES.filter(
    (uni) => uni.country.toLowerCase() === activeCountry.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-slate-50 py-24 px-6 md:px-12 relative overflow-hidden">
      
      {/* --- BACKGROUND DECOR --- */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[40%] bg-blue-100/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[5%] left-[-5%] w-[25%] h-[35%] bg-yellow-50/50 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-4">
             <Sparkles size={14} className="text-blue-600" />
             <span className="text-[10px] font-black tracking-widest text-blue-600 uppercase">Global Recognition</span>
          </div>
          <h2 className="text-slate-900 text-4xl md:text-6xl font-black tracking-tight">
            Our Trusted <span className="text-blue-600">MBBS Partners</span>
          </h2>
          <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">
            Directly affiliated with top-tier NMC & WHO approved medical institutions across the globe.
          </p>
        </div>

        {/* --- COUNTRY SLIDER --- */}
        <div className="relative mb-16 group">
          <button
            onClick={scrollLeft}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-600 hover:text-white"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={sliderRef}
            className="flex overflow-x-auto no-scrollbar gap-4 px-4 py-2"
          >
            {countries.map((country) => (
              <button
                key={country.name}
                onClick={() => setActiveCountry(country.name)}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl whitespace-nowrap transition-all duration-300 border ${
                  activeCountry === country.name
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-200 border-blue-600 scale-105"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50"
                }`}
              >
                <span className="text-xl">{country.flag}</span>
                <span className="font-bold text-sm tracking-wide">{country.name}</span>
              </button>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-600 hover:text-white"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* --- UNIVERSITY GRID --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayUniversities.slice(0, 6).map((uni, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 hover:-translate-y-3 flex flex-col"
            >
              {/* Image / Logo Section */}
              <div className="relative h-48 w-full mb-6 rounded-[1.8rem] overflow-hidden bg-slate-100">
                {uni.image ? (
                  <img
                    src={uni.image}
                    alt={uni.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-200 font-bold">LOGO</div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <CheckCircle2 size={12} className="text-green-500" />
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-tighter">NMC Approved</span>
                </div>
              </div>

              {/* Info Section */}
              <div className="flex-grow">
                <div className="flex items-start gap-2 mb-2">
                  <MapPin size={16} className="text-red-500 shrink-0 mt-1" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{uni.location}</p>
                </div>
                <h3 className="font-black text-xl text-slate-900 leading-[1.2] mb-4 group-hover:text-blue-600 transition-colors">
                  {uni.name}
                </h3>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-4 mb-6">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">World Rank</p>
                    <p className="font-bold text-slate-700">#{uni.ranking}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Tuition Fee</p>
                    <p className="font-bold text-blue-600">{uni.fee}</p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-auto">
                <Link
                  href={`/universities/${uni.country.toLowerCase()}/${uni.slug}`}
                  className="flex-1 text-center py-4 text-xs font-bold border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 transition-all"
                >
                  View Details
                </Link>
                <Link
                  href="/apply"
                  className="flex-1 text-center py-4 text-xs font-bold bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2"
                >
                  Apply <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* --- EXPLORE MORE --- */}
        <div className="text-center mt-20">
          <Link
            href={`/universities/${activeCountry.toLowerCase()}`}
            className="inline-flex items-center gap-3 px-12 py-5 bg-slate-900 text-white font-black rounded-[2rem] shadow-xl hover:bg-blue-600 transition-all hover:-translate-y-1"
          >
            Explore All {activeCountry} Universities
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* --- FLOATING ACTIONS (Refined) --- */}
      <div className="fixed bottom-8 left-8 z-50">
        <button className="bg-green-500 w-14 h-14 rounded-full shadow-[0_10px_30px_rgba(34,197,94,0.4)] flex items-center justify-center hover:scale-110 transition active:scale-95 group">
          <MessageCircle className="text-white fill-current" />
          <span className="absolute left-16 bg-white px-4 py-2 rounded-xl shadow-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-100">Chat with us</span>
        </button>
      </div>

    </div>
  );
}