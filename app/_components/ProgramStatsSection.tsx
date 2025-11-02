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
    <div ref={elementRef} className="flex-1 flex flex-col justify-start items-center gap-3">
      {/* 숫자 영역 - flex를 사용하여 수평 정렬 */}
      <div className="flex items-baseline justify-center whitespace-nowrap">
        <span className="text-orange-600 text-4xl font-bold leading-none">
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
        <span className="text-neutral-800 text-4xl font-bold leading-none ml-1">+</span>
      </div>
      {/* 레이블 영역 */}
      <p className="text-center text-neutral-800 text-base font-medium leading-6 whitespace-nowrap">
        {label}
      </p>
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
  stats: StatItemProps[];
};

function ProgramCard({ logoSrc, logoAlt, stats }: ProgramCardProps) {
  const { ref: cardRef, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={cardRef}
      className={`self-stretch p-8 bg-white rounded-lg shadow-[0px_4px_6px_-2px_rgba(0,0,0,0.05)] inline-flex justify-start items-center gap-16
        transition-all duration-1000 ease-out
        ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
    >
      {/* Logo Section - 페이드인 */}
      <div
        className={`w-72 h-12 relative overflow-hidden transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
        style={{ transitionDelay: "200ms" }}
      >
        <Image src={logoSrc} alt={logoAlt} fill className="object-contain" sizes="288px" />
      </div>

      {/* Stats Section */}
      <div className="flex-1 p-4 bg-orange-50 rounded-lg flex justify-center items-center gap-10">
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
    { value: "11,947명", label: "출신 학생 수" },
    { value: "1,800개", label: "누적 프로젝트 수" },
  ];

  // 멋사부트캠프 통계 데이터
  const bootcampStats: StatItemProps[] = [
    { value: "5개", label: "직군" },
    { value: "3,612명", label: "출신 학생 수" },
    { value: "15,000명", label: "누적 학생 수" },
  ];

  return (
    <section className="w-full py-28 bg-linear-to-b from-white to-orange-50 flex justify-center items-start">
      <div className="w-full max-w-[1443px] px-20 flex flex-col justify-start items-center gap-12">
        {/* Header Section */}
        <div ref={headerRef} className="flex flex-col justify-start items-center gap-20">
          <div className="self-stretch flex flex-col justify-start items-center gap-8">
            <div className="w-full max-w-[1280px] flex flex-col justify-start items-center gap-16">
              {/* Title and Subtitle */}
              <div className="self-stretch flex flex-col justify-start items-center gap-8">
                {/* 서브타이틀 - 페이드인 + 슬라이드업 */}
                <div
                  className={`self-stretch text-center justify-start text-zinc-600 text-xl font-bold leading-7
                    transition-all duration-1000 ease-out
                    ${isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{ transitionDelay: "100ms" }}
                >
                  Participating Student
                </div>
                {/* 메인 타이틀 - 서브타이틀보다 늦게 등장 */}
                <h2
                  className={`self-stretch text-center justify-start text-orange-600 text-5xl font-bold leading-[60px]
                    transition-all duration-1000 ease-out
                    ${isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: "300ms" }}
                >
                  멋사 부트캠프, 멋사 대학 출신 학생 수 누적 25,000명 +
                </h2>
              </div>

              {/* Description - 마지막에 등장 */}
              <p
                className={`w-full max-w-[788px] text-center justify-start text-neutral-800 text-lg font-normal leading-7
                  transition-all duration-1000 ease-out
                  ${isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: "500ms" }}
              >
                멋쟁이사자처럼 활동을 함께하는 대학의 인재들과
                <br />
                멋사 부트캠프를 통해 우수한 실력을 갖춘 인재들이 기다리고 있습니다.
              </p>
            </div>
          </div>

          {/* Program Cards Section */}
          <div className="w-full max-w-[1144px] flex flex-col justify-start items-start gap-8">
            {/* 멋사대학 Card */}
            <ProgramCard
              logoSrc="/landing/LIKELION_UNIV._logo_Primary.svg"
              logoAlt="멋쟁이사자처럼 대학 로고"
              stats={universityStats}
            />

            {/* 멋사부트캠프 Card */}
            <ProgramCard
              logoSrc="/landing/LIKELION_BOOTCAMP_logo_Primary.svg"
              logoAlt="멋쟁이사자처럼 부트캠프 로고"
              stats={bootcampStats}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
