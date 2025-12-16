import ScrollToHash from "@/components/ScrollToHash";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "./_components/HeroSection";
import { landingMetadata } from "./seo";
import Banner from "./_components/Banner";

const BenefitsSection = dynamic(() => import("./_components/BenefitsSection"));
const ProgramStatsSection = dynamic(() => import("./_components/ProgramStatsSection"));
const UniversityGridSection = dynamic(
  () => import("./_components/UniversityGridSection/UniversityGridSection")
);
const StartupsSection = dynamic(() => import("./_components/StartupsSection"));
const CompanyLogosSection = dynamic(() => import("./_components/CompanyLogosSection"));
const BusinessConnect = dynamic(() => import("./_components/BusinessConnect"));

export const metadata: Metadata = landingMetadata;

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollToHash />
      <ScrollToTopButton />

      {/* Hero Section - 페이지 최상단 */}
      <HeroSection />

      {/* Main Content Sections */}
      <article className="flex flex-col">
        <div className="pt-[258px]">
          <BenefitsSection />
        </div>

        <div className="pt-60">
          <ProgramStatsSection />
        </div>

        <div className="pt-[107px]">
          <UniversityGridSection />
        </div>

        {/* StartupsSection + CompanyLogosSection 공통 그라데이션 배경 */}
        <div className="relative flex flex-col pt-60 gap-60 bg-linear-to-b from-transparent via-brand-01 via-[41.695%] to-[83.386%] to-[rgba(255,249,245,0)]">
          <StartupsSection />
          <CompanyLogosSection />
        </div>

        <div className="pt-[276px]">
          <Banner />
        </div>
      </article>

      <div className="pt-60 pb-[127px]">
        <BusinessConnect />
      </div>
    </main>
  );
}
