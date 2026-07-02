import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Section: Main Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xl">
                M
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                MBBS GLOBAL
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Empowering Indian students with global medical education. We
              provide transparent, end-to-end guidance for MBBS admissions
              worldwide.
            </p>
            {/* Main Contacts */}
            <div className="pt-2 space-y-2 text-sm text-slate-400">
              <p className="flex items-center gap-2">📞 +91 9818187817</p>
              <p className="flex items-center gap-2">✉️ info@unefly.com</p>
            </div>
          </div>

          {/* Column 2: Destinations */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
              Destinations
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/universities/russia"
                  className="hover:text-blue-400 transition"
                >
                  MBBS in Russia
                </Link>
              </li>
              <li>
                <Link
                  href="/universities/georgia"
                  className="hover:text-blue-400 transition"
                >
                  MBBS in Georgia
                </Link>
              </li>
              <li>
                <Link
                  href="/universities/kazakhstan"
                  className="hover:text-blue-400 transition"
                >
                  MBBS in Kazakhstan
                </Link>
              </li>
              <li>
                <Link
                  href="/universities/uzbekistan"
                  className="hover:text-blue-400 transition"
                >
                  MBBS in Uzbekistan
                </Link>
              </li>
              <li>
                <Link
                  href="/universities/philippines"
                  className="hover:text-blue-400 transition"
                >
                  MBBS in Philippines
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
              Useful Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-blue-400 transition">
                  Admission Process
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition">
                  Eligibility Criteria
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition">
                  Visa Support
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-blue-400 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle Section: Our Offices (Ab yeh clean grid me dikhega) */}
        <div className="border-t border-slate-800/60 pt-10 mb-12">
          <h4 className="text-white font-bold mb-8 uppercase tracking-wider text-sm text-center md:text-left">
            Our Global & National Offices
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-sm leading-relaxed">
            {/* Delhi Rohini Block inside Footer.js */}
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                {/* Redirects directly to your new clean page */}
                <Link
                  href="/northdelhi"
                  className="text-blue-400 font-bold mb-2 block hover:underline"
                >
                  Delhi (North Delhi / Rohini) ↗
                </Link>
                <p className="text-slate-400 text-xs">
                  518, 5th Floor, SG Shopping Mall,
                  <br />
                  DC Chowk Market, Sector-9, Rohini,
                  <br />
                  New Delhi - 110085
                </p>
              </div>
              <p className="text-white font-medium mt-3 text-xs">
                Ph. +91 9217036038
              </p>
            </div>

            {/* Delhi NCR */}
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
              <p className="text-blue-400 font-bold mb-2">Delhi NCR (Noida)</p>
              <p className="text-slate-400 text-xs">
                8th Floor, NPX Building,
                <br />
                Sector 153, Noida,
                <br />
                Delhi NCR
              </p>
              <p className="text-white font-medium mt-2 text-xs">
                Ph. +91 9818187817
              </p>
            </div>

            {/* Kolkata */}
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
              <p className="text-blue-400 font-bold mb-2">Kolkata</p>
              <p className="text-slate-400 text-xs">
                12/B Lake Range, 1st Floor,
                <br />
                Near Mudiali, HDFC Bank,
                <br />
                Kolkata - 700026
              </p>
              <p className="text-white font-medium mt-2 text-xs">
                Ph. +91 9007228189
              </p>
            </div>

            {/* Hyderabad */}
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
              <p className="text-blue-400 font-bold mb-2">Hyderabad</p>
              <p className="text-slate-400 text-xs">
                311, Windsor Plaza,
                <br />
                Nallakunta,
                <br />
                Hyderabad - 500044, Telangana
              </p>
            </div>

            {/* Russia */}
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
              <p className="text-blue-400 font-bold mb-2">Russia</p>
              <p className="text-slate-400 text-xs">
                Academia Militsinskikova Street,
                <br />
                Moscow Dom13K1
              </p>
              <p className="text-white font-medium mt-2 text-xs">
                Ph. +7 9889041873
              </p>
            </div>

            {/* Bangladesh */}
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
              <p className="text-blue-400 font-bold mb-2">Bangladesh</p>
              <p className="text-slate-400 text-xs">
                68-69, Green Road,
                <br />
                Concept Tower,
                <br />
                Dhaka - 1205
              </p>
              <p className="text-white font-medium mt-2 text-xs">
                Ph. +8801717354759
              </p>
            </div>

            {/* Dubai */}
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
              <p className="text-blue-400 font-bold mb-2">Dubai</p>
              <p className="text-slate-400 text-xs">
                #401 Bait Aseel Building,
                <br />
                Al Nahda 2,
                <br />
                Dubai, UAE
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 MISSION Global LLC. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-white transition">
              Terms
            </Link>
            <Link href="/" className="hover:text-white transition">
              Sitemap
            </Link>
          </div>
          <p className="text-slate-500 italic">Developed by Saquib Dev</p>
        </div>
      </div>
    </footer>
  );
}
