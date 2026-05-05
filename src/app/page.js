import StatsSection from "@/components/StatsSection";
import HeroSection from "../components/HeroSection";
import WhyStudyAbroad from "@/components/WhyStudyAbroad";
import WhoWeAreSection from "@/components/WhoWeAreSection";
// import PartnerSection from "@/components/PartnerSection";
import PartnerSection from "@/components/PartnerSection";
import Navbar from "@/components/Navbar";
import HomePageTopUniversity from "@/components/HomePageTopUniversity";
import Footer from "@/components/Footer";
import connectDB from "@/lib/db";
import NoticeBar from "@/components/NoticeBar";
import PageSetting from "@/models/PageSetting";
// app/page.js
//export async function generateMetadata() {
  //await connectDB();
  
  // Hum database se wahi ID maang rahe hain jo humne Admin mein set ki thi
  //const data = await PageSetting.findOne({ pageName: "home-main" }).lean();

  //return {
    //title: data?.seo?.metaTitle || "MBBS abroad - Your Gateway to Global Medical Education",
    //description: data?.seo?.metaDescription || "MBBS Study Abroad is your trusted partner for direct admissions and transparent guidance...",
 // };
//}
// src/app/page.js

export async function generateMetadata() {
  await connectDB();
  const data = await PageSetting.findOne({ pageName: "home-main" }).lean();

  return {
    title: data?.seo?.metaTitle || "MBBS Abroad 2026 | Top Medical Universities for Indian Students",
    description: data?.seo?.metaDescription || "Get direct admission in low-cost, NMC-approved medical universities abroad. Expert guidance for MBBS in Russia, Uzbekistan, Kazakhstan, and more.",
    alternates: {
      canonical: "https://www.mbbsstudyabroad.com/",
    },
    openGraph: {
      title: "MBBS Study Abroad - Your Gateway to Global Medical Education",
      description: "Apply for MBBS abroad with transparent guidance and direct admission.",
      url: "https://www.mbbsstudyabroad.com/",
      siteName: "MBBS Study Abroad",
      images: [
        {
          url: "/og-image.jpg", // Make sure to add an image in public folder
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
  };
}
export default function Home() {
  // Controller logic


  return (
    <main>
      <header className="sticky top-0 z-50"> 
        <NoticeBar />
        <Navbar />
      </header>
      <HeroSection />
      <StatsSection />
      <HomePageTopUniversity/>
      <PartnerSection />
      <WhoWeAreSection />
      <WhyStudyAbroad />
      <Footer/>
    </main>
  );
}
