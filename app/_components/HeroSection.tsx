"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import CTAButton from "@/components/buttons/CTAButton";

type HeroSectionProps = {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage?: string;
};

/**
 * @description
 * 랜딩 페이지의 히어로 섹션 컴포넌트입니다.
 * 배경 이미지 위에 타이틀, 서브타이틀, CTA 버튼을 표시합니다.
 * 페이지 로드 시 순차적인 페이드인 애니메이션이 적용됩니다.
 *
 * Note: HeroSection은 항상 화면 최상단에 있으므로 IntersectionObserver 대신
 * 컴포넌트 마운트 시점에 애니메이션을 시작합니다.
 */
export default function HeroSection({
  title = "IT 인재 탐색 및 채용 플랫폼\n라이언 커넥트",
  subtitle = "지금 바로 우수 IT 인재와 커넥트하세요",
  ctaText = "인재 탐색 바로가기",
  ctaHref = "/talents",
  backgroundImage = "/images/landing-image01.jpg",
}: HeroSectionProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // 컴포넌트 마운트 후 애니메이션 시작
    setIsMounted(true);
  }, []);

  return (
    <section className="relative w-full h-[790px] flex justify-center items-center overflow-hidden">
      {/* Background Image with Gradient Overlay - 줌인 + 페이드인 */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Lion Connect Hero Background"
          fill
          priority
          className={`object-cover transition-all duration-1500 ease-out ${
            isMounted ? "scale-100 opacity-100" : "scale-110 opacity-0"
          }`}
          sizes="100vw"
        />
        <div
          className={`absolute inset-0 bg-linear-to-b from-black/30 to-black/80 transition-opacity duration-1000 ease-out ${
            isMounted ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full px-[422px] py-[148px] flex justify-center items-center">
        <div className="flex flex-col justify-start items-center gap-20">
          {/* Title & Subtitle Container */}
          <div className="w-[517px] flex flex-col justify-center items-center gap-2">
            {/* Title - 페이드인 + 슬라이드업 */}
            <h1
              className={`self-stretch text-center text-text-inverse-primary text-4xl font-bold leading-10 whitespace-pre-line
                transition-all duration-1000 ease-out
                ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: "300ms" }}
            >
              {title}
            </h1>

            {/* Subtitle - 타이틀보다 늦게 등장 */}
            <div className="p-2.5 flex justify-center items-center">
              <p
                className={`text-center text-text-inverse-primary text-lg font-normal leading-6
                  transition-all duration-1000 ease-out
                  ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: "600ms" }}
              >
                {subtitle}
              </p>
            </div>
          </div>

          {/* CTA Button - 마지막에 등장 + 스케일 효과 */}
          <div
            className={`transition-all duration-1000 ease-out
              ${
                isMounted
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-6 scale-95"
              }`}
            style={{ transitionDelay: "900ms" }}
          >
            <CTAButton href={ctaHref}>{ctaText}</CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
