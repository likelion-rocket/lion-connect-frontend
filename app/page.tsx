import Footer from "@/components/Footer";
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
      <article>
        <BenefitsSection />
        <ProgramStatsSection />
        <UniversityGridSection />

        {/* StartupsSection + CompanyLogosSection 공통 그라데이션 배경 */}
        <div className="relative bg-gradient-to-b from-transparent via-brand-01 via-[41.695%] to-[83.386%] to-[rgba(255,249,245,0)]">
          <StartupsSection />
          <CompanyLogosSection />
        </div>

        <Banner />
      </article>

      {/* CTA Section */}
      <BusinessConnect />

      {/* Footer */}
      <Footer />
    </main>
  );
}
