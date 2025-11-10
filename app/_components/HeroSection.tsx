"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type HeroSectionProps = {
  badge?: string;
  backgroundImage?: string;
};

/**
 * @description
 * 랜딩 페이지의 히어로 섹션 컴포넌트입니다.
 * 배경 이미지 위에 배지, 타이틀, 서브타이틀, CTA 버튼들을 표시합니다.
 * 페이지 로드 시 순차적인 페이드인 애니메이션이 적용됩니다.
 *
 * Note: HeroSection은 항상 화면 최상단에 있으므로 IntersectionObserver 대신
 * 컴포넌트 마운트 시점에 애니메이션을 시작합니다.
 */
export default function HeroSection({
  badge = "IT 인재 채용 플랫폼 NO.1",
  backgroundImage = "/images/landing-image01.jpg",
}: HeroSectionProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToNextSection = () => {
    const benefitsSection = document.getElementById("benefits-section");
    if (benefitsSection) {
      benefitsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="relative w-full min-w-[1444px] h-[790px] flex justify-center items-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
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
      <article className="relative z-10 inline-flex flex-col items-center gap-12">
        {/* Badge */}
        <div
          className={`w-52 h-9 bg-bg-accent/20 rounded-lg outline-[0.80px] outline-offset-[-0.80px] outline-bg-accent/30 overflow-hidden transition-all duration-1000 ease-out ${
            isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <p className="text-center text-text-accent text-sm font-normal leading-5 pt-[7.60px]">
            {badge}
          </p>
        </div>

        {/* Title & Subtitle */}
        <hgroup className="inline-flex flex-col items-center gap-6">
          <h1
            className={`lc-heading-ko text-6xl leading-[80px] text-center transition-all duration-1000 ease-out ${
              isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <span className="text-text-inverse-primary">우수한 IT 인재와</span>
            <br />
            <span className="text-text-accent">지금 바로 연결 </span>
            <span className="text-text-inverse-primary">하세요</span>
          </h1>

          <p
            className={`w-[768px] text-center text-text-inverse-primary/90 text-2xl font-normal leading-8 transition-all duration-1000 ease-out ${
              isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            멋쟁이사자처럼 출신 29,000명 이상의 검증된 인재들이
            <br />
            여러분의 기업을 기다리고 있습니다
          </p>
        </hgroup>

        {/* CTA Buttons */}
        <nav
          className={`inline-flex gap-4 transition-all duration-1000 ease-out ${
            isMounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
          }`}
          style={{ transitionDelay: "900ms" }}
        >
          <Link
            href="/talents"
            className="h-12 gap-4 px-6 bg-bg-accent rounded-full inline-flex items-center justify-center hover:opacity-90 transition-opacity text-text-inverse-primary text-lg font-semibold leading-7"
          >
            <span>인재 탐색 시작하기</span>
            <Image
              src="/landing/icons/outline-arrow-right.svg"
              alt="Arrow"
              width={16}
              height={16}
            />
          </Link>
          <button className="h-12 px-8 bg-white/10 rounded-full outline-[0.80px] outline-offset-[-0.80px] outline-white/30 inline-flex justify-center items-center hover:bg-white/20 transition-colors text-text-inverse-primary text-lg font-semibold leading-7">
            기업 문의하기
          </button>
        </nav>
      </article>

      {/* Scroll Down Button */}
      <button
        onClick={scrollToNextSection}
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 z-20 w-8 h-8 transition-all duration-1000 ease-out animate-bounce hover:scale-110 ${
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "1200ms" }}
        aria-label="다음 섹션으로 스크롤"
      >
        <Image
          src="/landing/outline-cheveron-down-gray.svg"
          alt="Scroll Down"
          width={32}
          height={32}
          className="w-full h-full hover:cursor-pointer"
        />
      </button>
    </section>
  );
}
