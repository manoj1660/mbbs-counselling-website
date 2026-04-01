"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, User, LogOut, LayoutDashboard, ChevronRight } from "lucide-react";

export default function ResponsiveNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

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

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Universities", href: "/universities" },
    { name: "Admission", href: "/admission" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-300 bg-white ${
        scrolled ? "py-2 shadow-md" : "py-4 border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105">
          <img 
            src="/images/logo1.png" 
            alt="MBBS Global Logo" 
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className="text-[15px] font-semibold text-gray-700 hover:text-blue-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
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
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU - IMPROVED UI */}
      <div
        className={`lg:hidden fixed inset-0 top-[60px] bg-white z-[90] transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full bg-white">
          <div className="space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-4 text-xl font-bold text-gray-800 border-b border-gray-50 active:bg-gray-50"
              >
                {link.name} <ChevronRight size={20} className="text-gray-400" />
              </Link>
            ))}
          </div>

          <div className="mt-auto pb-10 space-y-4">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl mb-4">
              <Phone size={20} className="text-blue-600" />
              <span className="font-bold text-blue-900">+91 9818187817</span>
            </div>

            {!user ? (
              <div className="grid grid-cols-2 gap-4">
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-4 text-center font-bold text-gray-700 bg-gray-100 rounded-xl"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-4 text-center font-bold text-white bg-black rounded-xl"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {user.role === "admin" && (
                  <Link 
                    href="/admin" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-4 w-full text-center font-bold text-white bg-blue-600 rounded-xl"
                  >
                    <LayoutDashboard size={20} /> Admin Panel
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 py-4 w-full text-center font-bold text-red-500 bg-red-50 rounded-xl"
                >
                  <LogOut size={20} /> Logout
                </button>
              </div>
            )}
            
            <Link
              href="/apply"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-center text-lg shadow-xl shadow-blue-100"
            >
              Free Counselling
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}