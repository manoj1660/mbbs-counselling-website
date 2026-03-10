"use client"

import { motion } from "framer-motion"
import { GraduationCap, Globe, DollarSign, Hospital } from "lucide-react"

const benefits = [
  {
    icon: Globe,
    title: "Global Exposure",
    desc: "Study in internationally recognized universities and gain exposure to diverse cultures and medical systems."
  },
  {
    icon: DollarSign,
    title: "Affordable Education",
    desc: "MBBS abroad is much more affordable compared to private medical colleges in India."
  },
  {
    icon: GraduationCap,
    title: "NMC Approved Universities",
    desc: "Many universities abroad are approved by NMC and recognized globally."
  },
  {
    icon: Hospital,
    title: "Advanced Medical Training",
    desc: "Students get access to modern hospitals, labs and clinical exposure."
  }
]

export default function WhyStudyAbroad() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">

      <div className="max-w-6xl mx-auto px-6">

        {/* Section Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Benefits of Studying MBBS Abroad
          </h2>
          <p className="mt-4 text-gray-600">
            Discover why thousands of students choose international medical education.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {benefits.map((item, i) => {
            const Icon = item.icon

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl bg-white/70 backdrop-blur border shadow-lg hover:shadow-xl transition"
              >

                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 mb-4">
                  <Icon className="text-blue-600" size={24} />
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-gray-600 text-sm">
                  {item.desc}
                </p>

              </motion.div>
            )
          })}

        </div>

      </div>

    </section>
  )
}