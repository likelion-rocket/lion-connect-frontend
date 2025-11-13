"use client";

import Image from "next/image";

/**
 * @description
 * 랜딩 페이지의 배너 섹션 컴포넌트입니다.
 * 배경 이미지 위에 그라데이션 텍스트로 CTA 메시지를 표시합니다.
 */
export default function Banner() {
  return (
    <section className="relative h-[282px] w-full min-w-[1444px] py-8 px-[335px] flex justify-center items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/landing/images/lion-banner.png"
          alt="Banner Background"
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient Overlay: black 58% + orange 48% */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.58) 0%, rgba(0, 0, 0, 0.58) 100%), rgba(255, 96, 0, 0.48)",
          }}
        />
      </div>

      {/* Content */}
      <div className="w-[770px] px-2.5 py-4 flex flex-col justify-center items-center gap-10">
        <h2 className="w-[879px] text-center bg-linear-to-r from-[#FF9859] via-[#FF9859] via-20% to-[#FF6000] bg-clip-text text-transparent text-4xl font-bold leading-[45px]">
          지금 바로 상담 신청하고 혁신을 선도하는 기업이 되어보세요!
        </h2>
      </div>
    </section>
  );
}
