//포트 폴리오 컴포넌트(포트폴리와 직무 선택을 하는 컴포넌트)
//자신과 관련된 SNS 및 깃허브 링크를 등록하는 컴포넌트
"use client";

import RegisterPortfolio from "./section/RegisterPortfolio";

export default function PortfolioComponent() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      {/* 섹션 타이틀 */}
      <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
        <span>포트폴리오</span>
        <span className="text-status-error">*</span>
      </div>

      {/* 나머지 본문은 별도 파일로 분리 */}
      <RegisterPortfolio />
    </section>
  );
}
