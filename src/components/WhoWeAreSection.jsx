"use client"

import { motion } from "framer-motion"
import { AnimatedList } from "@/components/ui/animated-list"
import { cn } from "@/lib/utils"

let notifications = [
  {
    name: "Russia",
    description: "Top NMC approved medical universities.",
    time: "6 Year Program",
    icon: "🇷🇺",
    color: "#2563EB",
  },
  {
    name: "Kazakhstan",
    description: "English medium MBBS programs with modern facilities.",
    time: "6 Year Program",
    icon: "🇰🇿",
    color: "#00C9A7",
  },
  {
    name: "Uzbekistan",
    description: "Globally recognized universities with quality education.",
    time: "6 Year Program",
    icon: "🇺🇿",
    color: "#FFB800",
  },
  {
    name: "Kyrgyzstan",
    description: "Affordable MBBS education for international students.",
    time: "6 Year Program",
    icon: "🇰🇬",
    color: "#FF3D71",
  },
]

notifications = Array.from({ length: 5 }, () => notifications).flat()

const Notification = ({ name, description, icon, color, time }) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white shadow-md"
      )}
    >
      <div className="flex flex-row items-center gap-3">

        <div
          className="flex size-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: color }}
        >
          <span className="text-lg">{icon}</span>
        </div>

        <div className="flex flex-col overflow-hidden">
          <figcaption className="text-sm font-semibold text-gray-900">
            {name}
          </figcaption>

          <p className="text-xs text-gray-600">
            {description}
          </p>

          <span className="text-xs text-gray-400 mt-1">
            {time}
          </span>
        </div>

      </div>
    </figure>
  )
}

export default function WhoWeAreSection() {

  return (

<section className="py-24 bg-gradient-to-b from-blue-50 to-white">

<div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

{/* LEFT TEXT */}

<motion.div
initial={{opacity:0,x:-40}}
whileInView={{opacity:1,x:0}}
viewport={{once:true}}
transition={{duration:0.6}}
>

<h2 className="text-4xl md:text-5xl font-bold text-gray-900">

Who We Are

</h2>

<p className="mt-6 text-gray-600 leading-relaxed">

<strong>GlobalMBBS</strong> is a trusted study abroad consultancy helping
students achieve their dream of becoming doctors by studying MBBS
in top international medical universities.

</p>

<p className="mt-4 text-gray-600 leading-relaxed">

We guide students through every step — from career counselling,
university selection and admission to visa support and travel
assistance.

</p>

<p className="mt-4 text-gray-600 leading-relaxed">

Our partner universities across Russia, Kazakhstan, Uzbekistan
and Kyrgyzstan offer high quality medical education at affordable
fees without donation.

</p>

</motion.div>


{/* RIGHT SIDE ANIMATED LIST */}

<motion.div
initial={{opacity:0,x:40}}
whileInView={{opacity:1,x:0}}
viewport={{once:true}}
transition={{duration:0.6}}
className="relative flex h-[400px] w-full flex-col overflow-hidden p-2"
>

<AnimatedList>
  {notifications.map((item, idx) => (
    <Notification {...item} key={idx} />
  ))}
</AnimatedList>

</motion.div>

</div>

</section>

  )

}