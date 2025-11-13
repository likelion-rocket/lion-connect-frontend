"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { University } from "@/constants/universities";

/**
 * UniversityCard Component
 * 개별 대학교 카드를 표시하는 컴포넌트
 */
type UniversityCardProps = {
  university: University;
};

export default function UniversityCard({ university }: UniversityCardProps) {
  return (
    <motion.a
      href={university.link}
      target="_blank"
      rel="noopener noreferrer"
      layout // FLIP 애니메이션의 핵심!
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        layout: { duration: 0.5, ease: "easeInOut" }, // 위치 이동 애니메이션
        opacity: { duration: 0.3 }, // 페이드 애니메이션
        scale: { duration: 0.3 }, // 스케일 애니메이션
      }}
      className="flex flex-col items-center gap-3 cursor-pointer"
    >
      {/* 대학 로고 */}
      <div
        className={`w-24 h-24 -shadow-lg relative rounded-full overflow-hidden shadow-md transition-transform duration-300 hover:scale-110 hover:shadow-lg ${
          university.name === "삼육대" ? "bg-black" : ""
        }`}
      >
        <Image
          src={university.logo}
          alt={`${university.name} 로고`}
          fill
          className={`${university.name === "숭실대" ? "object-contain p-3" : "object-cover"}`}
          sizes="96px"
        />
      </div>
      {/* 대학명 */}
      <div className="flex flex-col items-center gap-0.5">
        <p className="text-neutral-800 text-base font-bold">{university.name}</p>
        <p className="text-neutral-500 text-sm">{university.region}</p>
      </div>
    </motion.a>
  );
}
