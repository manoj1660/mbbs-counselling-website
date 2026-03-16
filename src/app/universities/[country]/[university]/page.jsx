"use client";
import React from 'react';
import { 
  MapPin, 
  CheckCircle2, 
  Clock, 
  GraduationCap, 
  Globe, 
  FileText, 
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Landmark
} from "lucide-react";
import { UNIVERSITY_DETAILS } from '@/data/universityDetails';

export default function UniversityDetailPage({ params }) {
  // Using React.use() to unwrap params in Client Components if needed, 
  // or simple destructuring if your Next.js version allows.
  const { university } = React.use(params);
  const data = UNIVERSITY_DETAILS[university];

  if (!data) return <div className="p-20 text-center font-bold text-slate-400 uppercase tracking-widest">Data coming soon...</div>;

  const commonFAQs = [
    {
      q: "Is the degree valid in India?",
      a: "Yes, the degree is recognized by the NMC (National Medical Commission) and WHO, allowing you to appear for the NEXT/FMGE exam in India."
    },
    {
      q: "Is NEET mandatory for admission?",
      a: "Yes, qualifying NEET is mandatory for Indian students to study MBBS abroad if they wish to practice in India later."
    },
    {
      q: "What is the medium of instruction?",
      a: "The entire 6-year course is taught in English for international students."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans">

      {/* --- PREMIUM HERO SECTION (Fixes Image Blurring) --- */}
      <section className="relative h-[550px] w-full overflow-hidden bg-slate-950">
        {/* Layer 1: Blurred Backdrop (Hides pixelation) */}
        <div 
          className="absolute inset-0 z-0 scale-110 blur-3xl opacity-30"
          style={{
            backgroundImage: `url(${data.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />

        {/* Layer 2: Main Image (Object-contain prevents stretching) */}
        <div 
          className="absolute inset-0 z-10 hidden lg:block"
          style={{
            backgroundImage: `url(${data.image})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center"
          }}
        />

        {/* Layer 3: Dark Overlay for text readability */}
        <div className="absolute inset-0 z-15 bg-gradient-to-r from-white-950 via-slate-950/80 to-transparent" />

        <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-400/30 mb-6 backdrop-blur-md">
               <ShieldCheck size={14} className="text-blue-400" />
               <span className="text-[10px] font-black tracking-widest text-blue-400 uppercase">Government University • 2026</span>
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
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">Duration</p>
            <p className="font-bold text-slate-900 text-lg">6 Years</p>
          </div>
          <div className="text-center border-r border-slate-100 last:border-0">
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">Medium</p>
            <p className="font-bold text-slate-900 text-lg">English</p>
          </div>
          <div className="text-center border-r border-slate-100 last:border-0">
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">Intake</p>
            <p className="font-bold text-slate-900 text-lg">Sept / Feb</p>
          </div>
          <div className="text-center border-r border-slate-100 last:border-0">
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-1">NMC Status</p>
            <p className="font-bold text-green-600 text-lg">Approved</p>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* ABOUT */}
          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-600 rounded-full inline-block"></span>
              About the University
            </h2>
            <p className="text-slate-600 leading-relaxed text-xl font-medium">
              {data.intro}
            </p>
          </section>

          {/* ADMISSION STEPS */}
          <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-8">Admission Process</h2>
            <div className="grid gap-6">
              {data.admissionSteps?.map((step, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-black shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    0{i + 1}
                  </div>
                  <div className="pt-2">
                    <p className="text-slate-700 font-bold text-lg">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FEES TABLE */}
          <section>
            <h2 className="text-2xl font-black text-slate-900 mb-6">Detailed Fee Structure</h2>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-6 text-sm font-black uppercase text-slate-500 tracking-widest">Academic Year</th>
                    <th className="p-6 text-sm font-black uppercase text-slate-500 tracking-widest">Tuition (RUB)</th>
                    <th className="p-6 text-sm font-black uppercase text-slate-500 tracking-widest">Estimated (INR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.tuitionFees.map((fee, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                      <td className="p-6 font-bold text-slate-700">{fee.year}</td>
                      <td className="p-6 font-black text-blue-600">{fee.tuitionfees}</td>
                      <td className="p-6 font-medium text-slate-500">{fee.tuitionINR}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-8">
          
          {/* HIGHLIGHTS CARD */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-6">Why Study Here?</h3>
            <ul className="space-y-4">
              {data.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-green-100 p-1 rounded-full">
                    <CheckCircle2 size={14} className="text-green-600" />
                  </div>
                  <span className="text-slate-600 font-semibold text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ACTION CARD */}
          <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-200">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <h3 className="text-2xl font-black mb-4">Ready to apply?</h3>
            <p className="text-blue-100 mb-8 font-medium">
              Don't wait! Seats for the {new Date().getFullYear()} batch are filling up fast.
            </p>
            <button className="w-full bg-white text-blue-600 font-black py-4 rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group">
              Start Application <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* DOCUMENTATION LIST */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
              <FileText size={20} className="text-blue-400" />
              Documents Required
            </h3>
            <ul className="space-y-3 opacity-80 text-sm">
              <li>• 10th & 12th Marksheets</li>
              <li>• NEET Qualification Result</li>
              <li>• Valid Passport (Copy)</li>
              <li>• Medical Fitness Certificate</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-6 pb-32">
        <h2 className="text-3xl font-black text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {commonFAQs.map((faq, i) => (
            <details key={i} className="group bg-white rounded-2xl border border-slate-200 p-6 transition-all">
              <summary className="flex justify-between items-center font-bold text-slate-800 cursor-pointer list-none">
                {faq.q}
                <ChevronDown size={20} className="group-open:rotate-180 transition-transform text-slate-400" />
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