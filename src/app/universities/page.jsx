'use client';
import React, { useState } from 'react';
import { 
  ChevronDown, Globe, Search, Menu, X, CheckCircle, 
  Users, GraduationCap, MapPin, Phone, Mail 
} from 'lucide-react';
import Image from 'next/image';

// --- Navbar Component ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto mt-4 px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg">
          <div className="flex justify-between h-20 items-center px-6">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 bg-[#1A808E] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">GlobalMBBS</span>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              {['Home', 'Services', 'Universities', 'About'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-white/80 hover:text-white font-medium transition-colors">
                  {item}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="bg-[#1A808E] hover:bg-[#156a76] text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg">
                Book Consultation
              </button>
            </div>

            <div className="lg:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default function LandingPage() {
  return (
    <div className="bg-slate-50 font-sans text-slate-900">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] w-full flex items-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero.png" 
            alt="Medical Education" 
            fill 
            className="object-cover"
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
              Become a Global <span className="text-[#1A808E]">Doctor</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10">
              Low tuition fees, MCI/NMC recognized universities, and world-class medical exposure in UK, Russia, and Georgia.
            </p>
            <div className="flex gap-4">
              <button className="bg-[#1A808E] text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform">
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-[#1A808E]">500+</div>
            <div className="text-slate-500 font-medium">Students Placed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#1A808E]">15+</div>
            <div className="text-slate-500 font-medium">Top Countries</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#1A808E]">100%</div>
            <div className="text-slate-500 font-medium">Visa Success</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#1A808E]">24/7</div>
            <div className="text-slate-500 font-medium">Student Support</div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section id="services" className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Consult GlobalMBBS?</h2>
          <p className="text-slate-600 max-w-xl mx-auto">Everything you need for a smooth transition to a foreign medical university.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Direct Admissions", desc: "Get direct entry into NMC/WHO approved universities." },
            { title: "Visa Assistance", desc: "Hassle-free documentation and visa processing." },
            { title: "On-Ground Support", desc: "We help you find hostels and settling in your new country." }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-md transition-all">
              <CheckCircle className="text-[#1A808E] mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- DESTINATIONS --- */}
      <section className="bg-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Top MBBS Destinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Russia', 'UK', 'Georgia', 'Kazakhstan'].map((country) => (
              <div key={country} className="bg-white p-6 rounded-xl text-center font-bold shadow-sm hover:bg-[#1A808E] hover:text-white cursor-pointer transition-all">
                {country}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT FORM --- */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 border overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#1A808E]/10 rounded-full -mr-16 -mt-16"></div>
          <h2 className="text-3xl font-bold mb-8 text-center">Get a Free Counseling Session</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder="Your Name" className="w-full p-4 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-[#1A808E] outline-none" />
              <input type="tel" placeholder="Phone Number" className="w-full p-4 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-[#1A808E] outline-none" />
            </div>
            <select className="w-full p-4 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-[#1A808E] outline-none">
              <option>Select Preferred Country</option>
              <option>Russia</option>
              <option>UK</option>
              <option>Georgia</option>
            </select>
            <button className="w-full bg-[#1A808E] text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all">
              Apply Now
            </button>
          </form>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="text-white font-bold text-2xl mb-2">GlobalMBBS</h3>
            <p>© 2024 Your Consultancy. All Rights Reserved.</p>
          </div>
          <div className="flex gap-6">
            <Phone size={20} /> <Mail size={20} /> <Globe size={20} />
          </div>
        </div>
      </footer>
    </div>
  );
}