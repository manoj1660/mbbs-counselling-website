"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  MapPin,
  CheckCircle2,
  MessageCircle,
  Info,
  ChevronLeft,
  ChevronRight
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
    sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const displayUniversities = UNIVERSITIES.filter(
    (uni) => uni.country.toLowerCase() === activeCountry.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003B73] via-[#0061C1] to-[#0099ff] p-6 md:p-12 relative">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h2 className="text-white text-3xl md:text-5xl font-bold">
          Our Trusted{" "}
          <span className="text-yellow-400">MBBS Abroad Partners</span>
        </h2>

        <p className="text-white/70 mt-3">
          Explore NMC Approved Universities Worldwide
        </p>
      </div>

      {/* COUNTRY SLIDER */}
      <div className="max-w-7xl mx-auto mb-12 relative">

        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:scale-110"
        >
          <ChevronLeft />
        </button>

        <div
          ref={sliderRef}
          className="flex overflow-x-auto no-scrollbar gap-3 px-10"
        >
          {countries.map((country) => (
            <button
              key={country.name}
              onClick={() => setActiveCountry(country.name)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300 ${
                activeCountry === country.name
                  ? "bg-yellow-400 text-black shadow-xl scale-105"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <span className="text-lg">{country.flag}</span>
              <span className="font-semibold text-sm">{country.name}</span>
            </button>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:scale-110"
        >
          <ChevronRight />
        </button>
      </div>

      {/* UNIVERSITY GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

        {displayUniversities.slice(0, 6).map((uni, idx) => (
          <div
            key={idx}
            className="group bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            {/* CARD HEADER */}
            <div className="flex gap-4 mb-4">

              <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-blue-400 rounded-xl flex items-center justify-center text-xs font-bold text-white">
                {uni.image ? (
                  <img
                    src={uni.image}
                    alt={uni.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <span className="text-lg">LOGO</span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-[#003B73] leading-tight mb-2">
                  {uni.name}
                </h3>

                <div className="flex flex-wrap gap-2 text-xs">

                  <span className="flex items-center gap-1 text-red-500">
                    <MapPin size={14} />
                    {uni.location}
                  </span>

                  {uni.established && (
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full border">
                      EST {uni.established}
                    </span>
                  )}

                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full border flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    NMC
                  </span>

                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="flex justify-between border-t border-b py-4 my-4">

              <div>
                <p className="text-xs text-gray-500">Intake</p>
                <p className="font-semibold">Feb & Sept</p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-500">Country Rank</p>
                <p className="font-semibold">{uni.ranking}</p>
              </div>

            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center">

              <div>
                <p className="text-xs text-gray-500">Tuition Fee</p>
                <p className="text-xl font-bold">{uni.fee}</p>
              </div>

              <div className="flex gap-2">

                {/* DETAILS BUTTON */}
                <Link
                  href={`/universities/${uni.country.toLowerCase()}/${uni.slug}`}
                  className="px-4 py-2 text-xs font-bold border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all"
                >
                  Details
                </Link>

                {/* APPLY BUTTON */}
                <Link
                  href={`/apply/${uni.country.toLowerCase()}/${uni.slug}`}
                  className="px-6 py-2 text-xs font-bold rounded-full text-black bg-yellow-400 hover:bg-yellow-500 transition-all shadow-lg hover:scale-105"
                >
                  Apply
                </Link>

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* EXPLORE MORE */}
      <div className="text-center mt-14">
        <Link
          href={`/universities/${activeCountry.toLowerCase()}`}
          className="px-10 py-4 bg-yellow-400 text-black font-bold rounded-full shadow-lg hover:scale-105 transition-all"
        >
          Explore More Universities →
        </Link>
      </div>

      {/* FLOATING WHATSAPP */}
      <div className="fixed bottom-6 left-6">
        <button className="bg-green-500 p-4 rounded-full shadow-xl animate-bounce hover:scale-110 transition">
          <MessageCircle className="text-white" />
        </button>
      </div>

      {/* INFO BUTTON */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-yellow-400 p-3 rounded-full shadow-xl hover:rotate-12 transition">
          <Info size={22} />
        </button>
      </div>
    </div>
  );
}
