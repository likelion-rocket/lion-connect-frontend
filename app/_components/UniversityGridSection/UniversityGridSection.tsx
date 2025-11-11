"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UNIVERSITY_REGION_GROUPS,
  LIKELION_UNIVERSITIES,
  getUniversitiesByRegionGroup,
} from "@/constants/universities";
import CTAButton from "@/components/buttons/CTAButton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import UniversityCard from "./UniversityCard";
import RegionFilterButton from "./RegionFilterButton";

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
          <motion.div
            layout
            className={`w-full flex flex-wrap justify-center gap-x-8 gap-y-12 ${
              !showAll && hasMore ? "max-h-[600px] overflow-hidden" : ""
            }`}
          >
            <AnimatePresence mode="popLayout">
              {displayedUniversities.map((university) => (
                <motion.div
                  key={university.id}
                  layout
                  style={{ width: "120px" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <UniversityCard university={university} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* 더보기 버튼 */}
          {hasMore && !showAll && (
            <div className="w-full h-56 absolute bottom-0 left-0 bg-linear-to-b from-white/0 to-white flex justify-center items-end pb-8">
              <CTAButton onClick={() => setShowAll(true)}>더보기</CTAButton>
            </div>
          )}
        </div>

        {/* 접기 버튼 */}
        {showAll && (
          <button
            onClick={() => setShowAll(false)}
            className=" hover:cursor-pointer px-8 py-3 bg-white border-2 border-orange-600 rounded-full text-orange-600 text-base font-bold hover:bg-orange-50 transition-colors flex items-center gap-2"
          >
            접기
            <Image
              src="/icons/chevron-down-orange.svg"
              alt="접기"
              width={12}
              height={8}
              className="transform rotate-180"
            />
          </button>
        )}
      </div>
    </section>
  );
}
