import { ArrowRight, Star } from "lucide-react";
import { COUNTRIES_DATA } from "@/data/countries";
import Link from "next/link";
import Image from "next/image"; // 👈 1. Image component import karein

export default function TopCountries() {
  const topCountries = COUNTRIES_DATA.filter(country => country.isTop);

  return (
    <div className="mb-16">
      <div className="flex items-center gap-2 text-blue-600 font-bold uppercase tracking-wider text-sm mb-4">
        <Star size={16} fill="currentColor" />
        <span>Top Picks for 2026</span>
      </div>

      <h2 className="text-4xl font-black text-slate-900 mb-8">
        Most Preferred Destinations
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {topCountries.map((country) => (
          <div key={country.id} className="group relative overflow-hidden rounded-3xl aspect-[4/5] shadow-xl hover:-translate-y-2 transition">
            
            {/* 👈 2. Normal img ko Next.js Image se replace karein */}
            <Image
              src={country.image}
              alt={country.name}
              fill // aspect ratio container ke hisaab se fill karega
              className="object-cover group-hover:scale-110 transition duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />

            <div className="absolute bottom-0 p-8 w-full">
              <h3 className="text-3xl font-bold text-white mb-2">
                {country.name}
              </h3>

              <p className="text-blue-300 font-medium mb-4">
                {country.students} Indian Students
              </p>

              <Link href={`/universities/${country.name.toLowerCase()}`}>
                <div className="flex items-center gap-2 text-white bg-white/20 backdrop-blur-md px-6 py-3 rounded-xl border border-white/30 hover:bg-white hover:text-blue-600 transition-all font-bold cursor-pointer text-center justify-center">
                  Explore Details <ArrowRight size={18} />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}