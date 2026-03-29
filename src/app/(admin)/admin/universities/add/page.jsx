"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Image as ImageIcon, Plus, X, Loader2, Globe, GraduationCap } from "lucide-react";

export default function AddUniversity() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "", slug: "", country: "", location: "", established: "", ranking: "", fee: "",
  });

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
    setLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append("tags", JSON.stringify(tags));

    try {
      const res = await fetch("/api/admin/universities", { method: "POST", body: data });
      if (res.ok) {
        router.push("/admin/universities");
        router.refresh();
      } else {
        alert("Something went wrong while saving.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
            Add New Institution <span className="text-blue-600">+</span>
          </h1>
          <p className="text-slate-500 font-medium">Onboard a new university to the global database.</p>
        </div>

        <button 
          form="add-uni-form"
          disabled={loading} 
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-200 transition-all flex items-center gap-3 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>}
          {loading ? "Publishing..." : "Publish University"}
        </button>
      </div>

      <form id="add-uni-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Core Data */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main Card */}
          <section className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <GraduationCap size={20}/>
                </div>
                <h2 className="text-xl font-black text-slate-900">General Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2 space-y-2">
                <label className="input-label">Full University Name</label>
                <input required className="modern-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Saratov State Medical University" />
              </div>
              
              <div className="space-y-2">
                <label className="input-label">Slug (URL Structure)</label>
                <input required className="modern-input" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="saratov-medical-university" />
              </div>

              <div className="space-y-2">
                <label className="input-label">Country Handle</label>
                <input required className="modern-input" value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} placeholder="russia" />
              </div>
            </div>
          </section>

          {/* Tags Section */}
          <section className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                    <Plus size={20}/>
                </div>
                <h2 className="text-xl font-black text-slate-900">Institutional Tags</h2>
            </div>

            <div className="space-y-6">
              <div className="flex gap-3">
                <input 
                  className="modern-input flex-1" 
                  value={tagInput} 
                  onChange={e => setTagInput(e.target.value)} 
                  placeholder="e.g. WHO Approved, NMC Approved" 
                  onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())} 
                />
                <button type="button" onClick={handleAddTag} className="bg-slate-900 text-white px-6 rounded-2xl hover:bg-blue-600 transition-colors">
                    Add
                </button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {tags.length > 0 ? tags.map(t => (
                  <div key={t} className="flex items-center gap-2 bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border border-slate-100 group transition-all">
                    {t} <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => setTags(tags.filter(tag => tag !== t))} />
                  </div>
                )) : (
                    <p className="text-slate-400 text-sm italic">No tags added yet. Press Enter to add.</p>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Assets & Metrics */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Media Card */}
          <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
            <h2 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2 justify-center">
                <ImageIcon size={18} className="text-blue-600"/> Featured Image
            </h2>
            <div className="relative group rounded-[2rem] h-64 bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden hover:border-blue-400 transition-all duration-500">
              {imagePreview ? (
                <img src={imagePreview} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <div className="text-slate-400 flex flex-col items-center gap-3">
                  <div className="p-4 bg-white rounded-2xl shadow-sm"><Plus size={24}/></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Select File</span>
                </div>
              )}
              <input type="file" required onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
            <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-loose">PNG or JPG. Max 5MB.</p>
          </section>

          {/* Metrics Card */}
          <section className="bg-slate-950 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
            <div className="flex items-center gap-2 mb-8 text-blue-400">
                <Globe size={18}/>
                <h2 className="text-lg font-black tracking-tight">Key Metrics</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Campus Location</label>
                 <input className="dark-input" placeholder="City, Region" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Annual Fee (INR)</label>
                 <input className="dark-input" placeholder="e.g. ₹2.5L / Yr" value={formData.fee} onChange={e => setFormData({...formData, fee: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">World Rank</label>
                    <input className="dark-input" placeholder="#1200" value={formData.ranking} onChange={e => setFormData({...formData, ranking: e.target.value})} />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Est. Year</label>
                    <input className="dark-input" placeholder="1950" value={formData.established} onChange={e => setFormData({...formData, established: e.target.value})} />
                </div>
              </div>
            </div>
          </section>

        </div>
      </form>

      <style jsx>{`
        .input-label { font-size: 10px; font-weight: 900; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.15em; margin-bottom: 0.5rem; display: block; }
        .modern-input { width: 100%; padding: 1.1rem 1.5rem; background: #f8fafc; border-radius: 1.25rem; border: 1.5px solid #f1f5f9; font-weight: 700; font-size: 0.95rem; color: #1e293b; transition: all 0.3s ease; }
        .modern-input:focus { outline: none; background: white; border-color: #3b82f6; box-shadow: 0 10px 20px -5px rgba(59, 130, 246, 0.05); }
        .dark-input { width: 100%; padding: 1rem 1.25rem; background: #0f172a; border-radius: 1.1rem; border: 1px solid #1e293b; font-size: 0.9rem; font-weight: 600; color: white; outline: none; transition: all 0.2s; }
        .dark-input:focus { border-color: #3b82f6; }
        .dark-input::placeholder { color: #334155; }
      `}</style>
    </div>
  );
}