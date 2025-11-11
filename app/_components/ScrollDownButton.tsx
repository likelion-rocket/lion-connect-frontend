"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ScrollDownButtonProps = {
  targetSectionId?: string;
  delay?: number;
};

/**
 * @description
 * 다음 섹션으로 스크롤하는 버튼 컴포넌트입니다.
 * 페이드인 애니메이션과 바운스 효과가 적용됩니다.
 */
export default function ScrollDownButton({
  targetSectionId = "benefits-section",
  delay = 1200,
}: ScrollDownButtonProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToNextSection = () => {
    const targetSection = document.getElementById(targetSectionId);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <button
      onClick={scrollToNextSection}
      className={`absolute bottom-12 left-1/2 -translate-x-1/2 z-20 w-8 h-8 transition-all duration-1000 ease-out animate-bounce hover:scale-110 ${
        isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      aria-label="다음 섹션으로 스크롤"
    >
      <Image
        src="/landing/icons/outline-cheveron-down-gray.svg"
        alt="Scroll Down"
        width={32}
        height={32}
        className="w-full h-full hover:cursor-pointer"
      />
    </button>
  );
}
