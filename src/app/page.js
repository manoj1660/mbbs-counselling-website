import StatsSection from "@/components/StatsSection";
import HeroSection from "../components/HeroSection";
import WhyStudyAbroad from "@/components/WhyStudyAbroad";
import WhoWeAreSection from "@/components/WhoWeAreSection";
// import PartnerSection from "@/components/PartnerSection";
import PartnerSection from "@/components/PartnerSection";
import Navbar from "@/components/Navbar";
import University from "@/models/University";
// 1. Import your new component and the data
import HomePageTopUniversity from "@/components/HomePageTopUniversity";
import { UNIVERSITIES } from "@/data/universities";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import connectDB from "@/lib/db";
import PageSetting from "@/models/PageSetting";
// app/page.js
export async function generateMetadata() {
  await connectDB();
  
  // Hum database se wahi ID maang rahe hain jo humne Admin mein set ki thi
  const data = await PageSetting.findOne({ pageName: "home-main" }).lean();

  return {
    title: data?.seo?.metaTitle || "MBBS abroad - Your Gateway to Global Medical Education",
    description: data?.seo?.metaDescription || "MBBS Study Abroad is your trusted partner for direct admissions and transparent guidance...",
  };
}

export default function Home() {
  // Controller logic


  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <HomePageTopUniversity/>
      {/* <PartnerSection /> */}
      <PartnerSection />
      <WhoWeAreSection />
      <WhyStudyAbroad />
      <Footer/>
    </main>
  );
}