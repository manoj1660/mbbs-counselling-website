"use client"
import React, { useState, useEffect } from 'react'
import { X, Send, GraduationCap } from 'lucide-react'

export default function AdmissionPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 1. Show immediately on load (after 1.5 seconds for smoothness)
    const initialTimer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    // 2. Show again every 3 minutes (180000ms) as per client request
    const repeatTimer = setInterval(() => {
      setIsOpen(true);
    }, 30000); 

    return () => {
      clearTimeout(initialTimer);
      clearInterval(repeatTimer);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-blue-100 text-slate-500 hover:text-blue-600 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <GraduationCap size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 leading-none">MBBS 2026</h3>
              <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mt-1">Admission Open</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-800 leading-tight mb-4">
            Get Free <span className="text-blue-600">Expert Counselling</span>
          </h2>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            Enter your details and our senior counselor will call you back within 15 minutes.
          </p>

          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-700"
            />
            <input 
              type="tel" 
              placeholder="Phone Number (WhatsApp)" 
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-700"
            />
            <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-500 appearance-none">
              <option>Select Preferred Country</option>
              <option>Russia</option>
              <option>Georgia</option>
              <option>Uzbekistan</option>
            </select>

            <button className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 mt-4">
              Book My Free Slot <Send size={18} />
            </button>
          </form>

          <p className="text-[10px] text-center text-slate-400 mt-6 uppercase font-bold tracking-tighter">
            🔒 Your data is safe with our certified counselors
          </p>
        </div>
      </div>
    </div>
  )
}