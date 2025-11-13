"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { extractNumber, extractUnit } from "@/lib/formatNumber";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * StatItem Component
 * 개별 통계 정보를 표시하는 컴포넌트
 */
type StatItemProps = {
  value: string;
  label: string;
};

function StatItem({ value, label }: StatItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const numericValue = extractNumber(value);
  const unit = extractUnit(value);

  // Intersection Observer를 사용하여 요소가 화면에 보일 때 애니메이션 시작
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // 한 번만 트리거
        }
      },
      { threshold: 0.3 } // 30% 보일 때 트리거
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={elementRef} className="flex-1 flex flex-col items-center gap-4">
      {/* 숫자 영역 */}
      <div className="flex items-baseline justify-center">
        <span className="text-[#FF6000] text-4xl font-bold leading-[45px]">
          {isVisible ? (
            <CountUp
              start={0}
              end={numericValue}
              duration={2.5}
              separator=","
              useEasing={true}
              easingFn={(t, b, c, d) => {
                // easeOutExpo: 빠르게 시작하고 천천히 끝남
                return t === d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
              }}
            />
          ) : (
            "0"
          )}
          {unit}
        </span>
        <span className="text-[#262626] text-4xl font-bold leading-[45px]"> +</span>
      </div>
      {/* 레이블 영역 */}
      <p className="text-center text-[#262626] text-base font-medium leading-6">{label}</p>
    </div>
  );
}

/**
 * ProgramCard Component
 * 멋사대학 또는 멋사부트캠프 카드를 표시하는 컴포넌트
 */
type ProgramCardProps = {
  logoSrc: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  stats: StatItemProps[];
};

function ProgramCard({ logoSrc, logoAlt, logoWidth, logoHeight, stats }: ProgramCardProps) {
  const { ref: cardRef, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={cardRef}
      className={`p-8 bg-white rounded-lg shadow-[0px_4px_6px_-2px_rgba(0,0,0,0.05)] flex items-center gap-20
        transition-all duration-1000 ease-out
        ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
    >
      {/* Logo Section */}
      <div
        className={`relative overflow-hidden transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
        style={{ width: `${logoWidth}px`, height: `${logoHeight}px`, transitionDelay: "200ms" }}
      >
        <Image
          src={logoSrc}
          alt={logoAlt}
          fill
          className="object-contain"
          sizes={`${logoWidth}px`}
        />
      </div>

      {/* Stats Section */}
      <div className="flex-1 p-4 bg-[#FFF3EB] rounded-lg flex justify-center items-center gap-10">
        {stats.map((stat, index) => (
          <StatItem key={index} value={stat.value} label={stat.label} />
        ))}
      </div>
    </div>
  );
}

/**
 * ProgramStatsSection Component
 *
 * @description
 * 멋쟁이사자처럼 대학과 부트캠프의 통계 정보를 보여주는 섹션입니다.
 * 누적 학생 수, 프로젝트 수 등의 주요 지표를 시각적으로 표현합니다.
 *
 * @example
 * <ProgramStatsSection />
 */
export default function ProgramStatsSection() {
  const { ref: headerRef, isVisible: isHeaderVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
  });

  // 멋사대학 통계 데이터
  const universityStats: StatItemProps[] = [
    { value: "13년", label: "시작된 지" },
    { value: "14,000명", label: "출신 학생 수" },
    { value: "1,800개", label: "누적 프로젝트 수" },
  ];

  // 멋사부트캠프 통계 데이터
  const bootcampStats: StatItemProps[] = [
    { value: "5개", label: "직군" },
    { value: "3,612명", label: "출신 학생 수" },
    { value: "15,000명", label: "누적 학생 수" },
  ];

  return (
    <section
      className="w-full min-w-[1444px] flex justify-center items-start pb-[133px]"
      style={{ background: "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFF3EB 65%)" }}
    >
      <div className="w-full max-w-[1443px] px-20 flex flex-col items-center gap-[140px]">
        {/* Header Section */}
        <div ref={headerRef} className="w-full max-w-[793px] flex flex-col items-center gap-8">
          {/* Title and Subtitle */}
          <div className="flex flex-col items-center gap-3">
            {/* 서브타이틀 */}
            <div
              className={`text-center text-[#737373] text-sm font-normal leading-[21px]
                transition-all duration-1000 ease-out
                ${isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "100ms" }}
            >
              Participating Student
            </div>
            {/* 메인 타이틀 */}
            <h2
              className={`text-center text-[#FF6000] text-4xl font-bold leading-[45px]
                transition-all duration-1000 ease-out
                ${isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: "300ms" }}
            >
              멋사 부트캠프, 멋사 대학 출신 학생 수 누적 29,000명 +
            </h2>
          </div>

          {/* Description */}
          <p
            className={`text-center text-[#737373] text-sm font-medium leading-[21px]
              transition-all duration-1000 ease-out
              ${isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "500ms" }}
          >
            멋쟁이 사자처럼 활동을 함께하는 멋사 대학의 인재들과 멋사 부트캠프를 통해 우수한 실력을
            갖춘 인재들이 기다리고 있습니다.
          </p>
        </div>

        {/* Program Cards Section */}
        <div className="w-full flex flex-col gap-8 shadow-[0px_4px_6px_-2px_rgba(0,0,0,0.05)]">
          {/* 멋사대학 Card */}
          <ProgramCard
            logoSrc="/landing/LIKELION_UNIV._logo_Primary.svg"
            logoAlt="멋쟁이사자처럼 대학 로고"
            logoWidth={300}
            logoHeight={48}
            stats={universityStats}
          />

          {/* 멋사부트캠프 Card */}
          <ProgramCard
            logoSrc="/landing/LIKELION_BOOTCAMP_logo_Primary.svg"
            logoAlt="멋쟁이사자처럼 부트캠프 로고"
            logoWidth={300}
            logoHeight={36}
            stats={bootcampStats}
          />
        </div>
      </div>
    </section>
  );
}
