"use client"

import Link from "next/link"

export default function UniversityCard({uni}){

return(

<Link href={`/universities/${uni.slug}`}>

<div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition hover:-translate-y-1">

<h3 className="text-xl font-bold">{uni.name}</h3>

<p className="text-sm text-gray-500 mt-2">
{uni.shortDesc}
</p>

<div className="mt-4 text-blue-600 font-semibold">
View Details →
</div>

</div>

</Link>

)
}