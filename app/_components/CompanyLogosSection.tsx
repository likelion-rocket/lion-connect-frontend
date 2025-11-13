"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * CompanyLogosSection Component
 * @description 멋사 대학 및 부트캠프 출신 재직 기업 로고를 표시하는 섹션
 * - 피그마 기준: bg-brand-01(#fff3eb), 2줄 로고 그리드, 양쪽 그라데이션
 * - react-fast-marquee를 사용한 부드러운 무한 스크롤
 */

// 기업 로고 이미지 경로
const COMPANY_LOGOS = {
  row1: [
    "/landing/company-logos/kraton.png", // kraton
    "/landing/company-logos/here.png", // 여기어때
    "/landing/company-logos/gukminBAnk.png", // KB금융그룹
    "/landing/company-logos/wemade.png", // WEMADE
    "/landing/company-logos/LG.png", // LG전자
    "/landing/company-logos/linkage.png", // Linkage Lab
    "/landing/company-logos/opem.png", // openSG
    "/landing/company-logos/toss.png", // 토스
    "/landing/company-logos/romnd.png", // rom&nd
    "/landing/company-logos/payhere.png", // payhere
  ],
  row2: [
    "/landing/company-logos/amazon.png", // amazon
    "/landing/company-logos/wuwa.png", // 우아한형제들
    "/landing/company-logos/coupang.png", // coupang
    "/landing/company-logos/hyperconnect.png", // Hyperconnect
    "/landing/company-logos/kakao.png", // kakao
    "/landing/company-logos/naver.png", // NAVER
    "/landing/company-logos/sendbird.png", // sendbird
    "/landing/company-logos/smilegate.png", // smilegate
    "/landing/company-logos/google.png", // Google
    "/landing/company-logos/meta.png", // Meta
    "/landing/company-logos/carrot.png", // 당근마켓
  ],
};

export default function CompanyLogosSection() {
  const { ref: headerRef, isVisible: isHeaderVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
  });

  return (
    <section className="relative w-full min-w-[1444px] px-20 py-[60px] flex flex-col items-center gap-12">
      {/* Section Header - 페이드인 + 슬라이드업 */}
      <div
        ref={headerRef}
        className="w-full max-w-[1283px] flex flex-col items-center gap-[32px] text-center"
      >
        {/* 레이블 + 제목 그룹 */}
        <div className="flex flex-col items-center gap-3 w-full">
          {/* 상단 레이블 */}
          <p
            className={`text-text-secondary text-sm font-normal leading-[21px]
              transition-all duration-1000 ease-out
              ${isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "100ms" }}
          >
            Employed Company
          </p>

          {/* 메인 제목 */}
          <h2
            className={`text-text-accent text-4xl font-bold leading-[45px]
              transition-all duration-1000 ease-out
              ${isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "300ms" }}
          >
            멋사 대학 및 부트캠프 출신 재직 기업
          </h2>
        </div>

        {/* 부제목 */}
        <p
          className={`text-text-secondary text-sm font-medium leading-[21px]
            transition-all duration-1000 ease-out
            ${isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "500ms" }}
        >
          실제 멋사 대학 및 멋사 부트캠프 수료생 재직 기업입니다
        </p>
      </div>

      {/* Logos Grid Container */}
      <div className="relative w-full max-w-[1560px] flex flex-col gap-6 overflow-x-hidden overflow-y-visible">
        {/* 첫 번째 줄 - 왼쪽으로 흐르는 애니메이션 */}
        <Marquee speed={40} autoFill style={{ overflow: "visible" }}>
          {COMPANY_LOGOS.row1.map((logoUrl, index) => (
            <div key={`row1-${index}`} className="px-2 pb-3">
              <div className="shrink-0 w-[162px] h-[162px] bg-white rounded-lg shadow-lg flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src={logoUrl}
                    alt={`기업 로고 ${index + 1}`}
                    fill
                    className="object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </Marquee>

        {/* 두 번째 줄 - 오른쪽으로 흐르는 애니메이션 */}
        <Marquee speed={40} autoFill direction="right" style={{ overflow: "visible" }}>
          {COMPANY_LOGOS.row2.map((logoUrl, index) => (
            <div key={`row2-${index}`} className="px-2 pb-4">
              <div className="shrink-0 w-[162px] h-[162px] bg-white rounded-lg shadow-lg flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src={logoUrl}
                    alt={`기업 로고 ${index + 1}`}
                    fill
                    className="object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </Marquee>

        {/* 좌측 그라데이션 오버레이 */}
        <div className="absolute top-0 left-0 w-[202px] h-full bg-linear-to-r from-white from-[52.885%] to-transparent pointer-events-none z-10" />

        {/* 우측 그라데이션 오버레이 */}
        <div className="absolute top-0 right-0 w-[202px] h-full bg-linear-to-l from-white from-[52.885%] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
