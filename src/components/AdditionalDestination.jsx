export function DetailedCountryList() {
  const data = [
    { name: "Uzbekistan", info: "Lowest living cost in 2026", link: "/uzbekistan" },
    { name: "Kyrgyzstan", info: "Popular for 5-year programs", link: "/kyrgyzstan" },
    { name: "Philippines", info: "English medium excellence", link: "/philippines" },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-slate-400 font-bold text-sm uppercase mb-10 tracking-widest">
          Additional Destinations
        </h2>
        <div className="space-y-8">
          {data.map((item) => (
            <div key={item.name} className="flex flex-col md:flex-row md:items-center justify-between border-b border-blue-50 pb-6 group">
              <LinkPreview 
                url={item.link} 
                className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors"
              >
                {item.name}
              </LinkPreview>
              <span className="text-slate-500 font-medium italic">
                {item.info}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}