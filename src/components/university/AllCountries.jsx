"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { COUNTRIES_DATA } from "@/data/countries";

export default function AllCountries() {

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const totalPages = Math.ceil(COUNTRIES_DATA.length / itemsPerPage);

  const currentItems = COUNTRIES_DATA.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
          All Medical Destinations
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {currentItems.map((country) => (
            <Link
              key={country.id}
              href={`/universities/${country.slug}`}
              className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 hover:border-blue-300 transition group cursor-pointer"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden">
                <img
                  src={country.image}
                  alt={country.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-grow">
                <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition">
                  {country.name}
                </h4>

                <p className="text-xs text-slate-500 mb-1">
                  Tuition Fees: {country.fee}
                </p>

                <div className="flex items-center gap-1 text-[10px] font-bold text-blue-700 uppercase">
                  Learn More <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}

        </div>
      </div>

      {/* Pagination */}

      <div className="flex justify-center items-center gap-4">

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="p-3 rounded-full border hover:bg-blue-600 hover:text-white disabled:opacity-30"
        >
          <ChevronLeft size={20} />
        </button>

        <span className="font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="p-3 rounded-full border hover:bg-blue-600 hover:text-white disabled:opacity-30"
        >
          <ChevronRight size={20} />
        </button>

      </div>
    </>
  );
}