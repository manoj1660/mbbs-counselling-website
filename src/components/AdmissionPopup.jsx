"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, MessageSquare, Send, CheckCircle, Loader2 } from "lucide-react";

export default function QuickPopupForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- POPUP LOGIC ---
  useEffect(() => {
    if (isSuccess) return;
    const initialTimer = setTimeout(() => setIsOpen(true), 10000);
    const repeatInterval = setInterval(() => {
      setIsOpen((prev) => (prev ? prev : true));
    }, 45000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(repeatInterval);
    };
  }, [isSuccess]);

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
        setIsSuccess(true);
        setTimeout(() => setIsOpen(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Common Input Class - Forced Colors
  const inputClass = "w-full pl-12 pr-4 py-4 bg-white text-[#0f172a] placeholder:text-slate-400 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-medium text-sm transition-all";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl relative p-8 md:p-10 border border-white"
          >
            {/* Close Button */}
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
              <X size={20} />
            </button>

            {isSuccess ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
                <CheckCircle size={50} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-black text-slate-900">Details Sent!</h3>
                <p className="text-slate-500 mt-2">We will contact you shortly.</p>
              </motion.div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-[#0f172a]">Quick Inquiry</h3>
                  <p className="text-sm text-slate-500 mt-1 font-semibold">Get expert guidance for MBBS abroad.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input type="text" required name="fullName" placeholder="Full Name *" className={inputClass} />
                  </div>

                  {/* Email Input */}
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input type="email" required name="email" placeholder="Email Address *" className={inputClass} />
                  </div>

                  {/* Phone Input */}
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input type="tel" required name="phone" placeholder="Phone Number *" className={inputClass} />
                  </div>

                  {/* Message Textarea */}
                  <div className="relative group">
                    <MessageSquare className="absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <textarea 
                       name="message" 
                       placeholder="Your Message (Optional)" 
                       className={`${inputClass} h-28 resize-none pt-4`}
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.98]"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Submit Inquiry"} 
                    {!isSubmitting && <Send size={18} />}
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