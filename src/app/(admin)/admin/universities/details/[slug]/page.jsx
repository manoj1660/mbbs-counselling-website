"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { 
  Save, ArrowLeft, GraduationCap, Table, Stethoscope, 
  Home, MapPin, Plus, Trash2, ClipboardList, HelpCircle 
} from "lucide-react";

export default function UniversityDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug;

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // --- MAIN STATE ---
  const [formData, setFormData] = useState({
    name: "", intro: "", location: "", established: "",
    ranking: { world: "", country: "" },
    totalPackage: "",
    accommodation: { type: "", roomSharing: "", indianFood: "" },
    clinicalRotation: { practicalTraining: "" },
    cityLife: { name: "", description: "", travel: "" }
  });

  // --- DYNAMIC ARRAYS STATE ---
  const [highlights, setHighlights] = useState([]);
  const [eligibility, setEligibility] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [admissionSteps, setAdmissionSteps] = useState([]);
  const [tuitionFees, setTuitionFees] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    if (!slug) return;
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/university-details/${slug}`);
        const resData = await res.json();
        if (resData.success) {
          const d = resData.data;
          setFormData({
            name: d.name || "",
            intro: d.intro || "",
            location: d.location || "",
            established: d.established || "",
            ranking: d.ranking || { world: "", country: "" },
            totalPackage: d.totalPackage || "",
            accommodation: d.accommodation || { type: "", roomSharing: "", indianFood: "" },
            clinicalRotation: d.clinicalRotation || { practicalTraining: "" },
            cityLife: d.cityLife || { name: "", description: "", travel: "" }
          });
          setHighlights(d.highlights || []);
          setEligibility(d.eligibility || []);
          setDocuments(d.documents || []);
          setAdmissionSteps(d.admissionSteps || []);
          setTuitionFees(d.tuitionFees || []);
          setHospitals(d.clinicalRotation?.hospitals || []);
          setAmenities(d.accommodation?.amenities || []);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  // --- HELPER FUNCTIONS FOR DYNAMIC FIELDS ---
  const addRow = (setter, obj) => setter(prev => [...prev, obj]);
  const removeRow = (setter, index) => setter(prev => prev.filter((_, i) => i !== index));
  const updateArrayItem = (setter, index, value) => {
    setter(prev => {
      const newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      ...formData,
      slug,
      highlights,
      eligibility,
      documents,
      admissionSteps,
      tuitionFees,
      clinicalRotation: { ...formData.clinicalRotation, hospitals },
      accommodation: { ...formData.accommodation, amenities }
    };

    try {
      const res = await fetch("/api/admin/university-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        alert("Published Successfully! 🚀");
        router.push("/admin/universities");
      }
    } catch (err) {
      alert("Error saving data");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="text-center py-20 font-bold">Syncing Database...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 h-20 flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-xl"><ArrowLeft size={20}/></button>
          <div>
            <h1 className="text-xl font-bold">University Deep Detail</h1>
            <p className="text-xs text-blue-600 font-mono uppercase">{slug}</p>
          </div>
        </div>
        <button onClick={handleSubmit} disabled={isSaving} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold flex gap-2 items-center hover:bg-slate-800 transition-all">
          {isSaving ? "Saving..." : <><Save size={18}/> Publish Details</>}
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-8 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Main Content (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* 1. Basic Intro */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-bold mb-6"><GraduationCap className="text-blue-600"/> About University</h2>
            <div className="space-y-4">
              <input className="form-input-pro" placeholder="Full University Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <textarea className="form-input-pro min-h-[120px]" placeholder="Detailed Introduction..." value={formData.intro} onChange={e => setFormData({...formData, intro: e.target.value})} />
            </div>
          </section>

          {/* 2. Tuition Fees Table (Complex Dynamic) */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="flex items-center gap-2 text-lg font-bold"><Table className="text-emerald-600"/> Tuition Fees Structure</h2>
              <button onClick={() => addRow(setTuitionFees, { year: "", tuitionfees: "", tuitionINR: "" })} className="text-blue-600 text-sm font-bold flex items-center gap-1"><Plus size={16}/> Add Year</button>
            </div>
            <div className="space-y-3">
              {tuitionFees.map((fee, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl relative group">
                  <input className="form-input-pro bg-white" placeholder="Year (e.g. 1st Year)" value={fee.year} onChange={e => {
                    const newFees = [...tuitionFees];
                    newFees[idx].year = e.target.value;
                    setTuitionFees(newFees);
                  }} />
                  <input className="form-input-pro bg-white" placeholder="Fee (₽)" value={fee.tuitionfees} onChange={e => {
                    const newFees = [...tuitionFees];
                    newFees[idx].tuitionfees = e.target.value;
                    setTuitionFees(newFees);
                  }} />
                  <div className="flex gap-2">
                    <input className="form-input-pro bg-white" placeholder="Fee (₹)" value={fee.tuitionINR} onChange={e => {
                      const newFees = [...tuitionFees];
                      newFees[idx].tuitionINR = e.target.value;
                      setTuitionFees(newFees);
                    }} />
                    <button onClick={() => removeRow(setTuitionFees, idx)} className="text-red-400 hover:text-red-600"><Trash2 size={18}/></button>
                  </div>
                </div>
              ))}
              <input className="form-input-pro mt-4" placeholder="Total Package (e.g. ₹25L - ₹30L)" value={formData.totalPackage} onChange={e => setFormData({...formData, totalPackage: e.target.value})} />
            </div>
          </section>

          {/* 3. Admission Steps */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="flex items-center gap-2 text-lg font-bold"><ClipboardList className="text-orange-600"/> Admission Steps</h2>
              <button onClick={() => addRow(setAdmissionSteps, "")} className="text-blue-600 text-sm font-bold flex items-center gap-1"><Plus size={16}/> Add Step</button>
            </div>
            {admissionSteps.map((step, idx) => (
              <div key={idx} className="flex gap-3 mb-3">
                <span className="bg-slate-100 w-10 h-10 rounded-full flex items-center justify-center font-bold text-slate-500">{idx+1}</span>
                <input className="form-input-pro" value={step} onChange={e => updateArrayItem(setAdmissionSteps, idx, e.target.value)} placeholder="Enter admission step..." />
                <button onClick={() => removeRow(setAdmissionSteps, idx)} className="text-red-400"><Trash2 size={18}/></button>
              </div>
            ))}
          </section>

        </div>

        {/* RIGHT COLUMN: Stats & Meta (4 Cols) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Quick Stats */}
          <section className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl shadow-blue-100">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><MapPin size={20} className="text-blue-400"/> Key Information</h2>
            <div className="space-y-4">
              <div><label className="text-[10px] uppercase font-bold text-slate-400">Location</label><input className="dark-input" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[10px] uppercase font-bold text-slate-400">World Rank</label><input className="dark-input" value={formData.ranking.world} onChange={e => setFormData({...formData, ranking: {...formData.ranking, world: e.target.value}})} /></div>
                <div><label className="text-[10px] uppercase font-bold text-slate-400">Country Rank</label><input className="dark-input" value={formData.ranking.country} onChange={e => setFormData({...formData, ranking: {...formData.ranking, country: e.target.value}})} /></div>
              </div>
            </div>
          </section>

          {/* Clinical & Hospitals */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><Stethoscope className="text-red-500"/> Clinical Exposure</h2>
            <div className="space-y-4">
               <textarea className="form-input-pro text-sm" placeholder="Practical Training Info..." value={formData.clinicalRotation.practicalTraining} onChange={e => setFormData({...formData, clinicalRotation: {...formData.clinicalRotation, practicalTraining: e.target.value}})} />
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-400">Hospitals List</label>
                 {hospitals.map((h, i) => (
                   <div key={i} className="flex gap-2">
                     <input className="form-input-pro py-2 text-xs" value={h} onChange={e => updateArrayItem(setHospitals, i, e.target.value)} />
                     <button onClick={() => removeRow(setHospitals, i)}><Trash2 size={14} className="text-red-300"/></button>
                   </div>
                 ))}
                 <button onClick={() => addRow(setHospitals, "")} className="text-xs font-bold text-blue-500">+ Add Hospital</button>
               </div>
            </div>
          </section>

          {/* Accommodation */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><Home className="text-indigo-500"/> Hostel & Food</h2>
            <div className="space-y-4">
               <input className="form-input-pro" placeholder="Room Type (e.g. 2-3 sharing)" value={formData.accommodation.roomSharing} onChange={e => setFormData({...formData, accommodation: {...formData.accommodation, roomSharing: e.target.value}})} />
               <input className="form-input-pro" placeholder="Indian Food availability" value={formData.accommodation.indianFood} onChange={e => setFormData({...formData, accommodation: {...formData.accommodation, indianFood: e.target.value}})} />
            </div>
          </section>

        </div>
      </main>

      {/* Internal CSS */}
      <style jsx>{`
        .form-input-pro { width: 100%; padding: 1rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 1.25rem; font-size: 0.875rem; transition: all 0.2s; }
        .form-input-pro:focus { outline: none; border-color: #3B82F6; background: white; }
        .dark-input { width: 100%; padding: 0.75rem; background: #1E293B; border: 1px solid #334155; border-radius: 1rem; color: white; font-size: 0.875rem; }
      `}</style>
    </div>
  );
}