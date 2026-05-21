export default function WhoWeAre() {
  const stats = [
    { label: "Students Placed", value: "5000+", icon: "🎓" },
    { label: "Partner Universities", value: "750+", icon: "🏛️" },
    { label: "Years of Expertise", value: "15+", icon: "⭐" },
    { label: "Visa Success Rate", value: "100%", icon: "✈️" },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Part */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-blue-600"></span> Who We Are
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Bridging the gap between <span className="text-blue-600">Indian Dreams</span> and Global Medical Careers.
            </h3>
          </div>
          <p className="text-slate-500 max-w-sm text-lg leading-relaxed">
            We aren't just consultants; we are your academic guardians, ensuring every step of your international journey is safe and successful.
          </p>
        </div>

        {/* The Bento Grid Design */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Vision Card */}
          <div className="md:col-span-8 relative rounded-3xl p-10 text-white overflow-hidden group min-h-[450px] flex items-center">
  
  {/* The Video Layer */}
  <video 
    autoPlay 
    loop 
    muted 
    playsInline 
    className="absolute inset-0 w-full h-full object-cover z-0"
  >
    {/* Paste your internet URL here */}
    <source src="https://d2j2uxe7jasn0r.cloudfront.net/watermarks/video/HrrabAxWinloumzm/878-sehiifzjrevpie1iiejpsk5jq0ugtuvesunbtcbhrvruwsaymdi1iehisca0-q490c30xf5__8b28c876aadbb1c2a9761f90ffc41c26__P360.mp4" type="video/mp4" />
    
    {/* Fallback color if video is loading or fails */}
    <div className="absolute inset-0 bg-blue-900"></div>
  </video>

  {/* Dark Overlay - Keeps text readable */}
  <div className="absolute inset-0 bg-slate-900/60 z-10 transition-opacity group-hover:opacity-50"></div>

  {/* Content Layer */}
  <div className="relative z-20 space-y-4">
    <h4 className="text-3xl font-bold">Our Global Impact</h4>
    <p className="text-slate-200 text-lg max-w-md">
      Connecting India's brightest minds to the world's most advanced medical facilities.
    </p>
  </div>
</div>

          {/* Side Feature Card */}
          <div className="md:col-span-4 bg-blue-50 rounded-3xl p-8 border border-blue-100 flex flex-col justify-between">
            <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm text-2xl mb-6">
              🛡️
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Verified Direct Admissions</h4>
              <p className="text-slate-600 text-sm">
                No middlemen. No hidden fees. We work directly with university registrars to secure your seat.
              </p>
            </div>
          </div>

          {/* Stats Section - Mapping the values */}
          {stats.map((stat, index) => (
            <div key={index} className="md:col-span-3 bg-white border border-slate-100 p-8 rounded-3xl hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
              <div className="text-3xl mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-slate-500 text-sm font-medium uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}

          {/* Bottom Trust Banner */}
          <div className="md:col-span-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="text-white">
                <h4 className="text-2xl font-bold">Approved by NMC & WHO</h4>
                <p className="text-blue-100 opacity-80">We only represent universities that meet the highest international medical standards.</p>
             </div>
             <div className="flex -space-x-4">
                {/* Visual of "Certified" or "Trusted" icons */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-blue-600 bg-white/20 backdrop-blur-sm flex items-center justify-center text-[10px] font-bold text-white uppercase">
                    ISO
                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}