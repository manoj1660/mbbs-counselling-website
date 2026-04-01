"use client";
import { useState, useEffect } from "react";
import { Save, Layout, Search, Globe, CheckCircle2 } from "lucide-react";

export default function PageSettings() {
  const [activePage, setActivePage] = useState("universities-main");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [seoData, setSeoData] = useState({
    metaTitle: "",
    metaDescription: "",
    keywords: ""
  });

  // Jab page change ho toh purana data fetch karein
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/admin/page-settings?pageName=${activePage}`);
      const result = await res.json();
      if (result.success && result.data) {
        setSeoData({
          metaTitle: result.data.seo?.metaTitle || "",
          metaDescription: result.data.seo?.metaDescription || "",
          keywords: result.data.seo?.keywords?.join(", ") || ""
        });
      } else {
        setSeoData({ metaTitle: "", metaDescription: "", keywords: "" });
      }
    };
    fetchData();
  }, [activePage]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/page-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageName: activePage,
          seo: {
            metaTitle: seoData.metaTitle,
            metaDescription: seoData.metaDescription,
            keywords: seoData.keywords.split(",").map(k => k.trim())
          }
        }),
      });

      if (res.ok) {
        setMessage("Settings Updated Successfully! ✅");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      alert("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 sm:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Global Page SEO</h1>
            <p className="text-slate-500 font-medium mt-1">Manage search appearance for main landing pages</p>
          </div>
          {message && <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl text-sm font-bold animate-bounce">{message}</div>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Sidebar - Select Page */}
          <div className="space-y-3">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2">Select Page</p>
            {[
              { id: "universities-main", label: "All Universities" },
              { id: "home-main", label: "Home Page" },
              { id: "contact-main", label: "Contact Us" },
              { id: "about", label: "About Us" }
            ].map((page) => (
              <button
                key={page.id}
                onClick={() => setActivePage(page.id)}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold text-sm transition-all ${
                  activePage === page.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                  : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
                }`}
              >
                <Layout size={18} />
                {page.label}
              </button>
            ))}
          </div>

          {/* Main Form */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-8">
              
              <div className="flex items-center gap-3 pb-4 border-b border-slate-50">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Search size={20}/></div>
                <h2 className="font-bold text-slate-800">SEO Configuration</h2>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Meta Title</label>
                <input 
                  className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none transition-all font-semibold"
                  value={seoData.metaTitle}
                  onChange={(e) => setSeoData({...seoData, metaTitle: e.target.value})}
                  placeholder="e.g. Best Universities for MBBS Abroad"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Meta Description</label>
                <textarea 
                  className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none transition-all font-semibold min-h-[120px]"
                  value={seoData.metaDescription}
                  onChange={(e) => setSeoData({...seoData, metaDescription: e.target.value})}
                  placeholder="Write a catchy summary for Google..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Keywords (Comma Separated)</label>
                <input 
                  className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none transition-all font-semibold"
                  value={seoData.keywords}
                  onChange={(e) => setSeoData({...seoData, keywords: e.target.value})}
                  placeholder="mbbs, study abroad, russia, etc."
                />
              </div>

              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-slate-900 text-white p-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-slate-200"
              >
                <Save size={20} />
                {isSaving ? "Saving..." : "Update Page Settings"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}