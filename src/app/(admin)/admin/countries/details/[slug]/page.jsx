"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Save, ArrowLeft, Globe, GraduationCap, 
  Layers, CheckCircle2, AlertCircle, Trash2, Plus, Search,
  Image as ImageIcon, Info, Target, Zap
} from "lucide-react";

export default function CountryDetailsPage({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [slug, setSlug] = useState("");
  
  // -- CORE STATE --
  const [formData, setFormData] = useState({
    title: "", 
    heroText: "", 
    description: "", 
    feeRange: "",
    students: "", 
    colleges: "", 
    medium: "English",
    pcb: "", 
    age: "", 
    neet: "",
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: []
    }
  });
  
  const [whyStudyPoints, setWhyStudyPoints] = useState([]);
  const [newPoint, setNewPoint] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // -- FETCH DATA --
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
            seo: {
              metaTitle: d.seo?.metaTitle || "",
              metaDescription: d.seo?.metaDescription || "",
              keywords: d.seo?.keywords || []
            }
          });
          setWhyStudyPoints(d.whyStudy || []);
          if (d.image) setPreviewUrl(d.image);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [params]);

  // -- HANDLERS --
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

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
    if (e) e.preventDefault();
    setIsSaving(true);
    
    const data = new FormData();
    data.append("slug", slug);
    data.append("title", formData.title);
    data.append("heroText", formData.heroText);
    data.append("description", formData.description);
    data.append("feeRange", formData.feeRange);
    data.append("students", formData.students);
    data.append("colleges", formData.colleges);
    data.append("medium", formData.medium);
    data.append("pcb", formData.pcb);
    data.append("age", formData.age);
    data.append("neet", formData.neet);
    data.append("whyStudy", JSON.stringify(whyStudyPoints));
    data.append("seo", JSON.stringify(formData.seo));
    if (selectedFile) data.append("file", selectedFile);

    try {
      const res = await fetch("/api/admin/country-details", {
        method: "POST",
        body: data,
      });
      
      if (res.ok) {
        router.push("/admin/countries");
        router.refresh();
      } else {
        const errJson = await res.json();
        alert(`Error: ${errJson.error}`);
      }
    } catch (err) {
      alert("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-100 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-slate-500 font-semibold tracking-tight">Initializing Editor...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F1F5F9] pb-24">
      {/* --- PREMIUM HEADER --- */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={() => router.back()} className="group p-3 bg-slate-50 hover:bg-white border border-slate-200 rounded-2xl transition-all shadow-sm">
              <ArrowLeft size={20} className="text-slate-600 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded-md tracking-wider">CMS V2.0</span>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Edit Destination</h1>
              </div>
              <p className="text-sm font-medium text-slate-400">Manage content for <span className="text-blue-600 font-bold">{slug}</span></p>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <button 
              onClick={handleSubmit} 
              disabled={isSaving}
              className="relative group overflow-hidden flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] transition-all disabled:opacity-50 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Save size={18} className="relative z-10" />
              <span className="relative z-10">{isSaving ? "Saving Progress..." : "Publish to Production"}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 mt-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          
          {/* --- MAIN CONTENT AREA (Left 8 Cols) --- */}
          <div className="xl:col-span-8 space-y-10">
            
            {/* 1. HERO SECTION & MEDIA */}
            <section className="bg-white rounded-[2.5rem] border border-slate-200/60 p-10 shadow-xl shadow-slate-200/50">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-600 shadow-lg shadow-blue-200 text-white rounded-2xl"><ImageIcon size={24} /></div>
                  <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Hero & Visual Media</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {/* Image Upload Area */}
                <div className="relative group cursor-pointer">
                  <div className={`aspect-[21/9] rounded-[2rem] border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden ${previewUrl ? 'border-transparent' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}>
                    {previewUrl ? (
                      <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <div className="text-center p-6">
                        <div className="mx-auto w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 mb-4"><Plus /></div>
                        <p className="text-sm font-bold text-slate-600">Click to upload hero banner</p>
                        <p className="text-xs text-slate-400 mt-1">Recommended size: 1920x800px</p>
                      </div>
                    )}
                  </div>
                  <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>

                <div className="grid grid-cols-1 gap-6 mt-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Primary Page Title</label>
                    <input className="input-field" value={formData.title} onChange={(e)=>setFormData({...formData, title: e.target.value})} placeholder="e.g. Study MBBS in Russia" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Hero Sub-text</label>
                    <input className="input-field" value={formData.heroText} onChange={(e)=>setFormData({...formData, heroText: e.target.value})} placeholder="Join 5000+ Indian students studying abroad" />
                  </div>
                </div>
              </div>
            </section>

            {/* 2. DESCRIPTION AREA */}
            <section className="bg-white rounded-[2.5rem] border border-slate-200/60 p-10 shadow-xl shadow-slate-200/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><Info size={24} /></div>
                <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Detailed Content</h2>
              </div>
              <textarea 
                className="input-field min-h-[300px] py-6 leading-relaxed" 
                value={formData.description} 
                onChange={(e)=>setFormData({...formData, description: e.target.value})}
                placeholder="Write full destination details here..."
              />
            </section>

            {/* 3. SEO CONFIGURATION (CRITICAL) */}
            <section className="bg-white rounded-[2.5rem] border-2 border-blue-500/10 p-10 shadow-2xl shadow-blue-100/50 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -mr-32 -mt-32"></div>
               <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200"><Search size={24} /></div>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Search Engine Optimization</h2>
                    <p className="text-xs font-medium text-slate-400">Control how this page appears on Google</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="grid grid-cols-1 gap-8">
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em]">Meta Title Tag</label>
                      <input className="input-field border-blue-100 focus:border-blue-500 bg-blue-50/20" value={formData.seo.metaTitle} onChange={(e)=>setFormData({...formData, seo: {...formData.seo, metaTitle: e.target.value}})} placeholder="Google Search Title..." />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em]">Meta Description</label>
                      <textarea className="input-field border-blue-100 focus:border-blue-500 bg-blue-50/20 min-h-[120px]" value={formData.seo.metaDescription} onChange={(e)=>setFormData({...formData, seo: {...formData.seo, metaDescription: e.target.value}})} placeholder="Short summary for search results..." />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em]">Focus Keywords</label>
                      <input className="input-field border-blue-100 focus:border-blue-500 bg-blue-50/20" value={formData.seo.keywords.join(", ")} onChange={(e)=>setFormData({...formData, seo: {...formData.seo, keywords: e.target.value.split(",").map(k => k.trim())}})} placeholder="Keyword 1, Keyword 2, etc." />
                    </div>
                  </div>
                </div>
               </div>
            </section>
          </div>

          {/* --- SIDEBAR AREA (Right 4 Cols) --- */}
          <div className="xl:col-span-4 space-y-10">
            
            {/* 4. STATISTICS PANEL */}
            <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-slate-300 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-10"><Zap size={120} /></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 bg-white/10 rounded-2xl text-blue-400"><Layers size={24} /></div>
                  <h2 className="text-xl font-extrabold tracking-tight">Key Metrics</h2>
                </div>
                <div className="space-y-8">
                  {['feeRange', 'students', 'colleges', 'medium'].map((field) => (
                    <div key={field} className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{field.replace(/([A-Z])/g, ' $1')}</label>
                      <input className="sidebar-input" value={formData[field]} onChange={(e)=>setFormData({...formData, [field]: e.target.value})} placeholder={`Value for ${field}`} />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. ELIGIBILITY RULES */}
            <section className="bg-white rounded-[2.5rem] border border-slate-200/60 p-10 shadow-xl shadow-slate-200/50">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-orange-50 text-orange-500 rounded-2xl"><Target size={24} /></div>
                <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Eligibility</h2>
              </div>
              <div className="space-y-8">
                {['pcb', 'age', 'neet'].map((field) => (
                   <div key={field} className="space-y-3">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{field === 'pcb' ? 'PCB %' : field}</label>
                    <input className="input-field bg-slate-50/50" value={formData[field]} onChange={(e)=>setFormData({...formData, [field]: e.target.value})} placeholder={`e.g. ${field === 'pcb' ? '50%' : 'Required'}`} />
                  </div>
                ))}
              </div>
            </section>

            {/* 6. WHY STUDY POINTS */}
            <section className="bg-white rounded-[2.5rem] border border-slate-200/60 p-10 shadow-xl shadow-slate-200/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><CheckCircle2 size={24} /></div>
                <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Advantages</h2>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <input className="input-field" placeholder="Add logic..." value={newPoint} onChange={(e)=>setNewPoint(e.target.value)} onKeyPress={(e)=>e.key==='Enter' && handleAddPoint()} />
                  <button onClick={handleAddPoint} className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-colors"><Plus size={20}/></button>
                </div>
                <div className="space-y-3 pt-4">
                  {whyStudyPoints.map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl group border border-transparent hover:border-slate-200 transition-all">
                      <span className="text-sm font-bold text-slate-700">{p}</span>
                      <button onClick={() => removePoint(i)} className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={18}/></button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* --- INJECTED STYLES --- */}
      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 1.25rem 1.5rem;
          background: #ffffff;
          border: 2px solid #F1F5F9;
          border-radius: 1.25rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: #1e293b;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .input-field:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.1);
        }
        .sidebar-input {
          width: 100%;
          padding: 1.1rem 1.5rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 1.25rem;
          font-size: 0.9rem;
          color: white;
          font-weight: 600;
          transition: all 0.2s;
        }
        .sidebar-input:focus {
          outline: none;
          background: rgba(255,255,255,0.1);
          border-color: #60a5fa;
        }
      `}</style>
    </div>
  );
}