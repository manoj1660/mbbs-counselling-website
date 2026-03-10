"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { AnimatedList } from "./ui/animated-list"

let notifications = [
  {
    name: "Russia",
    description: "Top NMC approved medical universities.",
    time: "15m ago",
    icon: "💸",
    color: "#00C9A7",
  },
  {
    name: "Kazakhstan",
    description: "English medium MBBS programs with modern medical facilities.",
    time: "10m ago",
    icon: "👤",
    color: "#FFB800",
  },
  {
    name: "Uzbekistan",
    description: "Globally recognized universities with quality education.",
    time: "5m ago",
    icon: "💬",
    color: "#FF3D71",
  },
  {
    name: "Kyrgyzstan",
    description: "Affordable MBBS education for international students.",
    time: "2m ago",
    icon: "🗞️",
    color: "#1E86FF",
  },
]

notifications = Array.from({ length: 10 }, () => notifications).flat()

const Notification = ({ name, description, icon, color, time }) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{ backgroundColor: color }}
        >
          <span className="text-lg">{icon}</span>
        </div>

        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center text-lg font-medium">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>

          <p className="text-sm text-gray-600">
            {description}
          </p>
        </div>
      </div>
    </figure>
  )
}

export function AnimatedListDemo({ className }) {
  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 py-16">

      {/* LEFT IMAGE */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src="/images/studentmbbs1.png"
          alt="MBBS Students"
          width={500}
          height={500}
          className="rounded-2xl shadow-xl"
        />
      </div>

      {/* RIGHT LIST */}
      <div
        className={cn(
          "relative flex h-[500px] w-full md:w-1/2 flex-col overflow-hidden p-2",
          className
        )}
      >
        <AnimatedList>
          {notifications.map((item, idx) => (
            <Notification {...item} key={idx} />
          ))}
        </AnimatedList>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
      </div>

    </div>
  )
}