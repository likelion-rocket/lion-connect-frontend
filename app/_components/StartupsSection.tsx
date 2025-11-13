"use client";

import { useState } from "react";
import Marquee from "react-fast-marquee";
import { STARTUPS } from "@/constants/startups";
import StartupCard from "@/components/cards/StartupCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * 멋쟁이사자처럼에서 탄생한 스타트업들을 소개하는 섹션
 * - 제목, 부제목, 스타트업 카드 무한 슬라이드로 구성
 * - react-fast-marquee를 사용한 부드러운 무한 스크롤
 * - 카드별 위치 기반 투명도 페이드 효과
 */
export default function StartupsSection() {
  const [isHovered, setIsHovered] = useState(false);
  const { ref: headerRef, isVisible: isHeaderVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
  });

  /**
   * 카드 클릭 시 해당 스타트업 웹사이트로 이동
   */

  return (
    <section className="relative min-w-[1444px] flex flex-col items-center px-[83px]">
      {/* 제목 및 설명 컨테이너 - 페이드인 + 슬라이드업 */}
      <div
        ref={headerRef}
        className="mb-[111px] flex max-w-[1280px] flex-col items-center gap-[35px] w-full"
      >
        {/* 메인 제목 컨테이너 */}
        <div className="flex flex-col items-center gap-3">
          <h2
            className={`text-center text-4xl font-bold leading-[45px] text-text-accent
              transition-all duration-1000 ease-out
              ${isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            멋쟁이 사자처럼의 인재들로부터 독보적인 스타트업들이 탄생하였습니다.
          </h2>
        </div>

        {/* 부제목 */}
        <p
          className={`text-center text-sm font-medium leading-[21px] text-text-secondary
            transition-all duration-1000 ease-out
            ${isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "300ms" }}
        >
          *멋쟁이 사자처럼의 인재들이 탄생시킨 스타트업을 확인해보세요
        </p>
      </div>

      {/* 스타트업 카드 무한 슬라이드 */}
      <div
        className="startup-carousel-container max-w-7xl overflow-x-hidden overflow-y-visible py-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Marquee speed={40} autoFill play={!isHovered} style={{ overflow: "visible" }}>
          {STARTUPS.map((startup, index) => (
            <div key={`startup-${index}`} className="px-4 py-4">
              <StartupCard startup={startup} index={index} totalCards={STARTUPS.length} />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
