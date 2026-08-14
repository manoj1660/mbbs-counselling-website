import Link from "next/link";

export default function Footer() {
  const destinations = [
    { name: "MBBS in Russia", href: "/universities/russia" },
    { name: "MBBS in Georgia", href: "/universities/georgia" },
    { name: "MBBS in Kazakhstan", href: "/universities/kazakhstan" },
    { name: "MBBS in Uzbekistan", href: "/universities/uzbekistan" },
    { name: "MBBS in Philippines", href: "/universities/philippines" },
    { name: "MBBS in Kyrgyzstan", href: "/universities/kyrgyzstan" },
    { name: "MBBS in Italy", href: "/universities/italy" },
    { name: "MBBS in Vietnam", href: "/universities/vietnam" },
    { name: "MBBS in Nepal", href: "/universities/nepal" },
    { name: "MBBS in Poland", href: "/universities/poland" },
    { name: "MBBS in China", href: "/universities/china" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Section: Main Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Column 1: Brand Info */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xl">
                M
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                MBBS GLOBAL
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-slate-400">
              Empowering Indian students with global medical education. We
              provide transparent, end-to-end guidance for MBBS admissions
              worldwide.
            </p>
            {/* Main Contacts */}
            <div className="pt-2 space-y-2 text-sm text-slate-400">
              <p className="flex items-center gap-2 hover:text-white transition-colors">
                📞 <a href="tel:+919818187817">+91 9818187817</a>
              </p>
              <p className="flex items-center gap-2 hover:text-white transition-colors">
                ✉️ <a href="mailto:info@unefly.com">info@unefly.com</a>
              </p>
            </div>
          </div>

          {/* Column 2: Destinations (2-Column Grid for All 11 Countries) */}
          <div className="md:col-span-5">
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
              Top Destinations
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-slate-400">
              {destinations.map((dest) => (
                <li key={dest.href}>
                  <Link
                    href={dest.href}
                    className="hover:text-blue-400 transition-colors block py-0.5"
                  >
                    {dest.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
              Useful Links
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link
                  href="/admission"
                  className="hover:text-blue-400 transition-colors"
                >
                  Admission Process
                </Link>
              </li>
              <li>
                <Link
                  href="/admission"
                  className="hover:text-blue-400 transition-colors"
                >
                  Eligibility Criteria
                </Link>
              </li>
              <li>
                <Link
                  href="/admission"
                  className="hover:text-blue-400 transition-colors"
                >
                  Visa Support
                </Link>
              </li>
              <li>
                <Link
                  href="/apply"
                  className="hover:text-blue-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/admission"
                  className="hover:text-blue-400 transition-colors"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle Section: Global & National Offices */}
        <div className="border-t border-slate-800/60 pt-10 mb-12">
          <h4 className="text-white font-bold mb-8 uppercase tracking-wider text-sm text-center md:text-left">
            Our Global & National Offices
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-sm leading-relaxed">
            {/* Delhi Rohini Block */}
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between hover:border-slate-700 transition">
              <div>
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
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800/80 hover:border-slate-700 transition">
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
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800/80 hover:border-slate-700 transition">
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
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800/80 hover:border-slate-700 transition">
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
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800/80 hover:border-slate-700 transition">
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
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800/80 hover:border-slate-700 transition">
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
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800/80 hover:border-slate-700 transition">
              <p className="text-blue-400 font-bold mb-2">Dubai</p>
              <p className="text-slate-400 text-xs">
                #401 Bait Aseel Building,
                <br />
                Al Nahda 2,
                <br />
                Dubai, UAE
              </p>
            </div>

            {/* Latur */}
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800/80 hover:border-slate-700 transition">
              <p className="text-blue-400 font-bold mb-2">Latur</p>
              <p className="text-slate-400 text-xs">
                Gomare Complex,
                <br />
                Old MIDC Road,
                <br />
                Shri Nagar, Latur - 413512
              </p>
              <p className="text-white font-medium mt-2 text-xs">
                Ph. +91 8468871305
              </p>
              <p className="text-white font-medium mt-2 text-xs">
                Ph. +7 9788439464
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© 2026 MBBS Global. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="hover:text-white transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/sitemap.xml"
              className="hover:text-white transition-colors"
            >
              Sitemap
            </Link>
          </div>
          <p className="text-slate-500 italic">Developed by Saquib Dev</p>
        </div>
      </div>
    </footer>
  );
}
