"use client"

import { useState, useEffect } from "react"

export default function Navbar(){

const [scrolled,setScrolled] = useState(false)

useEffect(()=>{

const handleScroll = ()=>{
setScrolled(window.scrollY > 50)
}

window.addEventListener("scroll",handleScroll)

return ()=> window.removeEventListener("scroll",handleScroll)

},[])

return(

<nav className={`fixed w-full z-50 transition-all duration-300
${scrolled ? "bg-white/80 backdrop-blur shadow-md" : "bg-transparent"}`}>

<div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

<div className="text-2xl font-bold text-[var(--primary)]">

MBBS Global

</div>

<ul className="hidden md:flex gap-8 font-medium">

<li className="hover:text-[var(--primary)] cursor-pointer">Home</li>
<li className="hover:text-[var(--primary)] cursor-pointer">Countries</li>
<li className="hover:text-[var(--primary)] cursor-pointer">Universities</li>
<li className="hover:text-[var(--primary)] cursor-pointer">Admission Process</li>
<li className="hover:text-[var(--primary)] cursor-pointer">Blog</li>
<li className="hover:text-[var(--primary)] cursor-pointer">Contact</li>

</ul>

<button className="bg-[var(--accent)] text-white px-5 py-2 rounded-lg hover:scale-105 transition">

Free Counselling

</button>

</div>

</nav>

)

}