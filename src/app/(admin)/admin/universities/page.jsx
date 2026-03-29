"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Edit3,
  Trash2,
  Search,
  MapPin,
  Filter,
  Globe,
} from "lucide-react";

export default function AdminUniversities() {
  const [unis, setUnis] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/universities")
      .then((res) => res.json())
      .then((data) => {
        setUnis(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this university?")) return;
    const res = await fetch(`/api/admin/universities/${id}`, {
      method: "DELETE",
    });
    if (res.ok) setUnis(unis.filter((u) => u._id !== id));
  };

  // Get unique countries for filter dropdown
  const countries = ["all", ...new Set(unis.map((u) => u.country))];

  const filteredUnis = unis.filter((u) => {
    const matchesSearch = u.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCountry =
      selectedCountry === "all" || u.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  if (loading)
    return (
      <div className="p-20 text-center font-bold text-slate-400 animate-pulse">
        Loading University Database...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10 min-h-screen bg-[#F8FAFC]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            University Hub
          </h1>
          <p className="text-slate-500 font-medium mt-1 text-lg">
            Manage {unis.length} institutions globally
          </p>
        </div>
        <Link
          href="/admin/universities/add"
          className="group flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
        >
          <Plus
            size={20}
            className="group-hover:rotate-90 transition-transform"
          />{" "}
          Add New University
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none font-medium transition-all shadow-sm"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative min-w-[200px]">
          <Filter
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none font-bold text-slate-700 capitalize appearance-none shadow-sm cursor-pointer"
          >
            {countries.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All Countries" : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredUnis.map((uni) => (
          <div
            key={uni._id}
            className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="h-48 relative overflow-hidden">
              <img
                src={uni.image}
                alt={uni.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-blue-600 uppercase tracking-widest shadow-sm">
                {uni.ranking || "University"}
              </div>
            </div>

            <div className="p-8">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-tighter mb-2">
                <Globe size={14} /> {uni.country}
              </div>
              <h3 className="text-xl font-bold text-slate-900 leading-tight mb-4 h-14 line-clamp-2">
                {uni.name}
              </h3>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={14} /> {uni.location}
                </div>
                <div className="text-lg font-black text-slate-800 tracking-tight">
                  {uni.fee}{" "}
                  <span className="text-[10px] text-slate-400 font-medium">
                    / Yearly
                  </span>
                </div>
              </div>

              {/* Buttons Section */}
              <div className="flex flex-col gap-2 pt-6 border-t border-slate-50">
                <div className="flex gap-2 w-full">
                  {/* 1. Basic Edit Button */}
                  <Link
                    href={`/admin/universities/edit/${uni._id}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-50 text-slate-700 py-3 rounded-xl font-bold hover:bg-blue-50 hover:text-blue-600 transition-all text-sm"
                  >
                    <Edit3 size={16} /> Edit
                  </Link>

                  {/* 2. Delete Button */}
                  <button
                    onClick={() => handleDelete(uni._id)}
                    className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                {/* 3. NEW: Deep Details Button (Slug based) */}
                <Link
                  href={`/admin/universities/details/${uni.slug}`}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-all text-sm shadow-lg shadow-slate-200"
                >
                  <Globe size={16} /> Manage Deep Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
