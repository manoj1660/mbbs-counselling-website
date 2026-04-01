import connectDB from "@/lib/db";
import PageSetting from "@/models/PageSetting";
import {
  Users,
  Award,
  Globe2,
  ShieldCheck,
  PhoneCall,
} from "lucide-react";

// SEO Metadata
export async function generateMetadata() {
  await connectDB();
  const data = await PageSetting.findOne({ pageName: "about" }).lean();

  return {
    title: data?.seo?.metaTitle || "About Us - MBBS Abroad Consultancy",
    description:
      data?.seo?.metaDescription ||
      "We provide transparent guidance for MBBS abroad with full support from admission to graduation.",
  };
}

const stats = [
  { label: "Students Assisted", value: "5000+", icon: <Users /> },
  { label: "Universities", value: "150+", icon: <Globe2 /> },
  { label: "Visa Success", value: "100%", icon: <ShieldCheck /> },
  { label: "Experience", value: "12+ Years", icon: <Award /> },
];

export default function AboutPage() {
  return (
    <div className="bg-white text-slate-800">

      {/* HERO */}
      <section className="bg-slate-50 py-24 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-black mb-6">
          Your Trusted Partner for
          <span className="block text-blue-600">
            MBBS Abroad Journey
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg text-slate-600">
          We help Indian students achieve their dream of becoming doctors by
          providing honest, transparent, and complete guidance for studying
          MBBS abroad. From university selection to visa assistance, we handle
          everything.
        </p>
      </section>

      {/* STATS */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((item, i) => (
            <div
              key={i}
              className="bg-slate-50 p-6 rounded-2xl text-center shadow-sm"
            >
              <div className="flex justify-center text-blue-600 mb-3">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold">{item.value}</h3>
              <p className="text-sm text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <img
            src="/images/medicalstudent.jpg"
            alt="Medical Students"
            className="rounded-3xl shadow-lg"
          />

          <div>
            <h2 className="text-3xl font-bold mb-6">
              Why Choose Us?
            </h2>

            <p className="text-slate-600 mb-6 leading-relaxed">
              Many students face confusion, misinformation, and hidden charges
              while planning to study MBBS abroad. Our mission is to simplify
              this journey by offering 100% genuine and transparent guidance.
              We ensure that every student gets admission to recognized and
              reputed universities without any middle agents.
            </p>

            <ul className="space-y-3">
              {[
                "Direct University Admission",
                "No Hidden Charges",
                "WHO & NMC Approved Universities",
                "Complete Visa & Documentation Support",
                "Support till Graduation",
              ].map((item, i) => (
                <li key={i} className="flex gap-2 items-center">
                  <ShieldCheck className="text-green-600" size={18} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-slate-600">
              To provide every medical aspirant with accurate information,
              ethical guidance, and complete support so they can confidently
              pursue MBBS abroad without stress or confusion.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-slate-600">
              To become India’s most trusted MBBS abroad consultancy by
              maintaining transparency, delivering results, and building long
              term relationships with students.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-blue-600 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Start Your MBBS Journey Today
        </h2>

        <p className="mb-8 text-blue-100">
          Talk to our experts and get personalized guidance for free.
        </p>

        <button className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold flex items-center gap-2 mx-auto">
          <PhoneCall size={18} /> Book Free Consultation
        </button>
      </section>

    </div>
  );
}