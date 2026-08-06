import StatsSection from "@/components/StatsSection";
import HeroSection from "../components/HeroSection";
import WhyStudyAbroad from "@/components/WhyStudyAbroad";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import PartnerSection from "@/components/PartnerSection";
import Navbar from "@/components/Navbar";
import HomePageTopUniversity from "@/components/HomePageTopUniversity";
import Footer from "@/components/Footer";
import connectDB from "@/lib/db";
import NoticeBar from "@/components/NoticeBar";
import PageSetting from "@/models/PageSetting";

export async function generateMetadata() {
  await connectDB();
  const data = await PageSetting.findOne({ pageName: "home-main" }).lean();

  return {
    title: data?.seo?.metaTitle || "MBBS Global 2026 | Top Medical Universities for Indian Students",
    description: 
      data?.seo?.metaDescription || 
      "Apply for MBBS abroad in NMC & WHO-approved low-cost medical universities. Get expert counseling, 100% admission guidance, and complete visa support today.",
    alternates: {
      canonical: "https://www.mbbsstudyabroad.com/",
    },
    openGraph: {
      title: "MBBS Study Abroad - Your Gateway to Global Medical Education",
      description: 
        "Apply for MBBS abroad in NMC & WHO-approved low-cost medical universities with expert counseling and complete admission support.",
      url: "https://www.mbbsstudyabroad.com/",
      siteName: "MBBS Study Abroad",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
  };
}

export default function Home() {
  // Organization Schema for Homepage SEO
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MBBS Study Abroad",
    "url": "https://www.mbbsstudyabroad.com",
    "logo": "https://www.mbbsstudyabroad.com/logo.png",
    "description": "Trusted medical education consultancy offering direct admission and counseling for MBBS abroad in NMC-approved universities.",
    "sameAs": [
      "https://www.facebook.com/mbbsstudyabroad",
      "https://www.instagram.com/mbbsstudyabroad"
    ]
  };

  return (
    <main>
      {/* Organization JSON-LD Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

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