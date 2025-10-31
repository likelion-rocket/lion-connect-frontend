// app/(consumer)/talents/register/components/QualificationComponent.tsx
"use client";

import PremierSection from "./section/PremierSection";
import LanguageSection from "./section/LanguageSection";
import CertificateSection from "./section/CertificateSection";

export default function QualificationComponent() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 섹션 타이틀 */}
      <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
        <span>수상 / 자격증 / 기타</span>
      </div>

      {/* 1. 수상 / 활동 */}
      <PremierSection />

      {/* 2. 언어 + 자격증 (2단 레이아웃) */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <LanguageSection />
        <CertificateSection />
      </div>
    </section>
  );
}
