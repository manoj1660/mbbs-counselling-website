'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Users, Globe, GraduationCap, Trophy } from 'lucide-react';
export function StatCounter({ end, label, icon: Icon, duration = 2, suffix = "+" }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
  
  // SEO Fix: Initial state ko 'end' set kiya hai taaki SSR/Crawlers ko direct real number mile
  const [count, setCount] = useState(end);

  useEffect(() => {
    // Jab element view me aaye, tab animation start karne ke liye pehle 0 se reset karo
    if (!inView) return;

    setCount(0); // Viewport me aate hi visual counter 0 se animate start karega
    let start = 0;
    const totalFrames = duration * 60;
    const increment = end / totalFrames;

    const counter = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [inView, end, duration]);


  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition duration-300"
    >
      <div className="flex justify-center mb-4">
        <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
          <Icon size={28} />
        </div>
      </div>

      <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
        {count}{suffix}
      </h3>

      <p className="mt-2 text-gray-600 text-sm md:text-base">{label}</p>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Impact in Numbers
          </h2>
          <p className="text-gray-600 mt-3">
            Helping students achieve their global education dreams.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCounter
            end={15000}
            label="Students Counselled"
            icon={Users}
          />
          <StatCounter
            end={15}
            label="Countries Covered"
            icon={Globe}
          />
          <StatCounter
            end={75}
            label="Partner Universities"
            icon={GraduationCap}
          />
          <StatCounter
            end={95}
            label="Success Rate"
            icon={Trophy}
          />
        </div>

      </div>
    </section>
  );
}