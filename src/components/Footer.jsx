import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xl">M</div>
              <span className="text-2xl font-bold text-white tracking-tight">MBBS GLOBAL</span>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering Indian students with global medical education. We provide transparent, end-to-end guidance for MBBS admissions in top government universities worldwide.
            </p>
            <div className="flex gap-4">
              {/* Social Icons - You can add your actual links here */}
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">In</div>
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-400 transition-colors cursor-pointer">Tw</div>
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer">Ig</div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Destinations</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/universities/russia" className="hover:text-blue-400 transition">MBBS in Russia</Link></li>
              <li><Link href="/universities/georgia" className="hover:text-blue-400 transition">MBBS in Georgia</Link></li>
              <li><Link href="/universities/kazakhstan" className="hover:text-blue-400 transition">MBBS in Kazakhstan</Link></li>
              <li><Link href="/universities/uzbekistan" className="hover:text-blue-400 transition">MBBS in Uzbekistan</Link></li>
              <li><Link href="/universities/philippines" className="hover:text-blue-400 transition">MBBS in Philippines</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Useful Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-blue-400 transition">Admission Process</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Eligibility Criteria</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Student Visa Support</Link></li>
              <li><Link href="/apply" className="hover:text-blue-400 transition">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Common FAQs</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Get in Touch</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-blue-500">📍</span>
                <p>123 Education Hub, MG Road,<br />Delhi, India - 110001</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-blue-500">📞</span>
                <p>+91 9818187817</p>
                
              </div>
              <div className="flex items-center gap-3">
                <span className="text-blue-500">📞</span>
                <p>+7 9253490320</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-blue-500">✉️</span>
                <p>info@unefly.com</p>
              </div>
              <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <p className="text-xs text-slate-400 font-medium mb-2 uppercase">Office Hours</p>
                <p className="text-white text-xs">Mon - Sat: 10:00 AM - 7:00 PM</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 MISSION Global. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/" className="hover:text-white transition">Terms & Conditions</Link>
            <Link href="/" className="hover:text-white transition">Sitemap</Link>
          </div>
          <p className="text-slate-500 italic">Developed by Saquib Dev</p>
        </div>
      </div>
    </footer>
  );
}