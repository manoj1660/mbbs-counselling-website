import StatsSection from "@/components/StatsSection";
import HeroSection from "../components/HeroSection";
import WhyStudyAbroad from "@/components/WhyStudyAbroad";
import WhoWeAreSection from "@/components/WhoWeAreSection";
// import PartnerSection from "@/components/PartnerSection";
import PartnerSection from "@/components/PartnerSection2";

// 1. Import your new component and the data
import HomePageTopUniversity from "@/components/HomePageTopUniversity";
import { UNIVERSITIES } from "@/data/universities";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const featuredUnis = UNIVERSITIES.slice(0, 3);

  return (
    <main>
      <HeroSection />
      <StatsSection />
      <HomePageTopUniversity unis={featuredUnis} countrySlug="name" />
      {/* <PartnerSection /> */}
      <PartnerSection />
      <WhoWeAreSection />
      <WhyStudyAbroad />
    </main>
  );
}