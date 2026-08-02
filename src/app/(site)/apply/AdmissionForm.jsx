"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Send, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Building2,
  MessageSquare,
  Loader2
} from "lucide-react";

export default function AdmissionForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Submit Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- FIXED INPUT STYLE VARIABLE ---
  // Forced bg-white and text-[#0f172a] to stop dark mode inheritance
  const inputBaseClass = "w-full pl-12 pr-4 py-4 bg-white text-[#0f172a] border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400";

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-10 rounded-[3rem] shadow-2xl text-center border border-slate-100"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-500" size={40} />
          </div>
          <h2 className="text-3xl font-black text-[#0f172a] mb-2">Application Received!</h2>
          <p className="text-slate-500 mb-8">Our senior counsellor will contact you within 24 hours to discuss your MBBS journey.</p>
          <button 
            onClick={() => window.location.href = "/"}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT SIDE: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
             <ShieldCheck size={14} className="text-blue-600" />
             <span className="text-[10px] font-black tracking-widest text-blue-600 uppercase">Secure Admission Process</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight mb-6">
            Start Your <span className="text-blue-600">Medical Career</span> Today.
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Fill out the form to get a personalized roadmap for your MBBS abroad. 
            Our experts have helped <span className="font-bold text-slate-900">5,000+ students</span> find the right university.
          </p>

          <div className="space-y-6">
            {[
              { title: "Expert Counselling", desc: "One-on-one session with senior doctors." },
              { title: "University Selection", desc: "Choose from 150+ NMC approved colleges." },
              { title: "Documentation Support", desc: "Zero-hassle visa and admission paperwork." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                  <CheckCircle className="text-blue-600" size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT SIDE: The Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-blue-100 border border-slate-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[5rem] -mr-16 -mt-16"></div>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-5 text-left">
            <h3 className="text-2xl font-black text-[#0f172a] mb-6 text-center">Admission Inquiry</h3>

            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" required name="fullName" placeholder="Full Name *" className={inputBaseClass} />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="email" required name="email" placeholder="Email Address *" className={inputBaseClass} />
            </div>

            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="tel" required name="phone" placeholder="Phone Number *" className={inputBaseClass} />
            </div>

            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select name="country" className={`${inputBaseClass} appearance-none`}>
                <option value="">Preferred Country (Optional)</option>
                <option value="russia">Russia</option>
                <option value="kazakhstan">Kazakhstan</option>
                <option value="uzbekistan">Uzbekistan</option>
                <option value="georgia">Georgia</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" name="university" placeholder="Preferred University (Optional)" className={inputBaseClass} />
            </div>

            <div className="relative">
              <MessageSquare className="absolute left-4 top-6 text-slate-400" size={18} />
              <textarea name="message" placeholder="Your Message or Questions (Optional)" className={`${inputBaseClass} h-32 resize-none pt-4`}></textarea>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 active:scale-95"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Get Free Consultation"} 
              {!isSubmitting && <ArrowRight size={20} />}
            </button>
            
            <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest mt-4">
              We respect your privacy. No spam, only counselling.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}