"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type BenefitCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  index: number;
};

/**
 * BenefitCard Component
 * @description 스크롤 트리거 애니메이션이 적용된 혜택 카드
 * - useScrollAnimation 훅으로 화면 진입 시 애니메이션 시작
 * - 텍스트: 페이드인 + 슬라이드업 (순차 등장)
 * - 이미지: 줌인 + 페이드인
 * - 반응형 디자인 유지
 */
function BenefitCard({
  title,
  description,
  imageSrc,
  imageAlt,
  imagePosition,
  index,
}: BenefitCardProps) {
  const { ref: cardRef, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <div
      ref={cardRef}
      className={`w-full px-[80px] py-[80px] flex gap-[80px] justify-center items-center ${
        imagePosition === "right" ? "flex-row-reverse" : ""
      }`}
    >
      {/* 텍스트 영역 - 페이드인 + 슬라이드업 */}
      <div
        className={`flex flex-col gap-[48px] flex-1 max-w-[463px] transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{
          transitionDelay: `${100 + index * 100}ms`,
        }}
      >
        {/* 타이틀 - 순차 등장 */}
        <h3
          className={`text-text-primary text-[36px] font-bold leading-tight transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{
            transitionDelay: `${200 + index * 100}ms`,
          }}
        >
          {title}
        </h3>

        {/* 설명 - 타이틀보다 늦게 등장 */}
        <p
          className={`text-text-primary text-base font-normal leading-normal whitespace-pre-line transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{
            transitionDelay: `${400 + index * 100}ms`,
          }}
        >
          {description}
        </p>
      </div>

      {/* 이미지 영역 - 줌인 + 페이드인 */}
      <div
        className={`w-[600px] h-[420px] relative rounded-lg overflow-hidden shrink-0 transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{
          transitionDelay: `${300 + index * 100}ms`,
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className={`object-cover transition-transform duration-1200 ease-out ${
            isVisible ? "scale-100" : "scale-110"
          }`}
          sizes="600px"
          style={{
            transitionDelay: `${300 + index * 100}ms`,
          }}
        />
      </div>
    </div>
  );
}

function BenefitsSection() {
  const { ref: titleRef, isVisible: isTitleVisible } = useScrollAnimation<HTMLHeadingElement>({
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  });

  const benefits = [
    {
      title: "적합한 인재 탐색",
      description:
        "멋사 대학 누적 수료 학생 수 14,000명 이상, 멋사 부트캠프\n 누적 수강생 15,000명 이상. 개발, 기획, 데이터 분석, 디자인,\n 마케팅 등 다양한 직무의 인재가 매년 수천 명씩 멋쟁이사자처럼을\n 통해 배출되고 있습니다.",
      imageSrc: "/landing/images/reason01.png",
      imageAlt: "적합한 인재 탐색",
      imagePosition: "left" as const,
    },
    {
      title: "우수한 IT 인재",
      description:
        "지금까지 1,800개 이상의 서비스가 멋쟁이사자처럼에서\n 완성됐으며, 탈잉, 그리팅, 자소설닷컴 등 유망 스타트업들이\n 멋쟁이사자처럼의 인재들로부터 탄생했습니다. 그외에도\n 국내외 주요 기업에서 멋사 출신 인재들이 활약 중입니다.",
      imageSrc: "/landing/images/reason02.png",
      imageAlt: "우수한 IT 인재",
      imagePosition: "right" as const,
    },
  ];

  return (
    <section
      id="benefits-section"
      className="w-full min-w-[1444px] max-w-[1443px] mx-auto pt-28 bg-bg-primary flex flex-col justify-start items-start"
    >
      <div className="self-stretch flex flex-col justify-start items-center gap-20">
        {/* Section Title - 페이드인 + 슬라이드업 애니메이션 */}
        <h2
          ref={titleRef}
          className={`self-stretch text-center text-text-accent text-4xl font-bold leading-tight transition-all duration-1000 ease-out ${
            isTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          왜 라이언 커넥트를 사용해야 할까요?
        </h2>

        {/* Benefits Cards Container */}
        <div className="self-stretch flex flex-col justify-start items-center">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;
