"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Award, 
  Globe2, 
  ShieldCheck, 
  GraduationCap, 
  PhoneCall,
  ChevronRight
} from 'lucide-react';

const stats = [
  { label: "Students Assisted", value: "5000+", icon: <Users className="text-blue-600" /> },
  { label: "Partner Universities", value: "150+", icon: <Globe2 className="text-blue-600" /> },
  { label: "Visa Success Rate", value: "100%", icon: <ShieldCheck className="text-blue-600" /> },
  { label: "Years of Excellence", value: "12+", icon: <Award className="text-blue-600" /> },
];

const AboutPage = () => {
  return (
    <div className="bg-white overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-32 flex items-center justify-center bg-slate-50">
        <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full"
          >
            Empowering Future Doctors
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-tight"
          >
            Your Bridge to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Global Medical Career.
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed"
          >
            We simplify the complex journey of studying MBBS abroad, providing transparent guidance and end-to-end support for Indian medical aspirants.
          </motion.p>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="relative -mt-16 z-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 text-center"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
              <p className="text-sm text-slate-500 font-medium mt-1 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- MISSION & VISION (Side by Side) --- */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-[3rem] overflow-hidden">
                <img 
                  src="/images/medicalstudent.jpg" // Put a high-quality doctor image here
                  alt="Medical Students"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-yellow-400 rounded-full flex items-center justify-center p-8 text-center rotate-12 shadow-2xl">
                <p className="font-bold text-slate-900 leading-tight">100% Genuine Guidance</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black text-slate-900 mb-6">Why We Started This Journey?</h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Finding the right medical university abroad is filled with misinformation. We established this firm to bring 100% transparency to the admission process, ensuring every student gets into a WHO & NMC recognized institution without hidden costs.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Official Partner of Top Russian & Kazakh Universities",
                  "Direct University Admissions (No Sub-Agents)",
                  "Complete Documentation & Visa Assistance",
                  "Post-Admission Support for 6 Full Years"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-800 font-semibold">
                    <div className="bg-green-100 p-1 rounded-full text-green-600">
                      <ShieldCheck size={18} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 px-6">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="max-w-7xl mx-auto bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-400/40"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10">
            Confused about your MBBS Abroad? <br />
            Let our experts guide you.
          </h2>
          <p className="text-blue-100 text-lg mb-10 relative z-10">Get a free personalized counselling session today.</p>
          
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <button className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold rounded-2xl transition-all flex items-center gap-2">
              <PhoneCall size={20} /> Book Free Consultation
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all border border-white/20">
              Download Brochure
            </button>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default AboutPage;