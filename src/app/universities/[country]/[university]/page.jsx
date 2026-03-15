import { UNIVERSITY_DETAILS } from '@/data/universityDetails';

export default async function UniversityDetailPage({ params }) {
  const { university } = await params;
  const data = UNIVERSITY_DETAILS[university];

  if (!data) return <div className="p-20 text-center">Data coming soon...</div>;

  const commonFAQs = [
    {
      q: "Is the degree valid in India?",
      a: "Yes, the degree is recognized by the NMC (National Medical Commission) and WHO, allowing you to appear for the NEXT/FMGE exam in India."
    },
    {
      q: "Is NEET mandatory for admission?",
      a: "Yes, qualifying NEET is mandatory for Indian students to study MBBS abroad if they wish to practice in India later."
    },
    {
      q: "What is the medium of instruction?",
      a: "The entire 6-year course is taught in English for international students."
    },
    {
      q: "Can I get a education loan?",
      a: "Yes, most Indian banks provide education loans for NMC-recognized government universities abroad."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* HERO SECTION */}
      <section
        className={`py-28 px-6 ${
          data.image ? "" : "bg-blue-900"
        }`}
        style={{
          backgroundImage: data.image ? `url(${data.image})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="max-w-6xl mx-auto">

          {/* Glass card for text */}
          <div className="bg-black/40 backdrop-blur-md inline-block p-8 rounded-2xl">
            <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-medium text-white">
              {data.location.split(",")[1] || "Russia"} • Government University
            </span>

            <h1 className="text-5xl md:text-6xl font-bold mt-6 text-white leading-tight">
              {data.name}
            </h1>

            <p className="mt-4 text-xl text-gray-200 max-w-2xl">
              Estd. {data.established} • Top-ranked Research Institution
            </p>
          </div>
        </div>
      </section>

      {/* MAIN SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-8">

          {/* ABOUT */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-l-4 border-blue-600 pl-4">
              About University
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              {data.intro}
            </p>
          </div>

          {/* ADMISSION PROCESS */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Admission Process
            </h2>

            <div className="space-y-4">
              {data.admissionSteps?.map((step, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <p className="text-slate-600">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FEES */}
          <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Fee Structure (2026)
            </h2>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="p-4 font-semibold">Year</th>
                    <th className="p-4 font-semibold">Tuition (RUB)</th>
                    <th className="p-4 font-semibold">Tuition (INR)</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {data.tuitionFees.map((fee, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-4 font-medium">{fee.year}</td>
                      <td className="p-4 text-blue-600 font-bold">
                        {fee.tuitionfees}
                      </td>
                      <td className="p-4 text-slate-500">
                        {fee.tuitionINR}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">

          {/* HIGHLIGHTS */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Why Choose This?
            </h3>

            <ul className="space-y-3">
              {data.highlights.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-slate-600"
                >
                  <span className="text-blue-600 font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* APPLY CARD */}
          <div className="bg-blue-600 text-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Apply for 2026</h3>
            <p className="text-blue-100 mb-6 text-sm">
              Secure your seat at {data.name}.
            </p>

            <button className="w-full bg-white text-blue-600 font-bold py-4 rounded-xl hover:bg-gray-100 transition">
              Get Free Counseling
            </button>
          </div>
        </div>
      </div>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">
          Common Questions
        </h2>

        <div className="space-y-4">
          {commonFAQs.map((faq, i) => (
            <details
              key={i}
              className="group bg-white rounded-xl border border-slate-200 shadow-sm p-4"
            >
              <summary className="flex justify-between font-bold text-slate-700 cursor-pointer">
                {faq.q}
                <span className="group-open:rotate-180 transition">▼</span>
              </summary>

              <p className="mt-4 text-slate-600 border-t pt-4">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}