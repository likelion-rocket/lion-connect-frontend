// components/talent/Slider.client.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  items: string[];
  className?: string;
  step?: number; // 한 번에 이동 px (기본 240)
};

export default function Slider({ items, className = "", step = 240 }: Props) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);

  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);

  const recalc = () => {
    const vp = viewportRef.current;
    const strip = stripRef.current;
    if (!vp || !strip) return;
    const vpW = vp.clientWidth;
    const stripW = strip.scrollWidth;
    const max = Math.max(0, stripW - vpW);
    setMaxOffset(max);
    setOffset((prev) => Math.min(prev, max));
  };

  useEffect(() => {
    recalc();
    const onResize = () => recalc();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [items]);

  const handleSlide = (dir: "left" | "right") => {
    setOffset((prev) => {
      const next = dir === "right" ? prev + step : prev - step;
      return Math.max(0, Math.min(next, maxOffset));
    });
  };

  const canLeft = offset > 0;
  const canRight = offset < maxOffset;

  return (
    <div className={`relative ${className}`}>
      {/* 뷰포트(마스크) */}
      <div ref={viewportRef} className="overflow-hidden">
        {/* 스트립: 네이티브 스크롤 없음. translateX로만 이동 */}
        <div
          ref={stripRef}
          className="flex gap-2 whitespace-nowrap transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {items.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-border-quaternary bg-white px-3 py-1 text-[12px] font-medium text-[#555]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* 좌측 페이드 + 버튼 (이름 x좌표에 딱 고정) */}
      <div
        aria-hidden
        className={`absolute left-0 top-0 h-full w-8 bg-linear-to-r from-white to-transparent transition-opacity ${
          canLeft ? "opacity-100" : "opacity-0"
        }`}
      />
      <button
        type="button"
        onClick={() => handleSlide("left")}
        aria-label="이전 칩들 보기"
        className={`absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md border border-border-quaternary bg-white flex items-center justify-center transition
        ${canLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <Image src="/icons/outline-cheveron-left.svg" alt="left" width={16} height={16} />
      </button>

      {/* 우측 페이드 + 버튼 */}
      <div
        aria-hidden
        className={`absolute right-0 top-0 h-full w-8 bg-linear-to-l from-white to-transparent transition-opacity ${
          canRight ? "opacity-100" : "opacity-0"
        }`}
      />
      <button
        type="button"
        onClick={() => handleSlide("right")}
        aria-label="다음 칩들 보기"
        className={`absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md border border-border-quaternary bg-white flex items-center justify-center transition
        ${canRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <Image src="/icons/outline-cheveron-right.svg" alt="right" width={16} height={16} />
      </button>
    </div>
  );
}
