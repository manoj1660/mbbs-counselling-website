import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1 */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xl">M</div>
              <span className="text-2xl font-bold text-white tracking-tight">MBBS GLOBAL</span>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering Indian students with global medical education. We provide transparent, end-to-end guidance for MBBS admissions worldwide.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Destinations</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/universities/russia">MBBS in Russia</Link></li>
              <li><Link href="/universities/georgia">MBBS in Georgia</Link></li>
              <li><Link href="/universities/kazakhstan">MBBS in Kazakhstan</Link></li>
              <li><Link href="/universities/uzbekistan">MBBS in Uzbekistan</Link></li>
              <li><Link href="/universities/philippines">MBBS in Philippines</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Useful Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#">Admission Process</Link></li>
              <li><Link href="#">Eligibility Criteria</Link></li>
              <li><Link href="#">Visa Support</Link></li>
              <li><Link href="/apply">Contact Us</Link></li>
              <li><Link href="#">FAQs</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
<div>
  <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
    Our Offices
  </h4>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs leading-relaxed">

    <div>
      <p className="text-blue-400 font-semibold">Russia</p>
      <p>
        Academia Militsinskikova Street,<br />
        Moscow Dom13K1
      </p>
      <p className="text-slate-400 mt-1">+7 9889041873</p>
    </div>

    <div>
      <p className="text-blue-400 font-semibold">Kolkata</p>
      <p>
        12/B Lake Range 1st Floor,<br />
        Near Mudiali, HDFC Bank,<br />
        Kolkata - 700026
      </p>
      <p className="text-slate-400 mt-1">+91 9007228189</p>
    </div>

    <div>
      <p className="text-blue-400 font-semibold">Delhi NCR</p>
      <p>
        SF 1 Second Floor, Vishnu Place,<br />
        Aironda Chowk, Mathura Road,<br />
        Faridabad, Delhi NCR
      </p>
      <p className="text-slate-400 mt-1">+91 9818187817</p>
    </div>

    <div>
      <p className="text-blue-400 font-semibold">Hyderabad</p>
      <p>
        311, Windsor Plaza,<br />
        Nallakunta,<br />
        Hyderabad - 500044,<br />
        Telangana, India
      </p>
    </div>

    <div>
      <p className="text-blue-400 font-semibold">Bangladesh</p>
      <p>
        68-69, Green Road,<br />
        Concept Tower,<br />
        Dhaka - 1205
      </p>
      <p className="text-slate-400 mt-1">
        +8801717354759 / +880171273574
      </p>
    </div>

    <div>
      <p className="text-blue-400 font-semibold">Dubai</p>
      <p>
        #401 Bait Aseel Building,<br />
        Al Nadha 2,<br />
        Dubai, UAE
      </p>
    </div>

  </div>

  {/* Contact */}
  <div className="mt-6 space-y-2 text-sm">
    <p>📞 +91 9818187817</p>
    <p>✉️ info@unefly.com</p>
  </div>
</div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 MISSION Global LLC . All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Terms</Link>
            <Link href="/">Sitemap</Link>
          </div>
          <p className="text-slate-500 italic">Developed by Saquib Dev</p>
        </div>

      </div>
    </footer>
  );
}