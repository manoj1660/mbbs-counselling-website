import { UNIVERSITY_DETAILS } from '@/data/universityDetails';

export default async function UniversityDetailPage({ params }) {
  
  const { university } = await params;
  const data = UNIVERSITY_DETAILS[university];

  if (!data) return <div className="p-20 text-center">Data coming soon...</div>;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <span className="bg-blue-400/30 px-3 py-1 rounded-full text-sm font-medium">Russia • Government University</span>
          <h1 className="text-5xl font-bold mt-4">{data.name}</h1>
          <p className="mt-4 text-xl text-blue-100 max-w-2xl">{data.location} | Estd. {data.established}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 -mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
        
        {/* LEFT COLUMN: MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Intro Box */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-l-4 border-blue-600 pl-4">About University</h2>
            <p className="text-slate-600 leading-relaxed text-lg">{data.intro}</p>
          </div>

          {/* Tuition Table */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Tuition Fee Structure (2026)</h2>
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-4 font-semibold text-slate-700">Year</th>
                    <th className="p-4 font-semibold text-slate-700">Tuition (USD)</th>
                    <th className="p-4 font-semibold text-slate-700">Tuition (INR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.tuitionFees.map((fee, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/30 transition">
                      <td className="p-4 text-slate-600 font-medium">{fee.year}</td>
                      <td className="p-4 text-blue-600 font-bold">{fee.tuitionfees}</td>
                      <td className="p-4 text-slate-500">{fee.tuitionINR}*</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-slate-400 italic">* INR values are approximate based on current exchange rates ($1 = ₹83).</p>
          </div>
        </div>

        {/* RIGHT COLUMN: SIDEBAR */}
        <div className="space-y-6">
          {/* Quick Highlights Bento */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 uppercase tracking-wider text-sm">Key Highlights</h3>
            <ul className="space-y-3">
              {data.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <span className="text-blue-600 mt-1">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Admission CTA Card */}
          <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-2">Ready to Apply?</h3>
            <p className="text-blue-100 mb-6 text-sm">Get free counseling and guaranteed admission for the 2026 intake.</p>
            <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-50 transition">
              Apply Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}