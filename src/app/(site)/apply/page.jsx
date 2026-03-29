"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Send, 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Globe, 
  CheckCircle,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function AdmissionForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Yahan aap apna backend logic ya EmailJS add kar sakte hain
    setSubmitted(true);
  };

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
          <h2 className="text-3xl font-black text-slate-900 mb-2">Application Received!</h2>
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
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[5rem] -mr-16 -mt-16"></div>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
            <h3 className="text-2xl font-black text-slate-900 mb-6 text-center">Admission Inquiry</h3>

            {/* Name Input */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" required placeholder="Full Name"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
              />
            </div>

            {/* Email & Phone Row */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" required placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="tel" required placeholder="Phone Number"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* Country Choice */}
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium appearance-none">
                <option value="">Preferred Country</option>
                <option value="russia">Russia</option>
                <option value="kazakhstan">Kazakhstan</option>
                <option value="uzbekistan">Uzbekistan</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* NEET Score */}
            <div className="relative">
              <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" placeholder="Expected NEET Score (Optional)"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Get Free Consultation <ArrowRight size={20} />
            </button>
            
            <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest mt-4">
              By submitting, you agree to our privacy policy
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}