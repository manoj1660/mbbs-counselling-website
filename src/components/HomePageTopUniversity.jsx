import React from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import connectDB from "@/lib/db"; 
import University from "@/models/University";

// Force fresh data every time
export const dynamic = "force-dynamic";

export default async function HomePageTopUniversity() {
  // 1. Database se seedha Featured data fetch karein
  await connectDB();
  
  // Hum sirf wahi universities layenge jiska isFeatured true hai
  const unis = await University.find({ isFeatured: true })
    .limit(3)
    .sort({ createdAt: -1 }) // Nayi wali pehle dikhegi
    .lean();

  // Debugging: Check in VS Code Terminal
  console.log("Featured Unis from DB:", unis.length);

  if (!unis || unis.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-slate-900 mb-2">
            Top Universities
          </h2>
          <p className="text-slate-500 font-medium">
            Handpicked premium institutions for your bright future.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {unis.map((uni) => (
            <Link
              href={`/universities/${uni.country.toLowerCase()}/${uni.slug}`}
              key={uni._id.toString()}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-blue-300/30 transition-all duration-300"
            >
              <div className="h-60 overflow-hidden relative">
                <img
                  src={uni.image}
                  alt={uni.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-5 left-5">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-[10px] font-black text-blue-700 rounded-xl uppercase">
                    {uni.ranking || 'Top Rated'}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase mb-3">
                  <MapPin size={14} /> {uni.location}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-6 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                  {uni.name}
                </h4>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Annual Fee</p>
                    <p className="text-xl font-black text-slate-800">{uni.fee}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <ArrowRight size={24} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}