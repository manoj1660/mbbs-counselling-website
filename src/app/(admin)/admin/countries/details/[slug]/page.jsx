"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Save, ArrowLeft, Globe, GraduationCap, 
  Layers, CheckCircle2, AlertCircle, Trash2, Plus 
} from "lucide-react";

export default function CountryDetailsPage({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [slug, setSlug] = useState("");
  
  const [formData, setFormData] = useState({
    title: "", heroText: "", description: "", feeRange: "",
    students: "", colleges: "", medium: "English",
    pcb: "", age: "", neet: "",
  });
  
  const [whyStudyPoints, setWhyStudyPoints] = useState([]);
  const [newPoint, setNewPoint] = useState("");

  useEffect(() => {
    const init = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
      try {
        const res = await fetch(`/api/country-details/${resolvedParams.slug}`);
        const resData = await res.json();
        if (resData.success) {
          const d = resData.data;
          setFormData({
            title: d.title || "",
            heroText: d.heroText || "",
            description: d.description || "",
            feeRange: d.feeRange || "",
            students: d.stats?.students || "",
            colleges: d.stats?.colleges || "",
            medium: d.stats?.medium || "English",
            pcb: d.eligibility?.pcb || "",
            age: d.eligibility?.age || "",
            neet: d.eligibility?.neet || "",
          });
          setWhyStudyPoints(d.whyStudy || []);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [params]);

  const handleAddPoint = () => {
    if (newPoint.trim()) {
      setWhyStudyPoints([...whyStudyPoints, newPoint.trim()]);
      setNewPoint("");
    }
  };

  const removePoint = (index) => {
    setWhyStudyPoints(whyStudyPoints.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const data = new FormData();
    
    // Mapping keys to match your existing API route logic
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append("slug", slug);
    data.append("whyStudy", JSON.stringify(whyStudyPoints));

    try {
      const res = await fetch("/api/admin/country-details", {
        method: "POST",
        body: data
      });
      if (res.ok) {
        router.push("/admin/countries");
        router.refresh();
      }
    } catch (err) {
      alert("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-500 font-medium animate-pulse">Syncing with database...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-none mb-1">Editing Destination</h1>
              <p className="text-xs font-medium text-blue-600 uppercase tracking-widest">{slug}</p>
            </div>
          </div>
          
          <button 
            onClick={handleSubmit}
            disabled={isSaving}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all disabled:opacity-50"
          >
            {isSaving ? "Saving..." : <><Save size={18} /> Publish Changes</>}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Core Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section: Basic Information */}
          <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl"><Globe size={20}/></div>
              <h2 className="text-lg font-bold text-slate-800">General Overview</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Page Display Title</label>
                  <input 
                    className="form-input-pro"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g. MBBS in Russia"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Hero Catchphrase</label>
                  <input 
                    className="form-input-pro"
                    value={formData.heroText}
                    onChange={e => setFormData({...formData, heroText: e.target.value})}
                    placeholder="Brief catchy intro for the top of the page"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Detailed Description</label>
                  <textarea 
                    className="form-input-pro min-h-[150px] resize-none"
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section: Why Study (Interactive List) */}
          <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle2 size={20}/></div>
              <h2 className="text-lg font-bold text-slate-800">Key Advantages</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <input 
                  className="form-input-pro"
                  placeholder="Add a reason to study here..."
                  value={newPoint}
                  onChange={(e) => setNewPoint(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddPoint())}
                />
                <button 
                  type="button"
                  onClick={handleAddPoint}
                  className="bg-slate-100 p-4 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  <Plus size={20}/>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-4">
                {whyStudyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group border border-transparent hover:border-slate-200 transition-all">
                    <span className="text-sm font-medium text-slate-700">{point}</span>
                    <button 
                      onClick={() => removePoint(idx)}
                      className="text-slate-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={18}/>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Technical Stats & Eligibility */}
        <div className="space-y-6">
          {/* Financials & Scale */}
          <section className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl shadow-slate-200">
            <div className="flex items-center gap-3 mb-8">
              <Layers size={20} className="text-blue-400"/>
              <h2 className="text-lg font-bold">Metrics & Fees</h2>
            </div>
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pricing Range</label>
                <input className="dark-input" value={formData.feeRange} onChange={e => setFormData({...formData, feeRange: e.target.value})} placeholder="₹18L - ₹35L" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Students</label>
                <input className="dark-input" value={formData.students} onChange={e => setFormData({...formData, students: e.target.value})} placeholder="15,000+" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Colleges Count</label>
                <input className="dark-input" value={formData.colleges} onChange={e => setFormData({...formData, colleges: e.target.value})} placeholder="50+" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Instruction Medium</label>
                <input className="dark-input" value={formData.medium} onChange={e => setFormData({...formData, medium: e.target.value})} />
              </div>
            </div>
          </section>

          {/* Admission Rules */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <AlertCircle size={20} className="text-orange-500"/>
              <h2 className="text-lg font-bold text-slate-800">Eligibility</h2>
            </div>
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Academic (PCB %)</label>
                <input className="form-input-pro" value={formData.pcb} onChange={e => setFormData({...formData, pcb: e.target.value})} placeholder="50% for General" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Age Criteria</label>
                <input className="form-input-pro" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} placeholder="Min 17 Years" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Entrance Exam</label>
                <input className="form-input-pro" value={formData.neet} onChange={e => setFormData({...formData, neet: e.target.value})} placeholder="NEET Required" />
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Internal CSS for UI consistency */}
      <style jsx>{`
        .form-input-pro {
          width: 100%;
          padding: 0.875rem 1.25rem;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #1E293B;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .form-input-pro:focus {
          outline: none;
          background: #FFFFFF;
          border-color: #3B82F6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }
        .dark-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: #1E293B;
          border: 1px solid #334155;
          border-radius: 0.875rem;
          font-size: 0.875rem;
          color: white;
          transition: border 0.2s;
        }
        .dark-input:focus {
          outline: none;
          border-color: #60A5FA;
        }
      `}</style>
    </div>
  );
}