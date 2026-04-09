"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  CheckCircle2,
  MessageCircle,
  Info,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function PartnerSection() {
  const [universities, setUniversities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [activeCountry, setActiveCountry] = useState("");

  const sliderRef = useRef(null);

  // ✅ Fetch Data
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await fetch("/api/universities");
        const data = await res.json();

        setUniversities(data);

        // ✅ Unique Countries
        const uniqueCountries = [
          ...new Map(
            data.map((item) => [
              item.country,
              { name: item.country, flag: item.flag || "🌍" },
            ]),
          ).values(),
        ];

        setCountries(uniqueCountries);

        if (uniqueCountries.length > 0) {
          setActiveCountry(uniqueCountries[0].name);
        }
      } catch (err) {
        console.error("Error fetching universities:", err);
      }
    };

    fetchUniversities();
  }, []);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 250, behavior: "smooth" });
  };

  // 🔥 NEW LOGIC: Priority Mix (Featured first, then Normal)
  // 1. Pehle active country ki sabhi unis filter karein
  const countryUnis = universities.filter(
    (uni) => uni.country?.toLowerCase() === activeCountry?.toLowerCase(),
  );

  // 2. Featured aur Non-Featured ko alag karein
  const featured = countryUnis.filter((u) => u.isFeatured === true);
  const normal = countryUnis.filter((u) => u.isFeatured !== true);

  // 3. Merge karein (Featured pehle) aur exactly 6 uthayein
  const displayUniversities = [...featured, ...normal].slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#73b2f1] via-[#6eb9ff] to-[#3793f5] p-6 md:p-12 relative">
      {/* HEADER */}
      <div className="text-center mb-14">
        <h2 className="text-white text-4xl md:text-5xl font-bold">
          Our Trusted{" "}
          <span className="text-yellow-400">MBBS Abroad Partners</span>
        </h2>

        <p className="text-white/70 mt-3">
          Explore NMC Approved Universities Worldwide
        </p>
      </div>

      {/* COUNTRY SLIDER */}
      <div className="max-w-7xl mx-auto mb-14 relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-blue-500 text-white p-2 rounded-full shadow hover:scale-110"
        >
          <ChevronLeft />
        </button>

        <div
          ref={sliderRef}
          className="flex overflow-x-auto no-scrollbar gap-4 px-12"
        >
          {countries.map((country, index) => (
            <button
              key={`${country.name}-${index}`}
              onClick={() => setActiveCountry(country.name)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeCountry === country.name
                  ? "bg-yellow-400 text-black shadow-md"
                  : "bg-blue-600 text-white hover:bg-white/20"
              }`}
            >
              <span className="text-sm font-semibold">{country.name}</span>
            </button>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:scale-110"
        >
          <ChevronRight />
        </button>
      </div>

      {/* UNIVERSITY GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {displayUniversities.map((uni, index) => (
          <div
            key={`${uni._id || index}`}
            className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-gray-200 transition-all duration-300 hover:-translate-y-2"
          >
            {/* TOP */}
            <div className="flex items-start gap-4 mb-5">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center border">
                {uni.image ? (
                  <img
                    src={uni.image}
                    alt={uni.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-xs">LOGO</span>
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg mb-1">
                  {uni.name}
                </h3>

                <p className="flex items-center gap-1 text-sm text-gray-500">
                  <MapPin size={14} />
                  {uni.location}
                </p>
              </div>
            </div>

            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mb-5">
              {uni.established && (
                <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                  EST {uni.established}
                </span>
              )}

              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 size={12} />
                NMC Approved
              </span>

              <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                Rank #{uni.ranking || "N/A"}
              </span>
            </div>

            {/* INFO BOX */}
            <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center mb-5">
              <div>
                <p className="text-xs text-gray-500">Intake</p>
                <p className="font-semibold text-gray-800">Feb & Sept</p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-500">Tuition Fee</p>
                <p className="text-lg font-bold text-blue-600">{uni.fee}</p>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">
              <Link
                href={`/universities/${uni.country?.toLowerCase()}/${uni.slug}`}
                className="flex-1 text-center py-2 text-sm font-semibold border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition"
              >
                View Details
              </Link>

              <Link
                href={`/apply`}
                className="flex-1 text-center py-2 text-sm font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
              >
                Apply Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* EXPLORE MORE */}
      <div className="text-center mt-16">
        <Link
          href={`/universities/${activeCountry.toLowerCase()}`}
          className="px-10 py-4 bg-yellow-400 text-black font-bold rounded-full shadow hover:scale-105 transition"
        >
          Explore More Universities →
        </Link>
      </div>

      {/* FLOATING BUTTONS */}
      <div className="fixed bottom-6 left-6 z-50">
        {/* WhatsApp Link Wrapper */}
        <Link
          href="https://wa.me/8957182442?text=Hello! I want to inquire about MBBS abroad."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 p-4 rounded-full shadow-xl animate-bounce hover:scale-110 transition flex items-center justify-center cursor-pointer"
        >
          <MessageCircle className="text-white" size={24} />
          {/* Optional: Screen reader text */}
          <span className="sr-only">Chat on WhatsApp</span>
        </Link>
      </div>

      {/* <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-yellow-400 p-3 rounded-full shadow-xl hover:rotate-12 transition flex items-center justify-center">
          <Info size={22} className="text-black" />
        </button>
      </div>
      <div className="fixed bottom-6 right-6">
        <button className="bg-yellow-400 p-3 rounded-full shadow-xl hover:rotate-12 transition">
          <Info size={22} />
        </button>
      </div> */}
    </div>
  );
}
