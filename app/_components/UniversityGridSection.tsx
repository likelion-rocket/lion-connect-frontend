"use client";

import Image from "next/image";
import { useState } from "react";
import {
  UNIVERSITY_REGION_GROUPS,
  getUniversitiesByRegionGroup,
  type University,
} from "@/constants/universities";
import CTAButton from "@/components/buttons/CTAButton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * UniversityCard Component
 * 개별 대학교 카드를 표시하는 컴포넌트
 */
type UniversityCardProps = {
  university: University;
  index: number;
};

function UniversityCard({ university, index }: UniversityCardProps) {
  const { ref: cardRef, isVisible } = useScrollAnimation<HTMLAnchorElement>({ threshold: 0.1 });

  return (
    <a
      href={university.link}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef}
      className={`flex flex-col items-center gap-3 transition-all duration-700 ease-out cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
      }`}
      style={{
        transitionDelay: `${Math.min(index * 50, 500)}ms`, // 최대 500ms까지만 지연
      }}
    >
      {/* 대학 로고 */}
      <div
        className={`w-24 h-24 relative rounded-full overflow-hidden shadow-md transition-transform duration-300 hover:scale-110 hover:shadow-lg ${
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
    </a>
  );
}

/**
 * RegionFilterButton Component
 * 지역 필터 버튼 컴포넌트
 */
type RegionFilterButtonProps = {
  region: string;
  isActive: boolean;
  onClick: () => void;
};

function RegionFilterButton({ region, isActive, onClick }: RegionFilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2.5 rounded-full text-base font-bold transition-colors ${
        isActive
          ? "bg-orange-600 text-white"
          : "bg-white text-orange-600 border-2 border-orange-600 hover:bg-orange-50"
      }`}
    >
      {region}
    </button>
  );
}

/**
 * UniversityGridSection Component
 *
 * @description
 * 멋쟁이사자처럼 활동 대학교 목록을 그리드 형태로 보여주는 섹션입니다.
 * 지역별 필터링과 더보기 기능을 제공합니다.
 *
 * @example
 * <UniversityGridSection />
 */
export default function UniversityGridSection() {
  const [selectedRegion, setSelectedRegion] = useState<string>("전체");
  const [showAll, setShowAll] = useState(false);

  const { ref: headerRef, isVisible: isHeaderVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
  });
  const { ref: filterRef, isVisible: isFilterVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
  });

  // 지역 그룹 목록 (전체, 서울, 경기·인천, 경상, 충청, 전라)
  const regions = UNIVERSITY_REGION_GROUPS;

  // 선택된 지역 그룹에 따라 대학교 필터링
  const filteredUniversities = getUniversitiesByRegionGroup(selectedRegion);

  // 더보기 버튼 상태에 따라 표시할 대학교 결정
  const displayedUniversities = showAll ? filteredUniversities : filteredUniversities.slice(0, 28);

  // 더보기 버튼 표시 여부
  const hasMore = filteredUniversities.length > 28;

  return (
    <section className="w-full min-w-[1444px] py-28 bg-white flex justify-center items-start">
      <div className="w-full max-w-[1280px] px-20 flex flex-col justify-start items-center gap-16">
        {/* Header Section - 페이드인 + 슬라이드업 */}
        <div ref={headerRef} className="flex flex-col justify-start items-center gap-4">
          <h2
            className={`text-orange-600 text-5xl font-bold leading-[60px] transition-all duration-1000 ease-out ${
              isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            멋쟁이사자처럼 활동 대학
          </h2>
          <p
            className={`text-neutral-800 text-lg font-normal leading-7 transition-all duration-1000 ease-out ${
              isHeaderVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            멋쟁이사자처럼 동아리가 있는 대학들을 소개합니다.
          </p>
        </div>

        {/* Region Filter Buttons - 순차적 페이드인 */}
        <div ref={filterRef} className="flex justify-center items-center gap-3 flex-wrap">
          {regions.map((region, index) => (
            <div
              key={region}
              className={`transition-all duration-700 ease-out ${
                isFilterVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <RegionFilterButton
                region={region}
                isActive={selectedRegion === region}
                onClick={() => {
                  setSelectedRegion(region);
                  setShowAll(false); // 지역 변경 시 더보기 초기화
                }}
              />
            </div>
          ))}
        </div>

        {/* University Grid Container */}
        <div className="w-full relative">
          {/* University Grid - 마지막 줄 가운데 정렬을 위해 flex wrap 사용 */}
          <div
            className={`w-full flex flex-wrap justify-center gap-x-8 gap-y-12 transition-all duration-700 ease-in-out ${
              !showAll && hasMore ? "max-h-[600px] overflow-hidden" : ""
            }`}
          >
            {displayedUniversities.map((university, index) => (
              <div key={university.id} style={{ width: "120px" }}>
                <UniversityCard university={university} index={index} />
              </div>
            ))}
          </div>

          {/* Gradient Overlay + More Button */}
          {hasMore && !showAll && (
            <div className="w-full h-56 absolute bottom-0 left-0 bg-linear-to-b from-white/0 to-white pointer-events-none flex justify-center items-center">
              <div className="pointer-events-auto pt-20">
                <CTAButton onClick={() => setShowAll(true)}>더보기</CTAButton>
              </div>
            </div>
          )}
        </div>

        {/* Show Less Button */}
        {showAll && (
          <button
            onClick={() => setShowAll(false)}
            className="px-8 py-3 bg-white border-2 border-orange-600 rounded-full text-orange-600 text-base font-bold hover:bg-orange-50 transition-colors flex items-center gap-2"
          >
            접기
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              className="transform rotate-180"
            >
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}
