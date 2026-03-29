"use client";
import React, { useState, useEffect } from "react";
import {
  MapPin,
  CheckCircle2,
  GraduationCap,
  Globe,
  FileText,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Landmark,
  Home,
  Stethoscope,
  Mountain,
} from "lucide-react";
import { useParams } from "next/navigation";

export default function UniversityDetailPage() {
  const params = useParams();
  const universitySlug = params?.university;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- FETCH DATA FROM API ---
  useEffect(() => {
    if (!universitySlug) return;

    const fetchDetails = async () => {
      try {
        const res = await fetch(`/api/university-details/${universitySlug}`);
        const result = await res.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (err) {
        console.error("Error fetching university details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [universitySlug]);

  if (loading)
    return (
      <div className="p-20 text-center font-bold text-slate-400 animate-pulse">
        Fetching University Excellence...
      </div>
    );
  if (!data)
    return (
      <div className="p-20 text-center font-bold text-slate-400 uppercase tracking-widest">
        University Details Not Found
      </div>
    );

  const commonFAQs = [
    {
      q: "Is the degree valid in India?",
      a: "Yes, the degree is recognized by the NMC (National Medical Commission) and WHO, allowing you to appear for the NEXT/FMGE exam in India.",
    },
    {
      q: "Is NEET mandatory for admission?",
      a: "Yes, qualifying NEET is mandatory for Indian students to study MBBS abroad if they wish to practice in India later.",
    },
    {
      q: "What is the medium of instruction?",
      a: "The entire 6-year course is taught in English for international students.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* --- PREMIUM HERO SECTION --- */}
      <section className="relative h-[550px] w-full overflow-hidden bg-slate-950">
        <div
          className="absolute inset-0 z-0 scale-110 blur-3xl opacity-30"
          style={{
            backgroundImage: `url(${data.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0 z-10 hidden lg:block"
          style={{
            backgroundImage: `url(${data.image})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
          }}
        />
        <div className="absolute inset-0 z-15 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

        <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-400/30 mb-6 backdrop-blur-md">
              <ShieldCheck size={14} className="text-blue-400" />
              <span className="text-[10px] font-black tracking-widest text-blue-400 uppercase">
                Government University • 2026
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
              {data.name}
            </h1>
            <div className="flex flex-wrap gap-6 text-blue-100/80">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-blue-500" />
                <span className="font-semibold">{data.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Landmark size={18} className="text-blue-500" />
                <span className="font-semibold">Estd. {data.established}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- QUICK STATS BAR --- */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-30">
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 grid grid-cols-2 md:grid-cols-4 p-8 gap-6">
          <div className="text-center border-r border-slate-100 last:border-0">
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">
              World Rank
            </p>
            <p className="font-bold text-slate-900 text-lg">
              #{data.ranking?.world || "N/A"}
            </p>
          </div>
          <div className="text-center border-r border-slate-100 last:border-0">
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">
              Medium
            </p>
            <p className="font-bold text-slate-900 text-lg">English</p>
          </div>
          <div className="text-center border-r border-slate-100 last:border-0">
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">
              Admission
            </p>
            <p className="font-bold text-slate-900 text-lg">NEET Only</p>
          </div>
          <div className="text-center border-r border-slate-100 last:border-0">
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">
              NMC Status
            </p>
            <p className="font-bold text-green-600 text-lg">Approved</p>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-600 rounded-full inline-block"></span>{" "}
              About University
            </h2>
            <p className="text-slate-600 leading-relaxed text-xl font-medium">
              {data.intro}
            </p>
          </section>

          {/* FEES TABLE */}
          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-6">
              Fee Structure
            </h2>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-6 text-sm font-black uppercase text-slate-500 tracking-widest">
                      Year
                    </th>
                    <th className="p-6 text-sm font-black uppercase text-slate-500 tracking-widest">
                      Tuition (RUB)
                    </th>
                    <th className="p-6 text-sm font-black uppercase text-slate-500 tracking-widest">
                      Est. (INR)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.tuitionFees?.map((fee, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-blue-50/50 transition-colors"
                    >
                      <td className="p-6 font-bold text-slate-700">
                        {fee.year}
                      </td>
                      <td className="p-6 font-black text-blue-600">
                        {fee.tuitionfees}
                      </td>
                      <td className="p-6 font-medium text-slate-500">
                        {fee.tuitionINR}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-6 bg-blue-600 text-white font-bold text-center">
                Total Package: {data.totalPackage}
              </div>
            </div>
          </section>

          {/* CLINICAL ROTATION (NEW SECTION) */}
          <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
              <Stethoscope className="text-red-500" /> Clinical Exposure
            </h2>
            <p className="text-slate-600 mb-6 font-medium">
              {data.clinicalRotation?.practicalTraining}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.clinicalRotation?.hospitals?.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100"
                >
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-sm font-bold text-slate-700">{h}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ACCOMMODATION (NEW SECTION) */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-indigo-600 p-10 rounded-[2.5rem] text-white">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                <Home /> Accommodation
              </h2>
              <p className="mb-4 opacity-90 font-bold">
                {data.accommodation?.type} - {data.accommodation?.roomSharing}
              </p>
              <ul className="space-y-2 text-sm opacity-80">
                {data.accommodation?.facilities?.map((f, i) => (
                  <li key={i}>✓ {f}</li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-white/10 rounded-2xl border border-white/20 text-xs">
                {data.accommodation?.indianFood}
              </div>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Mountain className="text-emerald-500" /> City Life
              </h2>
              <h4 className="font-bold text-slate-800 mb-2">
                {data.cityLife?.name}
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                {data.cityLife?.description}
              </p>
              <p className="text-xs font-bold text-blue-600">
                Travel: {data.cityLife?.travel}
              </p>
            </div>
          </section>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-6">
              Key Highlights
            </h3>
            <ul className="space-y-4">
              {data.highlights?.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-green-100 p-1 rounded-full">
                    <CheckCircle2 size={14} className="text-green-600" />
                  </div>
                  <span className="text-slate-600 font-semibold text-sm leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
              <FileText size={20} className="text-blue-400" /> Admission
              Documents
            </h3>
            <ul className="space-y-3 opacity-80 text-sm">
              {data.documents?.map((doc, i) => (
                <li key={i}>• {doc}</li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-200">
            <h3 className="text-2xl font-black mb-4">Start Your Journey</h3>
            <p className="text-blue-100 mb-8 font-medium text-sm">
              MBBS seats are limited for the current batch. Register today for a
              free counseling session.
            </p>
            <button className="w-full bg-white text-blue-600 font-black py-4 rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group">
              Apply Now{" "}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-6 pb-32">
        <h2 className="text-3xl font-black text-center text-slate-900 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {commonFAQs.map((faq, i) => (
            <details
              key={i}
              className="group bg-white rounded-2xl border border-slate-200 p-6 transition-all"
            >
              <summary className="flex justify-between items-center font-bold text-slate-800 cursor-pointer list-none">
                {faq.q}
                <ChevronDown
                  size={20}
                  className="group-open:rotate-180 transition-transform text-slate-400"
                />
              </summary>
              <div className="mt-4 pt-4 border-t border-slate-100 text-slate-600 leading-relaxed font-medium">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
