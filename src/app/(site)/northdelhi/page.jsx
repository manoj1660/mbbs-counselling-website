"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MessageSquare, Send, CheckCircle, Loader2, MapPin, Clock, Globe } from "lucide-react";

export default function NorthDelhiOffice() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- FORM SUBMIT LOGIC (Unchanged API Integration) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsSuccess(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Shared classes for form fields (Refined for crisp Light Theme look)
  const inputClass = "w-full pl-12 pr-4 py-4 bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 font-medium text-sm transition-all";

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen pt-28 pb-20 selection:bg-blue-100 selection:text-blue-700">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Top Mini Badge */}
        <div className="flex justify-center md:justify-start mb-4">
          <span className="bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border border-blue-100 flex items-center gap-2">
            <Globe size={12} className="animate-pulse" /> Official Institutional Branch
          </span>
        </div>

        {/* Hero Header Section */}
        <div className="text-center md:text-left mb-16 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            MBBS Global <span className="text-blue-600">North Delhi</span> Regional Head Office
          </h1>
          <p className="text-slate-600 text-base md:text-lg mt-4 leading-relaxed font-medium">
            Empowering aspiring medical students across Rohini and North Delhi with transparent, accredited global medical education pathways. Connect with our senior academic counselors to map your international admission process.
          </p>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT COLUMN: Premium Contact & Location Details */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Branch Info Card */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-md shadow-slate-100 space-y-6">
              <h2 className="text-xl font-bold text-slate-900 tracking-wide border-b border-slate-100 pb-4 flex items-center gap-2">
                <MapPin size={20} className="text-blue-600" /> Branch Location Details
              </h2>
              
              {/* Address */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Corporate Address</p>
                <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                  518, 5th Floor, SG Shopping Mall,<br />
                  DC Chowk Market, Sector-9, Rohini,<br />
                  New Delhi - 110085
                </p>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Direct Verification Hotline</p>
                <p className="text-lg font-black text-slate-900 tracking-tight hover:text-blue-600 transition cursor-pointer">
                  +91 9217036038
                </p>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Institutional Support Email</p>
                <p className="text-sm text-slate-600 font-semibold">info@unefly.com</p>
              </div>

              {/* Timing */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-500 flex justify-between items-center font-medium">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Clock size={14} className="text-slate-400" /> Operating Hours:
                </span>
                <span className="text-slate-900 font-bold">10:00 AM - 6:30 PM (Mon - Sat)</span>
              </div>
            </div>

            {/* Google Map Box */}
            <div className="bg-white border border-slate-200/60 rounded-[2rem] h-[250px] shadow-md shadow-slate-100 flex flex-col justify-center items-center text-center p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-70"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-50 border border-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  📍
                </div>
                <h4 className="text-slate-900 font-bold mb-1">Interactive Maps Location</h4>
                <p className="text-slate-500 text-xs max-w-xs mx-auto leading-relaxed font-medium">
                  Embed map iframe container seamlessly inside this layout box upon receiving production tokens.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Integrated Embedded Inquiry Form */}
          <div className="lg:col-span-2">
            <div className="w-full bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 p-8 md:p-10 border border-slate-200/40">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="text-center py-20"
                >
                  <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-black text-slate-900">Inquiry Received Successfully</h3>
                  <p className="text-slate-500 mt-2 font-semibold">Our North Delhi senior admissions officer will get in touch with you shortly.</p>
                </motion.div>
              ) : (
                <>
                  <div className="mb-8">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Academic Consultation Request</h3>
                    <p className="text-sm text-slate-500 mt-1 font-semibold">Submit your credentials to arrange a physical appointment at our Rohini center.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Input */}
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <input type="text" required name="fullName" placeholder="Full Name *" className={inputClass} />
                    </div>

                    {/* Email Input */}
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <input type="email" required name="email" placeholder="Email Address *" className={inputClass} />
                    </div>

                    {/* Phone Input */}
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <input type="tel" required name="phone" placeholder="Phone Number *" className={inputClass} />
                    </div>

                    {/* Message Textarea */}
                    <div className="relative group">
                      <MessageSquare className="absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                      <textarea 
                        name="message" 
                        placeholder="Specify preferred destinations, university targets, or direct queries (Optional)..." 
                        className={`${inputClass} h-32 resize-none pt-4`}
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:hover:bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.98]"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Validate & Submit Application"} 
                      {!isSubmitting && <Send size={18} />}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}