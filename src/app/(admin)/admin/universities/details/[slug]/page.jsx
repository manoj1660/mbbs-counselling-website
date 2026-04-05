"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import TiptapEditor from "@/components/admin/TiptapEditor";
import {
  Save,
  ArrowLeft,
  GraduationCap,
  Table,
  Stethoscope,
  Home,
  MapPin,
  Plus,
  Trash2,
  ClipboardList,
  Search,
  Star,
  Image as ImageIcon,
  Upload,
  Loader2,
  CheckCircle2,
  FileText,
  Zap,
  Building2,
  Briefcase,
  Globe // Added for Website Link icon
} from "lucide-react";

export default function UniversityDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const originalSlug = params?.slug;

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // --- SEO & IDENTITY STATE ---
  const [currentSlug, setCurrentSlug] = useState("");
  const [seoData, setSeoData] = useState({
    metaTitle: "",
    metaDescription: "",
    keywords: "",
  });

  // --- MAIN STATE ---
  const [formData, setFormData] = useState({
    name: "",
    intro: "",
    location: "",
    established: "",
    image: "",
    imageAlt: "",
    rating: 4.5,
    courseDuration: "6 Years",
    ranking: { world: "", country: "" },
    totalPackage: "",
    accommodation: { type: "", roomSharing: "", indianFood: "" },
    clinicalRotation: { practicalTraining: "" },
    cityLife: { name: "", description: "", travel: "" },
    detailedContent: "",
    websiteUrl: "", // Added websiteUrl field
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
    if (!originalSlug) return;
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/university-details/${originalSlug}`);
        const resData = await res.json();
        if (resData.success) {
          const d = resData.data;
          setFormData({
            name: d.name || "",
            intro: d.intro || "",
            location: d.location || "",
            established: d.established || "",
            image: d.image || "",
            imageAlt: d.imageAlt || "",
            rating: d.rating || 4.5,
            courseDuration: d.courseDuration || "6 Years",
            ranking: d.ranking || { world: "", country: "" },
            totalPackage: d.totalPackage || "",
            accommodation: d.accommodation || { type: "", roomSharing: "", indianFood: "" },
            clinicalRotation: d.clinicalRotation || { practicalTraining: "" },
            cityLife: d.cityLife || { name: "", description: "", travel: "" },
            detailedContent: d.detailedContent || "",
            websiteUrl: d.websiteUrl || "", // Added fetch logic
          });
          setCurrentSlug(d.slug || originalSlug);
          setSeoData({
            metaTitle: d.seo?.metaTitle || "",
            metaDescription: d.seo?.metaDescription || "",
            keywords: d.seo?.keywords?.join(", ") || "",
          });
          setHighlights(d.highlights || []);
          setEligibility(d.eligibility || []);
          setDocuments(d.documents || []);
          setAdmissionSteps(d.admissionSteps || []);
          setTuitionFees(d.tuitionFees || []);
          setHospitals(d.clinicalRotation?.hospitals || []);
          setAmenities(d.accommodation?.facilities || []);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [originalSlug]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { alert("Max 2MB allowed."); return; }
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const addRow = (setter, defaultValue) => setter((prev) => [...prev, defaultValue]);
  const removeRow = (setter, index) => setter((prev) => prev.filter((_, i) => i !== index));
  const updateArrayItem = (setter, index, value) => {
    setter((prev) => {
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
      oldSlug: originalSlug,
      newSlug: currentSlug,
      seo: {
        metaTitle: seoData.metaTitle,
        metaDescription: seoData.metaDescription,
        keywords: seoData.keywords.split(",").map((k) => k.trim()),
      },
      highlights,
      eligibility,
      documents,
      admissionSteps,
      tuitionFees,
      clinicalRotation: { ...formData.clinicalRotation, hospitals },
      accommodation: { ...formData.accommodation, facilities: amenities },
    };

    try {
      const res = await fetch("/api/admin/university-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert("Published Successfully! 🚀");
        router.push(`/admin/universities/detail/${currentSlug}`);
      }
    } catch (err) {
      alert("Error saving data");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
      <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
      <p className="font-bold text-slate-500 uppercase text-xs tracking-widest">Syncing Database...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 h-20 flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-xl"><ArrowLeft size={20} /></button>
          <div>
            <h1 className="text-xl font-bold">Deep Editor</h1>
            <p className="text-[10px] text-blue-600 font-mono uppercase tracking-widest">{currentSlug}</p>
          </div>
        </div>
        <button onClick={handleSubmit} disabled={isSaving} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold flex gap-2 items-center hover:bg-slate-800 transition-all shadow-lg">
          {isSaving ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Publish Details</>}
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-8 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          
          {/* --- SEO --- */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm border-l-4 border-l-blue-600">
            <h2 className="flex items-center gap-2 text-lg font-bold mb-6 text-blue-600"><Search size={22} /> SEO & Identity</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input className="form-input-pro" placeholder="Meta Title" value={seoData.metaTitle} onChange={(e) => setSeoData({ ...seoData, metaTitle: e.target.value })} />
                <input className="form-input-pro font-mono text-blue-600" placeholder="Slug" value={currentSlug} onChange={(e) => setCurrentSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))} />
              </div>
              <textarea className="form-input-pro" placeholder="Meta Description" value={seoData.metaDescription} onChange={(e) => setSeoData({ ...seoData, metaDescription: e.target.value })} />
              <input className="form-input-pro" placeholder="Keywords (comma separated)" value={seoData.keywords} onChange={(e) => setSeoData({ ...seoData, keywords: e.target.value })} />
            </div>
          </section>

          {/* --- KEY HIGHLIGHTS --- */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm border-l-4 border-l-amber-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="flex items-center gap-2 text-lg font-bold text-amber-600"><Zap size={22} /> Key Highlights</h2>
              <button onClick={() => addRow(setHighlights, "")} className="text-blue-600 text-xs font-bold">+ Add Point</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {highlights.map((h, i) => (
                <div key={i} className="flex gap-2">
                  <input className="form-input-pro py-2" placeholder="e.g. NMC Approved" value={h} onChange={(e) => updateArrayItem(setHighlights, i, e.target.value)} />
                  <button onClick={() => removeRow(setHighlights, i)} className="text-red-300"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </section>

          {/* --- BASIC INFO --- */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-bold mb-6"><GraduationCap className="text-blue-600" /> Basic Info</h2>
            <div className="grid grid-cols-2 gap-6 mb-4">
              <input className="form-input-pro font-bold" placeholder="University Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                  {formData.image ? <img src={formData.image} className="w-full h-full object-cover" /> : <ImageIcon className="m-auto mt-3 text-slate-300" size={18} />}
                </div>
                <label className="flex-1 cursor-pointer bg-slate-50 border border-dashed border-slate-300 p-2 rounded-lg text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <Upload size={12} className="inline mr-1" /> Image
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              </div>
            </div>

            {/* WEBSITE URL FIELD ADDED HERE */}
            <div className="flex items-center gap-3 mb-4">
               <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                  <Globe size={20} />
               </div>
               <input 
                 className="form-input-pro flex-1 border-blue-100" 
                 placeholder="Official Website Link (e.g. https://university.com)" 
                 value={formData.websiteUrl} 
                 onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })} 
               />
            </div>

            <textarea className="form-input-pro min-h-[100px]" placeholder="Brief introduction..." value={formData.intro} onChange={(e) => setFormData({ ...formData, intro: e.target.value })} />
          </section>

          {/* --- CITY LIFE --- */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm border-l-4 border-l-emerald-500">
            <h2 className="flex items-center gap-2 text-lg font-bold text-emerald-600 mb-6"><Building2 size={22} /> City Life Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase">City Name</label>
                  <input className="form-input-pro" placeholder="e.g. Tbilisi" value={formData.cityLife.name} onChange={(e) => setFormData({ ...formData, cityLife: { ...formData.cityLife, name: e.target.value } })} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Travel & Connectivity</label>
                  <input className="form-input-pro" placeholder="e.g. 2 hrs from Airport" value={formData.cityLife.travel} onChange={(e) => setFormData({ ...formData, cityLife: { ...formData.cityLife, travel: e.target.value } })} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase">City Description</label>
                <textarea className="form-input-pro" placeholder="Tell about weather, safety, and environment..." value={formData.cityLife.description} onChange={(e) => setFormData({ ...formData, cityLife: { ...formData.cityLife, description: e.target.value } })} />
              </div>
            </div>
          </section>

          {/* --- FEES --- */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800"><Table className="text-blue-600" /> Fee Structure</h2>
              <button onClick={() => addRow(setTuitionFees, { year: "", tuitionfees: "", tuitionINR: "" })} className="text-blue-600 text-xs font-bold">+ Add Year</button>
            </div>
            {tuitionFees.map((fee, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-3 mb-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <input className="form-input-pro bg-white" placeholder="Year" value={fee.year} onChange={(e) => { const nf = [...tuitionFees]; nf[idx].year = e.target.value; setTuitionFees(nf); }} />
                <input className="form-input-pro bg-white" placeholder="Local Fee" value={fee.tuitionfees} onChange={(e) => { const nf = [...tuitionFees]; nf[idx].tuitionfees = e.target.value; setTuitionFees(nf); }} />
                <div className="flex gap-2">
                  <input className="form-input-pro bg-white" placeholder="INR" value={fee.tuitionINR} onChange={(e) => { const nf = [...tuitionFees]; nf[idx].tuitionINR = e.target.value; setTuitionFees(nf); }} />
                  <button onClick={() => removeRow(setTuitionFees, idx)} className="text-red-300"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            <input className="form-input-pro mt-4 font-bold border-emerald-100 bg-emerald-50/50" placeholder="Total Package..." value={formData.totalPackage} onChange={(e) => setFormData({ ...formData, totalPackage: e.target.value })} />
          </section>

          {/* --- LONG EDITOR --- */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-purple-600"><ClipboardList size={20} /> Detailed Overview</h2>
            <TiptapEditor content={formData.detailedContent} onChange={(html) => setFormData({ ...formData, detailedContent: html })} />
          </section>
        </div>

        {/* --- SIDEBAR --- */}
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-xl">
            <h2 className="text-lg font-bold mb-6 text-blue-400 flex items-center gap-2"><Star size={20} /> Ratings & Rank</h2>
            <div className="space-y-4">
              <input type="number" step="0.1" className="dark-input" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} />
              <div className="grid grid-cols-2 gap-4">
                <input className="dark-input" placeholder="World" value={formData.ranking.world} onChange={(e) => setFormData({ ...formData, ranking: { ...formData.ranking, world: e.target.value } })} />
                <input className="dark-input" placeholder="Country" value={formData.ranking.country} onChange={(e) => setFormData({ ...formData, ranking: { ...formData.ranking, country: e.target.value } })} />
              </div>
              <input className="dark-input" placeholder="Location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
            </div>
          </section>

          {/* Eligibility */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-orange-600 flex items-center gap-2"><CheckCircle2 size={20} /> Eligibility</h2>
              <button onClick={() => addRow(setEligibility, "")} className="text-xs font-bold text-blue-600">+ Add</button>
            </div>
            {eligibility.map((el, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input className="form-input-pro py-2 text-xs" value={el} onChange={(e) => updateArrayItem(setEligibility, i, e.target.value)} />
                <button onClick={() => removeRow(setEligibility, i)}><Trash2 size={14} className="text-red-200" /></button>
              </div>
            ))}
          </section>

          {/* Documents Required */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm border-l-4 border-l-red-500">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-red-600 flex items-center gap-2"><FileText size={20} /> Documents</h2>
              <button onClick={() => addRow(setDocuments, "")} className="text-xs font-bold text-blue-600">+ Add</button>
            </div>
            {documents.map((doc, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input className="form-input-pro py-2 text-xs" placeholder="e.g. Passport Copy" value={doc} onChange={(e) => updateArrayItem(setDocuments, i, e.target.value)} />
                <button onClick={() => removeRow(setDocuments, i)}><Trash2 size={14} className="text-red-200" /></button>
              </div>
            ))}
          </section>

          {/* Clinical Rotation */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm border-l-4 border-l-blue-400">
            <h2 className="text-lg font-bold text-blue-600 mb-4 flex items-center gap-2"><Stethoscope size={20} /> Clinical Work</h2>
            <div className="space-y-3">
              <input className="form-input-pro py-2 text-xs" placeholder="Practical Training Details" value={formData.clinicalRotation.practicalTraining} onChange={(e) => setFormData({ ...formData, clinicalRotation: { ...formData.clinicalRotation, practicalTraining: e.target.value } })} />
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Affiliated Hospitals</p>
                {hospitals.map((h, i) => (
                  <div key={i} className="flex gap-2">
                    <input className="form-input-pro py-2 text-xs" value={h} onChange={(e) => updateArrayItem(setHospitals, i, e.target.value)} />
                    <button onClick={() => removeRow(setHospitals, i)}><Trash2 size={14} className="text-red-200" /></button>
                  </div>
                ))}
                <button onClick={() => addRow(setHospitals, "")} className="text-[10px] font-bold text-blue-500">+ Add Hospital</button>
              </div>
            </div>
          </section>

          {/* Accommodation */}
          <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold mb-6 text-indigo-500 flex items-center gap-2"><Home size={20} /> Hostel & Mess</h2>
            <div className="space-y-3">
              <input className="form-input-pro" placeholder="Room Sharing" value={formData.accommodation.roomSharing} onChange={(e) => setFormData({ ...formData, accommodation: { ...formData.accommodation, roomSharing: e.target.value } })} />
              <input className="form-input-pro" placeholder="Indian Food" value={formData.accommodation.indianFood} onChange={(e) => setFormData({ ...formData, accommodation: { ...formData.accommodation, indianFood: e.target.value } })} />
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Facilities</p>
                {amenities.map((a, i) => (
                  <div key={i} className="flex gap-2">
                    <input className="form-input-pro py-2 text-xs" value={a} onChange={(e) => updateArrayItem(setAmenities, i, e.target.value)} />
                    <button onClick={() => removeRow(setAmenities, i)}><Trash2 size={14} className="text-red-200" /></button>
                  </div>
                ))}
                <button onClick={() => addRow(setAmenities, "")} className="text-[10px] font-bold text-indigo-500">+ Add Facility</button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <style jsx>{`
        .form-input-pro { width: 100%; padding: 0.75rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.75rem; font-size: 0.875rem; }
        .form-input-pro:focus { outline: none; border-color: #3b82f6; background: white; }
        .dark-input { width: 100%; padding: 0.75rem; background: #1e293b; border: 1px solid #334155; border-radius: 0.75rem; color: white; font-size: 0.875rem; }
      `}</style>
    </div>
  );
}


// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import {
//   Save, ArrowLeft, GraduationCap, Table, Stethoscope,
//   Home, MapPin, Plus, Trash2, ClipboardList, Globe
// } from "lucide-react";

// export default function UniversityDetailsPage() {
//   const router = useRouter();
//   const params = useParams();
//   const originalSlug = params?.slug; // URL se aaya hua asli slug

//   const [loading, setLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);

//   // --- SEO & SLUG STATE ---
//   const [currentSlug, setCurrentSlug] = useState("");

//   // --- MAIN STATE ---
//   const [formData, setFormData] = useState({
//     name: "", intro: "", location: "", established: "",
//     ranking: { world: "", country: "" },
//     totalPackage: "",
//     accommodation: { type: "", roomSharing: "", indianFood: "" },
//     clinicalRotation: { practicalTraining: "" },
//     cityLife: { name: "", description: "", travel: "" }
//   });

//   // --- DYNAMIC ARRAYS STATE ---
//   const [highlights, setHighlights] = useState([]);
//   const [eligibility, setEligibility] = useState([]);
//   const [documents, setDocuments] = useState([]);
//   const [admissionSteps, setAdmissionSteps] = useState([]);
//   const [tuitionFees, setTuitionFees] = useState([]);
//   const [hospitals, setHospitals] = useState([]);
//   const [amenities, setAmenities] = useState([]);

//   useEffect(() => {
//     if (!originalSlug) return;
//     const fetchData = async () => {
//       try {
//         const res = await fetch(`/api/university-details/${originalSlug}`);
//         const resData = await res.json();
//         if (resData.success) {
//           const d = resData.data;
//           setFormData({
//             name: d.name || "",
//             intro: d.intro || "",
//             location: d.location || "",
//             established: d.established || "",
//             ranking: d.ranking || { world: "", country: "" },
//             totalPackage: d.totalPackage || "",
//             accommodation: d.accommodation || { type: "", roomSharing: "", indianFood: "" },
//             clinicalRotation: d.clinicalRotation || { practicalTraining: "" },
//             cityLife: d.cityLife || { name: "", description: "", travel: "" }
//           });
//           setCurrentSlug(d.slug || originalSlug); // Slug set kar rahe hain
//           setHighlights(d.highlights || []);
//           setEligibility(d.eligibility || []);
//           setDocuments(d.documents || []);
//           setAdmissionSteps(d.admissionSteps || []);
//           setTuitionFees(d.tuitionFees || []);
//           setHospitals(d.clinicalRotation?.hospitals || []);
//           setAmenities(d.accommodation?.amenities || []);
//         }
//       } catch (err) {
//         console.error("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [originalSlug]);

//   const addRow = (setter, obj) => setter(prev => [...prev, obj]);
//   const removeRow = (setter, index) => setter(prev => prev.filter((_, i) => i !== index));
//   const updateArrayItem = (setter, index, value) => {
//     setter(prev => {
//       const newArr = [...prev];
//       newArr[index] = value;
//       return newArr;
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSaving(true);

//     // Backend ko bata rahe hain ki purana slug kya tha aur naya kya hai
//     const payload = {
//       ...formData,
//       oldSlug: originalSlug,
//       newSlug: currentSlug,
//       highlights,
//       eligibility,
//       documents,
//       admissionSteps,
//       tuitionFees,
//       clinicalRotation: { ...formData.clinicalRotation, hospitals },
//       accommodation: { ...formData.accommodation, amenities }
//     };

//     try {
//       const res = await fetch("/api/admin/university-details", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//       });
//       if (res.ok) {
//         alert("Published Successfully! 🚀");
//         // Agar slug change hua hai, toh naye page par bhej do
//         if (originalSlug !== currentSlug) {
//           router.push(`/admin/universities/${currentSlug}`);
//         } else {
//           router.refresh();
//         }
//       }
//     } catch (err) {
//       alert("Error saving data");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   if (loading) return <div className="text-center py-20 font-bold">Syncing Database...</div>;

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] pb-20">
//       {/* Sticky Header */}
//       <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 h-20 flex items-center justify-between px-8">
//         <div className="flex items-center gap-4">
//           <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-xl"><ArrowLeft size={20}/></button>
//           <div>
//             <h1 className="text-xl font-bold">University Deep Detail</h1>
//             <p className="text-[10px] text-blue-600 font-mono uppercase tracking-widest">{originalSlug}</p>
//           </div>
//         </div>
//         <button onClick={handleSubmit} disabled={isSaving} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold flex gap-2 items-center hover:bg-slate-800 transition-all">
//           {isSaving ? "Saving..." : <><Save size={18}/> Publish Details</>}
//         </button>
//       </header>

//       <main className="max-w-7xl mx-auto px-8 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">

//         {/* LEFT COLUMN: Main Content (8 Cols) */}
//         <div className="lg:col-span-8 space-y-8">

//           {/* 1. SEO & Identity (NEW SECTION) */}
//           <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm border-l-4 border-l-blue-500">
//             <h2 className="flex items-center gap-2 text-lg font-bold mb-6"><Globe className="text-blue-600"/> SEO & Identity</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full University Name</label>
//                 <input className="form-input-pro" placeholder="e.g. Saratov State Medical University" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
//               </div>
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Custom URL Slug (Careful!)</label>
//                 <input
//                   className="form-input-pro bg-blue-50/50 border-blue-100 font-mono text-blue-700"
//                   placeholder="university-url-slug"
//                   value={currentSlug}
//                   onChange={e => setCurrentSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
//                 />
//               </div>
//             </div>
//             <div className="mt-4 p-3 bg-blue-50 rounded-xl text-[10px] text-blue-600 font-medium">
//               PRO TIP: Changing the slug will update the URL for both the Country Card and this Detail Page.
//             </div>
//           </section>

//           {/* 2. Basic Intro */}
//           <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
//             <h2 className="flex items-center gap-2 text-lg font-bold mb-6"><GraduationCap className="text-blue-600"/> About University</h2>
//             <div className="space-y-4">
//               <textarea className="form-input-pro min-h-[120px]" placeholder="Detailed Introduction..." value={formData.intro} onChange={e => setFormData({...formData, intro: e.target.value})} />
//             </div>
//           </section>

//           {/* 3. Tuition Fees Table */}
//           <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="flex items-center gap-2 text-lg font-bold"><Table className="text-emerald-600"/> Tuition Fees Structure</h2>
//               <button onClick={() => addRow(setTuitionFees, { year: "", tuitionfees: "", tuitionINR: "" })} className="text-blue-600 text-sm font-bold flex items-center gap-1"><Plus size={16}/> Add Year</button>
//             </div>
//             <div className="space-y-3">
//               {tuitionFees.map((fee, idx) => (
//                 <div key={idx} className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl relative group">
//                   <input className="form-input-pro bg-white" placeholder="Year" value={fee.year} onChange={e => {
//                     const newFees = [...tuitionFees];
//                     newFees[idx].year = e.target.value;
//                     setTuitionFees(newFees);
//                   }} />
//                   <input className="form-input-pro bg-white" placeholder="Fee (Local)" value={fee.tuitionfees} onChange={e => {
//                     const newFees = [...tuitionFees];
//                     newFees[idx].tuitionfees = e.target.value;
//                     setTuitionFees(newFees);
//                   }} />
//                   <div className="flex gap-2">
//                     <input className="form-input-pro bg-white" placeholder="Fee (INR)" value={fee.tuitionINR} onChange={e => {
//                       const newFees = [...tuitionFees];
//                       newFees[idx].tuitionINR = e.target.value;
//                       setTuitionFees(newFees);
//                     }} />
//                     <button onClick={() => removeRow(setTuitionFees, idx)} className="text-red-400 hover:text-red-600"><Trash2 size={18}/></button>
//                   </div>
//                 </div>
//               ))}
//               <input className="form-input-pro mt-4" placeholder="Total Package (e.g. ₹25L - ₹30L)" value={formData.totalPackage} onChange={e => setFormData({...formData, totalPackage: e.target.value})} />
//             </div>
//           </section>

//           {/* 4. Admission Steps */}
//           <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="flex items-center gap-2 text-lg font-bold"><ClipboardList className="text-orange-600"/> Admission Steps</h2>
//               <button onClick={() => addRow(setAdmissionSteps, "")} className="text-blue-600 text-sm font-bold flex items-center gap-1"><Plus size={16}/> Add Step</button>
//             </div>
//             {admissionSteps.map((step, idx) => (
//               <div key={idx} className="flex gap-3 mb-3">
//                 <span className="bg-slate-100 w-10 h-10 rounded-full flex items-center justify-center font-bold text-slate-500">{idx+1}</span>
//                 <input className="form-input-pro" value={step} onChange={e => updateArrayItem(setAdmissionSteps, idx, e.target.value)} placeholder="Enter admission step..." />
//                 <button onClick={() => removeRow(setAdmissionSteps, idx)} className="text-red-400"><Trash2 size={18}/></button>
//               </div>
//             ))}
//           </section>

//         </div>

//         {/* RIGHT COLUMN: Stats & Meta (4 Cols) */}
//         <div className="lg:col-span-4 space-y-8">

//           <section className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl">
//             <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><MapPin size={20} className="text-blue-400"/> Key Information</h2>
//             <div className="space-y-4">
//               <div><label className="text-[10px] uppercase font-bold text-slate-400">Location</label><input className="dark-input" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} /></div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div><label className="text-[10px] uppercase font-bold text-slate-400">World Rank</label><input className="dark-input" value={formData.ranking.world} onChange={e => setFormData({...formData, ranking: {...formData.ranking, world: e.target.value}})} /></div>
//                 <div><label className="text-[10px] uppercase font-bold text-slate-400">Country Rank</label><input className="dark-input" value={formData.ranking.country} onChange={e => setFormData({...formData, ranking: {...formData.ranking, country: e.target.value}})} /></div>
//               </div>
//             </div>
//           </section>

//           <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
//             <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><Stethoscope className="text-red-500"/> Clinical Exposure</h2>
//             <div className="space-y-4">
//                <textarea className="form-input-pro text-sm" placeholder="Practical Training Info..." value={formData.clinicalRotation.practicalTraining} onChange={e => setFormData({...formData, clinicalRotation: {...formData.clinicalRotation, practicalTraining: e.target.value}})} />
//                <div className="space-y-2">
//                  <label className="text-xs font-bold text-slate-400">Hospitals List</label>
//                  {hospitals.map((h, i) => (
//                    <div key={i} className="flex gap-2">
//                      <input className="form-input-pro py-2 text-xs" value={h} onChange={e => updateArrayItem(setHospitals, i, e.target.value)} />
//                      <button onClick={() => removeRow(setHospitals, i)}><Trash2 size={14} className="text-red-300"/></button>
//                    </div>
//                  ))}
//                  <button onClick={() => addRow(setHospitals, "")} className="text-xs font-bold text-blue-500">+ Add Hospital</button>
//                </div>
//             </div>
//           </section>

//           <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
//             <h2 className="text-lg font-bold mb-6 flex items-center gap-2"><Home className="text-indigo-500"/> Hostel & Food</h2>
//             <div className="space-y-4">
//                <input className="form-input-pro" placeholder="Room Type" value={formData.accommodation.roomSharing} onChange={e => setFormData({...formData, accommodation: {...formData.accommodation, roomSharing: e.target.value}})} />
//                <input className="form-input-pro" placeholder="Indian Food" value={formData.accommodation.indianFood} onChange={e => setFormData({...formData, accommodation: {...formData.accommodation, indianFood: e.target.value}})} />
//             </div>
//           </section>

//         </div>
//       </main>

//       <style jsx>{`
//         .form-input-pro { width: 100%; padding: 1rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 1.25rem; font-size: 0.875rem; transition: all 0.2s; }
//         .form-input-pro:focus { outline: none; border-color: #3B82F6; background: white; }
//         .dark-input { width: 100%; padding: 0.75rem; background: #1E293B; border: 1px solid #334155; border-radius: 1rem; color: white; font-size: 0.875rem; }
//       `}</style>
//     </div>
//   );
// }
