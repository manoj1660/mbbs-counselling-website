"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, Edit, Trash2, Plus } from "lucide-react";

export default function ManageCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCountries = async () => {
    try {
      const res = await fetch("/api/countries");
      const data = await res.json();
      setCountries(data);
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCountries(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this country?")) return;
    try {
      const res = await fetch(`/api/admin/countries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCountries(countries.filter((c) => c._id !== id));
      }
    } catch (err) {
      alert("Error deleting country");
    }
  };

  if (loading) return <div className="text-center py-20 font-bold">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Manage Countries</h1>
        <Link href="/admin/add-country" className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-200">
          <Plus size={20} /> Add Country
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {countries.map((country) => (
          <div key={country._id} className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 group">
            <div className="h-40 relative">
              <img src={country.image} alt={country.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h3 className="absolute bottom-4 left-6 text-white text-xl font-bold">{country.name}</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-sm text-slate-500 font-mono">
                <span>Slug: {country.slug}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* --- THIS LINK GOES TO THE DETAIL FORM --- */}
                <Link 
                  href={`/admin/countries/details/${country.slug}`}
                  className="flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 transition-all text-xs font-bold"
                >
                  <FileText size={16} /> Manage Details
                </Link>

                <Link 
                  href={`/admin/countries/edit/${country._id}`}
                  className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-3 rounded-xl hover:bg-blue-100 transition-all text-xs font-bold"
                >
                  <Edit size={16} /> Basic Edit
                </Link>
              </div>

              <button 
                onClick={() => handleDelete(country._id)}
                className="w-full flex items-center justify-center gap-2 text-red-500 py-3 rounded-xl hover:bg-red-50 transition-all text-xs font-bold border border-transparent hover:border-red-100"
              >
                <Trash2 size={16} /> Delete Country
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}