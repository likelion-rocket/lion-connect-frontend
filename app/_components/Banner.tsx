"use client";

import Link from "next/link";
import Image from "next/image";
/**
 * @description
 * 랜딩 페이지의 배너 섹션 컴포넌트입니다.
 * 배경 이미지 위에 제목과 인재 탐색 CTA 버튼을 표시합니다.
 */
export default function Banner() {
  return (
    <section className="relative h-[282px] w-full min-w-[1444px] py-8 flex justify-center items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/landing/images/lion-banner.png"
          alt="Banner Background"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center items-center gap-10">
        <h2 className="text-center text-white text-4xl font-bold leading-10">
          멋쟁이사자처럼의 인재와 함께해 보세요
        </h2>

        <Link
          href="/talents"
          className="h-12 px-8 bg-bg-accent rounded-full inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-text-inverse-primary text-lg font-semibold leading-7"
        >
          <span>인재 탐색 바로가기</span>
          <Image
            src="/landing/icons/outline-cheveron-right.svg"
            alt="Arrow"
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </Link>
      </div>
    </section>
  );
}
