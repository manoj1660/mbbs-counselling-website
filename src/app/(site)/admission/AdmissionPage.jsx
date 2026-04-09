// --- 2. MAIN COMPONENT ---
"use client";
import { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle, School, FileText, Send, UserCheck, Plane, MapPin, 
  User, Mail, Phone, Globe, Building2, MessageSquare, ArrowRight, Loader2 
} from 'lucide-react';

const AdmissionStep = ({ icon: Icon, title, description, stepNumber }) => (
  <div className="flex gap-6 items-start relative pb-12 last:pb-0">
    {stepNumber < 6 && <div className="absolute left-6 top-10 w-0.5 h-full bg-blue-100" />}
    <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center border-4 border-white shadow-lg">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div className="flex-grow">
      <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-1">
        Step {stepNumber}
      </span>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  </div>
);

const FAQItem = ({ question, answer }) => (
  <details className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-4 cursor-pointer">
    <summary className="flex items-center justify-between font-semibold text-gray-900 marker:content-['']">
      {question}
      <span className="transition group-open:rotate-180">
        <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
      </span>
    </summary>
    <p className="text-gray-700 mt-4 leading-relaxed pl-2 border-l-2 border-blue-200">
      {answer}
    </p>
  </details>
);

const AdmissionPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Submit Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- FORCED STYLE FOR VISIBILITY (SEO & UX) ---
  const inputStyle = "w-full pl-12 pr-4 py-4 bg-white text-[#0f172a] border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400";

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div className="max-w-md w-full bg-white p-10 rounded-[3rem] shadow-2xl text-center border border-slate-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-500" size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Application Received!</h2>
          <p className="text-slate-500 mb-8">Our senior counsellor will contact you within 24 hours to discuss your MBBS journey.</p>
          <button 
            onClick={() => window.location.href = "/"}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 text-center">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700 border border-blue-100 mb-4">
            🎓 2026-27 Intake - Admissions Open
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-950 leading-tight mb-6">
            Direct Admission in Top NMC & WHO Approved <span className="text-blue-600">Medical Universities Abroad</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-10 leading-relaxed">
            Your journey to becoming a globally recognized doctor starts here. We offer end-to-end transparent counselling, simplified documentation, and complete support for Indian students aspiring for MBBS abroad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply">
              <button className="bg-blue-600 text-white font-semibold px-10 py-4 rounded-xl shadow-lg hover:bg-blue-700 transition">
                Apply Now
              </button>
            </Link>
            <button className="bg-white text-blue-700 font-semibold px-10 py-4 rounded-xl shadow border border-blue-100 hover:bg-blue-50 transition">
              Download Brochure
            </button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-medium text-gray-500 mb-8 uppercase tracking-widest">Degrees Recognized By</p>
          <div className="flex flex-wrap justify-center gap-12 items-center opacity-60">
            <span className="text-2xl font-bold text-gray-700">NMC INDIA</span>
            <span className="text-2xl font-bold text-gray-700">WHO</span>
            <span className="text-2xl font-bold text-gray-700">FAIMER</span>
            <span className="text-2xl font-bold text-gray-700">ECFMG</span>
            <span className="text-2xl font-bold text-gray-700">UNESCO</span>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-950 mb-4">Why Book Your Seat with Us?</h2>
            <p className="text-lg text-gray-700 leading-relaxed">We are not just consultants; we are your mentors on this long journey. We have helped 1500+ students secure seats in top government medical universities.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: '100% Transparency', desc: 'Direct University Fee payment. No hidden charges.' },
              { title: 'NMC Approved Universities', desc: 'Degrees valid for the NEXT/FMGE exam in India.' },
              { title: 'Complete Visa Support', desc: 'From documentation to final visa interview preparation.' },
              { title: 'Post-Departure Assistance', desc: 'Our team stays with you till you settle in your university.' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <CheckCircle className="w-10 h-10 text-green-500 mb-6" />
                <h3 className="text-xl font-semibold text-gray-950 mb-3">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid lg:grid-cols-[1fr,400px] gap-12">
        
        {/* Left Column: Detailed Content */}
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
          <section className="mb-20">
            <h2 className="text-3xl font-extrabold text-gray-950 mb-8 border-b pb-4 border-gray-100">Step-by-Step Admission Process</h2>
            <div className="mt-12">
              <AdmissionStep icon={School} stepNumber={1} title="University & Country Selection" description="Understand your budget, academic needs, and future goals to select the best medical university in countries like Russia, Georgia, Kazakhstan, or Uzbekistan." />
              <AdmissionStep icon={FileText} stepNumber={2} title="Documentation Submission" description="Upload or submit your 10th and 12th marksheets, NEET qualification score, and passport copies for the initial university eligibility check." />
              <AdmissionStep icon={Send} stepNumber={3} title="Issuance of Admission Letter" description="Upon university approval, you will receive an official Admission Letter and Invitation within 7-10 working days." />
              <AdmissionStep icon={UserCheck} stepNumber={4} title="Student Visa Processing" description="We handle the complex task of document authentication (Apostille), translation, and preparing your student visa application." />
              <AdmissionStep icon={Plane} stepNumber={5} title="Pre-Departure Guidance" description="A complete briefing on flight bookings, essential packing, currency exchange, and medical insurance before you travel." />
              <AdmissionStep icon={MapPin} stepNumber={6} title="Post-Departure Support" description="Our dedicated representative will receive you at the airport, assist in hostel allotment, university registration, and settling in." />
            </div>
          </section>

          <section className="mb-20">
            <h2 className="text-3xl font-extrabold text-gray-950 mb-8 border-b pb-4 border-gray-100">Eligibility Criteria (2026)</h2>
            <div className="prose prose-lg text-gray-700 max-w-none">
              <ul className="space-y-4">
                <li><strong>Age Limit:</strong> Must be 17 years old by 31st December of the admission year.</li>
                <li><strong>Academic Performance:</strong> A minimum of 50% aggregate marks in PCB for General, and 40% for Reserved candidates.</li>
                <li><strong>NEET-UG:</strong> Must have qualified NEET within the last 3 years.</li>
                <li><strong>Passport:</strong> Must have a valid passport (minimum 18 months validity).</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-extrabold text-gray-950 mb-8 border-b pb-4 border-gray-100">Frequently Asked Questions</h2>
            <div className="mt-10">
              <FAQItem question="Is an MBBS degree from abroad valid in India?" answer="Yes, provided you complete your MBBS from an NMC-approved university and qualify for the NEXT exam after returning." />
              <FAQItem question="What is the medium of instruction?" answer="Most NMC-approved universities abroad offer the entire MBBS course in English medium." />
              <FAQItem question="Do I need to qualify NEET?" answer="Yes, qualifying NEET is mandatory for all Indian students aspiring to study MBBS abroad." />
              <FAQItem question="What is the estimated budget?" answer="The complete 6-year course including hostel generally ranges from INR 15 Lakhs to 35 Lakhs." />
            </div>
          </section>
        </div>

        {/* Right Column: Lead Form (Sticky) */}
        <div id="apply-form" className="lg:sticky lg:top-8 h-fit">
          <div className="bg-white p-8 rounded-3xl shadow-xl border-t-4 border-blue-600">
            <h3 className="text-2xl font-bold text-gray-950 mb-2">Book Your Free Consultation</h3>
            <p className="text-gray-600 mb-8 text-sm">Limited seats available for the 2026 Intake. Our expert will call you back within 24 hours.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" required name="fullName" placeholder="Full Name *" className={inputStyle} />
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="email" required name="email" placeholder="Email Address *" className={inputStyle} />
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="tel" required name="phone" placeholder="Phone Number *" className={inputStyle} />
              </div>

              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select name="country" className={`${inputStyle} appearance-none`}>
                  <option value="">Preferred Country (Optional)</option>
                  <option value="russia">Russia</option>
                  <option value="kazakhstan">Kazakhstan</option>
                  <option value="uzbekistan">Uzbekistan</option>
                  <option value="georgia">Georgia</option>
                </select>
              </div>

              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" name="university" placeholder="Preferred University" className={inputStyle} />
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-4 top-6 text-slate-400" size={18} />
                <textarea name="message" placeholder="Questions (Optional)" className={`${inputStyle} h-28 pt-4`}></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Get Free Consultation"} 
                {!isSubmitting && <ArrowRight size={20} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPage;