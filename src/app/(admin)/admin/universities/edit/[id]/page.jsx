"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Image as ImageIcon, Plus, X, Loader2, Globe, ShieldCheck } from "lucide-react";

export default function EditUniversity({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  // States for pre-filling
  const [formData, setFormData] = useState({
    name: "", slug: "", country: "", location: "", established: "", ranking: "", fee: "", isFeatured: false,
  });

  // 1. Fetch Existing Data (Pre-filling Logic)
  useEffect(() => {
    const fetchUni = async () => {
      try {
        const res = await fetch(`/api/admin/universities/${id}`); // Make sure this endpoint returns the single uni data
        if (!res.ok) throw new Error("Failed to fetch");
        
        const data = await res.json();
        
        if (data) {
          // Setting the data into states so inputs get pre-filled
          setFormData({
            name: data.name || "",
            slug: data.slug || "",
            country: data.country || "",
            location: data.location || "",
            established: data.established || "",
            ranking: data.ranking || "",
            fee: data.fee || "",
            isFeatured: data.isFeatured || false,
          });
          setTags(data.tags || []);
          setFeatures(data.features || []);
          setImagePreview(data.image); // Showing existing image
        }
      } catch (err) {
        console.error("Error loading university:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUni();
  }, [id]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, file }); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    const data = new FormData();
    data.append("id", id); 
    
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") data.append(key, value);
    });
    data.append("tags", JSON.stringify(tags));
    data.append("features", JSON.stringify(features));

    try {
      const res = await fetch("/api/admin/universities", { 
        method: "POST", 
        body: data 
      });

      if (res.ok) {
        router.push("/admin/universities");
        router.refresh();
      } else {
        const errData = await res.json();
        alert(errData.error || "Update failed");
      }
    } catch (err) {
      alert("Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-slate-500 font-bold tracking-tight">Syncing Data...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10 bg-[#fbfcfd] min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div className="space-y-1">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors text-sm font-bold uppercase tracking-widest mb-2"
          >
            <ArrowLeft size={16}/> Back to Fleet
          </button>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Edit University <span className="text-blue-600">.</span>
          </h1>
          <p className="text-slate-500 font-medium">Update institutional records and assets.</p>
        </div>

        <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end px-4 border-r border-slate-200">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Database ID</span>
                <span className="text-xs font-mono text-slate-600">{id.slice(-8)}</span>
            </div>
            <button 
                form="edit-form"
                disabled={isSaving} 
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-200 transition-all flex items-center gap-3 disabled:opacity-50"
            >
                {isSaving ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>}
                {isSaving ? "Saving..." : "Update Record"}
            </button>
        </div>
      </div>

      <form id="edit-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Core Data */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <Globe size={20}/>
                </div>
                <h2 className="text-xl font-black text-slate-900">Institutional Profile</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2 space-y-2">
                <label className="input-label">Full University Name</label>
                <input required className="modern-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Kazan Federal University" />
              </div>
              
              <div className="space-y-2">
                <label className="input-label">Unique Slug</label>
                <input required className="modern-input" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="kazan-federal" />
              </div>

              <div className="space-y-2">
                <label className="input-label">Country Handle</label>
                <input required className="modern-input" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} placeholder="russia" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                    <ShieldCheck size={20}/>
                </div>
                <h2 className="text-xl font-black text-slate-900">Attributes & Tags</h2>
            </div>

            <div className="space-y-6">
              <div className="flex gap-3">
                <input 
                  className="modern-input flex-1" 
                  value={tagInput} 
                  onChange={e => setTagInput(e.target.value)} 
                  placeholder="Add attribute (e.g. WHO Approved)" 
                  onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())} 
                />
                <button type="button" onClick={handleAddTag} className="bg-slate-900 text-white px-6 rounded-2xl hover:bg-blue-600 transition-colors">
                    <Plus size={20}/>
                </button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {tags.length > 0 ? tags.map(t => (
                  <div key={t} className="flex items-center gap-2 bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border border-slate-100 hover:border-red-200 hover:text-red-500 transition-all group cursor-default">
                    {t} <X size={14} className="cursor-pointer transition-transform group-hover:rotate-90" onClick={() => setTags(tags.filter(tag => tag !== t))} />
                  </div>
                )) : (
                    <p className="text-slate-400 text-sm italic">No tags added yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Assets & Logistics */}
        <div className="lg:col-span-4 space-y-8">
          
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                <ImageIcon size={18} className="text-blue-600"/> Featured Media
            </h2>
            <div className="relative group rounded-[2rem] h-64 bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden hover:border-blue-400 transition-all duration-500">
              {imagePreview ? (
                <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <div className="text-slate-400 flex flex-col items-center gap-3">
                  <div className="p-4 bg-white rounded-2xl shadow-sm"><Plus size={24}/></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Replace Image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors pointer-events-none" />
              <input type="file" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
            <p className="mt-4 text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">Dimensions: 1200x800 recommended</p>
          </div>

          <div className="bg-slate-950 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
            <h2 className="text-lg font-black mb-8 text-blue-400 tracking-tight">Key Metrics</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Campus Location</label>
                 <input className="dark-input" placeholder="City, Region" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Fee Structure</label>
                 <input className="dark-input" placeholder="e.g. ₹3.5L / Yr" value={formData.fee} onChange={e => setFormData({...formData, fee: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Rank</label>
                    <input className="dark-input" placeholder="#10" value={formData.ranking} onChange={e => setFormData({...formData, ranking: e.target.value})} />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Established</label>
                    <input className="dark-input" placeholder="1920" value={formData.established} onChange={e => setFormData({...formData, established: e.target.value})} />
                </div>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <input 
                  type="checkbox" 
                  id="isFeatured" 
                  checked={formData.isFeatured} 
                  onChange={e => setFormData({...formData, isFeatured: e.target.checked})}
                  className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="isFeatured" className="text-sm font-medium text-slate-300 cursor-pointer">
                  Mark as Featured University
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>

      <style jsx>{`
        .input-label { font-size: 10px; font-weight: 900; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.15em; margin-bottom: 0.5rem; display: block; }
        .modern-input { width: 100%; padding: 1.1rem 1.5rem; background: #f8fafc; border-radius: 1.25rem; border: 1.5px solid #f1f5f9; font-weight: 700; font-size: 0.95rem; color: #1e293b; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .modern-input:focus { outline: none; background: white; border-color: #3b82f6; box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.05); }
        .dark-input { width: 100%; padding: 1rem 1.25rem; background: #0f172a; border-radius: 1.1rem; border: 1px solid #1e293b; font-size: 0.9rem; font-weight: 600; color: white; outline: none; transition: all 0.2s; }
        .dark-input:focus { border-color: #3b82f6; background: #020617; }
        .dark-input::placeholder { color: #475569; }
      `}</style>
    </div>
  );
}