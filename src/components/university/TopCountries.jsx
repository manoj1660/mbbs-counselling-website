import { ArrowRight, Star } from "lucide-react";
import { COUNTRIES_DATA } from "@/data/countries";
import Link from "next/link";

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
            
            <img
              src={country.image}
              alt={country.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500"
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
                <button className="flex items-center gap-2 text-white bg-white/20 backdrop-blur-md px-6 py-3 rounded-xl border border-white/30 hover:bg-white hover:text-blue-600 transition-all font-bold">
                  Explore Details <ArrowRight size={18} />
                </button>
              </Link>

            </div>

          </div>

        ))}
      </div>
    </div>
  );
}