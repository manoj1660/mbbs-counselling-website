"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X, Phone } from "lucide-react"

const universities = [
{ name: "Saratov State Medical University", country:"russia", slug: "saratov-state-medical-university" },
{ name: "South Kazakhstan Medical Academy", country:"kazakhstan", slug: "south-kazakhstan-medical-academy" },
{ name: "Central Asian International Medical University", country:"kazakhstan", slug: "central-asian-international-medical-university" },
{ name: "Medical University of Warsaw", country:"poland", slug: "medical-university-of-warsaw" },
{ name: "University of Bologna Medical School", country:"italy", slug: "university-of-bologna-medical-school" },
{ name: "Nanjing Medical University", country:"china", slug: "nanjing-medical-university" }
]

export default function ResponsiveNavbar(){

const [scrolled,setScrolled]=useState(false)
const [activeMenu,setActiveMenu]=useState(null)
const [isMobileMenuOpen,setIsMobileMenuOpen]=useState(false)
const [mobileSubMenu,setMobileSubMenu]=useState(null)

useEffect(()=>{
const handleScroll=()=>setScrolled(window.scrollY>50)
window.addEventListener("scroll",handleScroll)
return()=>window.removeEventListener("scroll",handleScroll)
},[])

const closeMenu = () => {
setIsMobileMenuOpen(false)
setMobileSubMenu(null)
}

return(

<nav className={`fixed w-full z-50 transition-all duration-300 border-b ${
scrolled || isMobileMenuOpen
? "bg-white text-gray-800 shadow-md border-gray-100"
: "bg-white text-gray-800 border-transparent"
}`}>
<div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 py-4">

{/* Logo */}
<Link href="/" onClick={closeMenu}>
<div className="text-xl md:text-2xl font-black italic tracking-tighter cursor-pointer">
MISSION<span className="text-yellow-500">GLOBAL</span>
</div>
</Link>

{/* Desktop Menu */}
<ul className="hidden md:flex gap-8 font-semibold items-center">

<li>
<Link href="/" className="hover:text-blue-600 transition">
Home
</Link>
</li>

<li
onMouseEnter={()=>setActiveMenu("universities")}
className="flex items-center gap-1 hover:text-blue-600 cursor-pointer transition py-2"
>
Universities <ChevronDown size={14}/>
</li>

<li>
<Link href="/admission" className="hover:text-blue-600 transition">
Admission
</Link>
</li>

</ul>

{/* Buttons */}
<div className="flex items-center gap-3">

<a
href="tel:+9100000000"
className="hidden sm:flex items-center gap-2 text-sm font-bold bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-100"
>
<Phone size={14}/> Contact
</a>

<button className="hidden lg:block bg-yellow-400 text-black font-bold px-6 py-2 rounded-full hover:bg-yellow-500 transition shadow-lg text-sm">
Free Consultation
</button>

<button
className="md:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-800"
onClick={()=>setIsMobileMenuOpen(!isMobileMenuOpen)}
>
{isMobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
</button>

</div>
</div>

{/* DESKTOP DROPDOWN */}
<div
onMouseLeave={()=>setActiveMenu(null)}
className={`hidden md:block absolute left-0 w-full bg-white shadow-2xl transition-all duration-300 overflow-hidden border-t ${
activeMenu ? "max-h-[500px] opacity-100 border-b" : "max-h-0 opacity-0 pointer-events-none"
}`}
>

<div className="max-w-7xl mx-auto grid grid-cols-12 p-10 gap-8">

<div className="col-span-3 border-r pr-6 italic font-bold text-blue-900/40">
Explore Universities
</div>

<div className="col-span-6 grid grid-cols-2 gap-4">

{activeMenu==="universities" &&
universities.map(item=>(
<Link
key={item.slug}
href={`/universities/${item.country.toLowerCase()}/${item.slug}`}
className="text-sm text-gray-600 hover:text-blue-600 transition font-medium"
>
• {item.name}
</Link>
))}

</div>

<div className="col-span-3 bg-blue-50 p-6 rounded-2xl">

<h5 className="text-xs font-bold text-blue-900 uppercase mb-3">
Guide 2026
</h5>

<p className="text-xs text-blue-700 leading-relaxed">
Download the full MBBS admission guide for Indian students studying abroad.
</p>

{activeMenu==="universities" && (
<Link
href="/universities"
className="text-blue-600 font-semibold text-sm mt-4 block"
>
Explore All Universities →
</Link>
)}

</div>

</div>
</div>

{/* MOBILE MENU */}

<div className={`md:hidden fixed inset-0 top-[68px] bg-white transition-transform duration-300 ${
isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
}`}>

<div className="p-6 h-full overflow-y-auto pb-20 space-y-6">

<Link href="/" onClick={closeMenu} className="block text-lg font-bold">
Home
</Link>

{/* Universities */}

<div>

<button
onClick={()=>setMobileSubMenu(mobileSubMenu==="universities"?null:"universities")}
className="w-full flex justify-between items-center font-bold text-lg"
>
Universities
<ChevronDown className={`transition ${mobileSubMenu==="universities"?"rotate-180":""}`}/>
</button>

{mobileSubMenu==="universities" && (
<div className="mt-3 space-y-3">

{universities.map(u=>(
<Link
key={u.slug}
href={`/universities/${u.country.toLowerCase()}/${u.slug}`}
onClick={closeMenu}
className="text-sm text-gray-600"
>
• {u.name}
</Link>
))}

<Link 
href={`/universities`} 
onClick={closeMenu}
className="text-blue-600 text-sm font-semibold"
>
Explore All Universities →
</Link>

</div>
)}

</div>

<Link href="/admission" onClick={closeMenu} className="block text-lg font-bold">
Admission
</Link>

<button className="w-full mt-10 bg-yellow-400 py-4 rounded-xl font-bold shadow-xl">
Apply for Free Counselling
</button>

</div>
</div>

</nav>

)
}