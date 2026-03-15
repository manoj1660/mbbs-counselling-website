export const BudgetRoadmap = () => (
  <section className="py-32 bg-white">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6">
      
      <div className="md:col-span-2 md:row-span-2 bg-slate-50 rounded-[3.5rem] p-14 flex flex-col justify-end min-h-[500px] relative overflow-hidden group border border-slate-100">
        <div className="absolute top-12 right-12 text-[10rem] opacity-5 group-hover:opacity-10 group-hover:-rotate-12 transition-all duration-700">🥘</div>
        <h4 className="text-4xl font-black text-slate-900 mb-6 leading-tight">Authentic <br/> Indian Food.</h4>
        <p className="text-slate-500 text-lg leading-relaxed max-w-sm">
          Stay connected to home with dedicated Indian mess facilities. From North Indian rotis to South Indian delicacies, we ensure you never miss a home-cooked meal.
        </p>
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col justify-between hover:bg-slate-800 transition-colors">
        <div className="text-4xl">❄️</div>
        <div>
          <h4 className="font-bold text-xl mb-2">Climate Comfort</h4>
          <p className="text-slate-400 text-sm">Fully centrally heated campuses and hostels to keep you cozy during European winters.</p>
        </div>
      </div>

      <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white flex flex-col justify-between shadow-xl shadow-blue-200">
        <div className="text-4xl">👨‍⚕️</div>
        <div>
          <h4 className="font-bold text-xl mb-2">Clinical Hub</h4>
          <p className="text-blue-100 text-sm">Direct access to Govt. Hospitals with high patient inflow for real-world clinical experience.</p>
        </div>
      </div>

      <div className="md:col-span-2 bg-blue-50 rounded-[2.5rem] p-10 flex items-center gap-8 border border-blue-100 group">
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-4xl shadow-sm group-hover:rotate-12 transition-transform">✈️</div>
        <div>
          <h4 className="font-bold text-slate-900 text-xl mb-2">Seamless Travel</h4>
          <p className="text-slate-500 text-sm max-w-md">Regular flights from Delhi, Mumbai, and Bangalore. Complete assistance with airport pickup and drop-offs.</p>
        </div>
      </div>
    </div>
  </section>
);