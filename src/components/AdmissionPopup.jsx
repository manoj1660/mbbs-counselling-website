"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, MessageSquare, Send, CheckCircle } from "lucide-react";

export default function QuickPopupForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- FIXED POPUP LOGIC ---
  useEffect(() => {
    // Agar success ho chuka hai, toh stop kar doh
    if (isSuccess) return;

    // Initial 10s timer
    const initialTimer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);

    // Repeat every 30s
    const repeatInterval = setInterval(() => {
      setIsOpen((prev) => {
        if (!prev) return true;
        return prev;
      });
    }, 30000);

    // Cleanup: Dono timers ko clear karna zaroori hai
    return () => {
      clearTimeout(initialTimer);
      clearInterval(repeatInterval);
    };
  }, [isSuccess]); // Ye array hamesha same size ki honi chahiye

  const handleClose = () => {
    setIsOpen(false);
  };

  const handlePopupSubmit = async (e) => {
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
        setIsSuccess(true);
        setTimeout(() => {
          setIsOpen(false);
        }, 3000);
      }
    } catch (err) {
      console.error("Popup Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl relative p-8 md:p-10"
          >
            <button onClick={handleClose} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-slate-400">
              <X size={20} />
            </button>

            {isSuccess ? (
              <div className="text-center py-10">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-black text-slate-900">Details Received!</h3>
                <p className="text-slate-500 mt-2">Our team will call you shortly.</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-slate-900">Quick Inquiry</h3>
                  <p className="text-sm text-slate-500 mt-1 font-semibold">Please fill your details to proceed.</p>
                </div>

                <form onSubmit={handlePopupSubmit} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" required name="fullName" placeholder="Full Name *" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium text-sm" />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="email" required name="email" placeholder="Email Address *" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium text-sm" />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="tel" required name="phone" placeholder="Phone Number *" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium text-sm" />
                  </div>

                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 text-slate-400" size={18} />
                    <textarea name="message" placeholder="Your Message (Optional)" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium h-24 resize-none text-sm"></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? "Sending..." : "Submit Inquiry"} <Send size={18} />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}