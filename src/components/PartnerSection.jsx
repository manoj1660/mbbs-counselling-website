"use client";
import React, { useState } from 'react';
import { MapPin, CheckCircle2, MessageCircle, Info } from 'lucide-react';

const UNIVERSITY_DATA = {
  Georgia: [
    { name: "Tbilisi State Medical University", location: "Tbilisi, Georgia", est: "1918", rank: "#1 in Georgia", fee: "8000 USD/Yr", logo: "TSMU" },
    { name: "BAU International University Batumi", location: "Batumi, Georgia", est: "2015", rank: "#5 in Georgia", fee: "4,800 USD/Yr", logo: "BAU" },
    { name: "East European University", location: "Tbilisi, Georgia", est: "2012", rank: "#8 in Georgia", fee: "5,500 USD/Yr", logo: "EEU" },
    { name: "Georgian American University", location: "Tbilisi, Georgia", est: "2001", rank: "#6 in Georgia", fee: "6,000 USD/Yr", logo: "GAU" },
    { name: "Ilia State University", location: "Tbilisi, Georgia", est: "2006", rank: "#3 in Georgia", fee: "6,200 USD/Yr", logo: "ISU" },
    { name: "Georgian National University SEU", location: "Tbilisi, Georgia", est: "2001", rank: "#7 in Georgia", fee: "6,300 USD/Yr", logo: "SEU" },
  ],
  Russia: [
    { name: "Moscow State Medical University", location: "Moscow, Russia", est: "1758", rank: "#1 in Russia", fee: "7500 USD/Yr", logo: "MSMU" },
    // Add more mock data for other countries here...
  ],
  // Kazakhstan, Kyrgyzstan, etc...
};

const countries = [
  { name: "Georgia", flag: "🇬🇪" },
  { name: "Russia", flag: "🇷🇺" },
  { name: "Kazakhstan", flag: "🇰🇿" },
  { name: "Kyrgyzstan", flag: "🇰🇬" },
  { name: "Uzbekistan", flag: "🇺🇿" },
  { name: "Nepal", flag: "🇳🇵" },
  { name: "Bangladesh", flag: "🇧🇩" },
];

export default function PartnerSection() {
  const [activeCountry, setActiveCountry] = useState("Georgia");

  const displayUniversities = UNIVERSITY_DATA[activeCountry] || [];

  return (
    <div className="min-h-screen bg-[#0061C1] p-4 md:p-10 font-sans relative">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-white text-3xl md:text-4xl font-bold">
          Our Trusted Exclusive <span className="text-yellow-400">MBBS Abroad Partners</span>
        </h2>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {countries.map((country) => (
          <button
            key={country.name}
            onClick={() => setActiveCountry(country.name)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full border transition-all ${
              activeCountry === country.name
                ? "bg-[#00D094] border-[#00D094] text-black font-semibold shadow-lg"
                : "bg-white/10 border-white/20 text-white hover:bg-white/20"
            }`}
          >
            <span>{country.flag}</span>
            <span className="text-sm">{country.name}</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {displayUniversities.slice(0, 6).map((uni, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              {/* Card Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-400 border italic">
                  LOGO
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#003B73] leading-tight mb-2">{uni.name}</h3>
                  <div className="flex flex-wrap gap-2 text-[10px] font-medium">
                    <span className="flex items-center gap-1 text-red-500">
                      <MapPin size={12} fill="currentColor" /> {uni.location}
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full border border-green-200">
                      EST. {uni.est}
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full border border-green-200 flex items-center gap-1">
                      <CheckCircle2 size={10} /> NMC Approved
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-between border-t border-b border-gray-100 py-4 my-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-800 uppercase tracking-tighter">Intake</p>
                  <p className="text-sm font-semibold text-gray-600">Feb & Sept</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-800 uppercase tracking-tighter text-right">Country Rank</p>
                  <p className="text-sm font-semibold text-gray-600">{uni.rank}</p>
                </div>
              </div>
            </div>

            {/* Footer / CTA */}
            <div className="flex items-center justify-between mt-2">
              <div>
                <p className="text-[10px] font-bold text-gray-800 uppercase mb-1">Tuition Fee :</p>
                <p className="text-lg font-bold text-black">{uni.fee}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-[#0061C1] text-[#0061C1] rounded-full text-xs font-bold hover:bg-blue-50 transition-colors">
                  View details
                </button>
                <button className="px-6 py-2 bg-[#FFD700] text-black rounded-full text-xs font-bold hover:bg-yellow-500 transition-colors shadow-sm">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 left-6">
        <button className="bg-[#25D366] p-3 rounded-xl shadow-lg hover:scale-110 transition-transform">
          <MessageCircle className="text-white fill-current" />
        </button>
      </div>
      <div className="fixed bottom-6 right-6 flex flex-col gap-2">
         <button className="bg-[#FFD700] p-2 rounded-lg shadow-lg">
          <Info size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
}