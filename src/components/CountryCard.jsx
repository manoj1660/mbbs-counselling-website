"use client"

import Link from "next/link"

export default function CountryCard({country}){

return(

<Link href={`/countries/${country.slug}`}>

<div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-6 hover:-translate-y-1">

<h2 className="text-2xl font-bold mb-2">{country.name}</h2>

<p className="text-gray-600 text-sm mb-3">
{country.description}
</p>

<div className="text-sm text-blue-600 font-semibold">
Explore Universities →
</div>

</div>

</Link>

)
}