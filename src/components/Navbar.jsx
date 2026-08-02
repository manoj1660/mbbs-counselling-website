"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Menu, 
  X, 
  Phone, 
  LogOut, 
  LayoutDashboard, 
  ChevronRight, 
  ChevronDown, 
  Globe 
} from "lucide-react";

export default function ResponsiveNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);
  const [isMobileDestinationsOpen, setIsMobileDestinationsOpen] = useState(false);
  const [user, setUser] = useState(null);

  // All 11 destination countries
  const countries = [
    { name: "Russia", href: "/universities/russia" },
    { name: "Georgia", href: "/universities/georgia" },
    { name: "Kazakhstan", href: "/universities/kazakhstan" },
    { name: "Uzbekistan", href: "/universities/uzbekistan" },
    { name: "Philippines", href: "/universities/philippines" },
    { name: "Kyrgyzstan", href: "/universities/kyrgyzstan" },
    { name: "Italy", href: "/universities/italy" },
    { name: "Vietnam", href: "/universities/vietnam" },
    { name: "Nepal", href: "/universities/nepal" },
    { name: "Poland", href: "/universities/poland" },
    { name: "China", href: "/universities/china" },
  ];

  // Scroll effect for shadow and height
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch logged in user (Logic untouched)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  // Logout (Logic untouched)
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.reload();
  };

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-300 bg-white ${
        scrolled ? "py-3 shadow-md" : "py-4 border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105">
          <img 
            src="/images/mbbsgloballogo.png" 
            alt="MBBS Global Logo" 
            className="h-12 w-12 object-cover scale-150"
          />
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link 
            href="/" 
            className="text-[15px] font-semibold text-gray-700 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>

          {/* DESTINATIONS DROPDOWN (DESKTOP) */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setIsDestinationsOpen(true)}
            onMouseLeave={() => setIsDestinationsOpen(false)}
          >
            <button 
              className="flex items-center gap-1 text-[15px] font-semibold text-gray-700 hover:text-blue-600 transition-colors py-1"
              aria-expanded={isDestinationsOpen}
            >
              Destinations
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-200 ${isDestinationsOpen ? "rotate-180 text-blue-600" : "text-gray-400"}`} 
              />
            </button>

            {/* DROPDOWN MENU */}
            {isDestinationsOpen && (
              <div className="absolute top-full -left-4 w-72 bg-white border border-gray-100 rounded-2xl shadow-xl p-3 grid grid-cols-1 gap-1 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-50 mb-1 flex items-center gap-1.5">
                  <Globe size={13} className="text-blue-600" />
                  Popular MBBS Destinations
                </div>
                <div className="max-h-[360px] overflow-y-auto pr-1 space-y-0.5">
                  {countries.map((country) => (
                    <Link
                      key={country.name}
                      href={country.href}
                      className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-blue-50/60 text-gray-700 hover:text-blue-600 font-medium text-sm transition-all group"
                    >
                      <span>MBBS in {country.name}</span>
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link 
            href="/universities" 
            className="text-[15px] font-semibold text-gray-700 hover:text-blue-600 transition-colors"
          >
            Universities
          </Link>

          <Link 
            href="/admission" 
            className="text-[15px] font-semibold text-gray-700 hover:text-blue-600 transition-colors"
          >
            Admission
          </Link>

          <Link 
            href="/about" 
            className="text-[15px] font-semibold text-gray-700 hover:text-blue-600 transition-colors"
          >
            About
          </Link>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 sm:gap-4">
          <a 
            href="tel:+919818187817" 
            className="hidden md:flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 transition-all hover:bg-blue-100"
          >
            <Phone size={14} /> +91 9818187817
          </a>

          {/* AUTH UI - LOGIC UNTOUCHED */}
          <div className="hidden lg:flex items-center gap-3 ml-2 border-l pl-4 border-gray-200">
            {!user ? (
              <>
                <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-blue-600 transition">
                  Login
                </Link>
                <Link 
                  href="/apply" 
                  className="bg-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-blue-700 transition shadow-lg shadow-blue-100"
                >
                  Apply Now
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                {user.role === "admin" && (
                  <Link href="/admin" className="p-2 bg-gray-50 rounded-full text-blue-600 hover:bg-blue-50 transition">
                    <LayoutDashboard size={20} />
                  </Link>
                )}
                <button 
                  onClick={handleLogout} 
                  className="p-2 bg-red-50 rounded-full text-red-500 hover:bg-red-100 transition"
                >
                  <LogOut size={20} />
                </button>
                <Link 
                  href="/apply" 
                  className="bg-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-full"
                >
                  Apply Now
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden fixed inset-0 top-[60px] bg-white z-[90] transition-all duration-300 ease-in-out overflow-y-auto ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col min-h-[calc(100vh-60px)] bg-white">
          <div className="space-y-2">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 text-lg font-bold text-gray-800 border-b border-gray-50 active:bg-gray-50 rounded-xl"
            >
              Home <ChevronRight size={18} className="text-gray-400" />
            </Link>

            {/* MOBILE DESTINATIONS ACCORDION */}
            <div className="border-b border-gray-50">
              <button
                onClick={() => setIsMobileDestinationsOpen(!isMobileDestinationsOpen)}
                className="flex items-center justify-between w-full p-3.5 text-lg font-bold text-gray-800 active:bg-gray-50 rounded-xl"
              >
                <span>Destinations</span>
                <ChevronDown 
                  size={18} 
                  className={`text-gray-400 transition-transform duration-200 ${isMobileDestinationsOpen ? "rotate-180 text-blue-600" : ""}`} 
                />
              </button>

              {isMobileDestinationsOpen && (
                <div className="pl-4 pr-2 pb-3 space-y-1 bg-slate-50/60 rounded-xl my-1 py-2">
                  {countries.map((country) => (
                    <Link
                      key={country.name}
                      href={country.href}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileDestinationsOpen(false);
                      }}
                      className="flex items-center justify-between p-2.5 text-sm font-semibold text-gray-700 hover:text-blue-600 active:bg-blue-50 rounded-lg"
                    >
                      <span>MBBS in {country.name}</span>
                      <ChevronRight size={14} className="text-gray-400" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/universities"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 text-lg font-bold text-gray-800 border-b border-gray-50 active:bg-gray-50 rounded-xl"
            >
              Universities <ChevronRight size={18} className="text-gray-400" />
            </Link>

            <Link
              href="/admission"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 text-lg font-bold text-gray-800 border-b border-gray-50 active:bg-gray-50 rounded-xl"
            >
              Admission <ChevronRight size={18} className="text-gray-400" />
            </Link>

            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 text-lg font-bold text-gray-800 border-b border-gray-50 active:bg-gray-50 rounded-xl"
            >
              About <ChevronRight size={18} className="text-gray-400" />
            </Link>
          </div>

          <div className="mt-8 pb-10 space-y-4">
            <a 
              href="tel:+919818187817"
              className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl mb-4 text-blue-900 font-bold"
            >
              <Phone size={20} className="text-blue-600" />
              <span>+91 9818187817</span>
            </a>

            {!user ? (
              <div className="grid grid-cols-1 gap-3">
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3.5 text-center font-bold text-gray-700 bg-gray-100 rounded-xl"
                >
                  Login
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {user.role === "admin" && (
                  <Link 
                    href="/admin" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3.5 w-full text-center font-bold text-white bg-blue-600 rounded-xl"
                  >
                    <LayoutDashboard size={20} /> Admin Panel
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 py-3.5 w-full text-center font-bold text-red-500 bg-red-50 rounded-xl"
                >
                  <LogOut size={20} /> Logout
                </button>
              </div>
            )}
            
            <Link
              href="/apply"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-center text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 transition"
            >
              Free Counselling
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}