import StatsSection from "@/components/StatsSection";
import HeroSection from "../components/HeroSection";
import WhyStudyAbroad from "@/components/WhyStudyAbroad";
import StickyScrollRevealDemo from "@/components/sticky-scroll-reveal-demo";
import { AnimatedListDemo } from "@/components/AnimatedListDemo";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import PartnerSection from "@/components/PartnerSection";
export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <PartnerSection />
      <WhoWeAreSection />

      <WhyStudyAbroad />
      {/* <AnimatedListDemo/> */}
      {/* <StickyScrollRevealDemo /> */}
    </main>
  );
}
