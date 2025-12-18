"use client";

import Link from "next/link";
import Image from "next/image";
import IntroduceCard from "./_components/IntroduceCard";
import ResumeCard from "./_components/ResumeCard";
import PortfolioCard from "./_components/PortfolioCard";
import { useTalentDetail } from "@/hooks/talent/queries/useTalentDetail";
import { useParams } from "next/navigation";
import { mapTalentDataToComponents } from "./_utils/mapTalentData";

export default function TalentDetailPage() {
  const params = useParams();
  const profileId = params.talentId as string;

  const { data: talentData, isLoading, error } = useTalentDetail({ profileId });

  if (isLoading) {
    return (
      <div className="w-full text-black mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center justify-center">
          <p className="text-lg text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    const errorMessage = (error as Error)?.message || "데이터를 불러오는 중 오류가 발생했습니다.";
    return (
      <div className="w-full text-black mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center justify-center">
          <p className="text-lg text-red-500">{errorMessage}</p>
        </div>
      </div>
    );
  }

  if (!talentData) {
    return (
      <div className="w-full text-black mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center justify-center">
          <p className="text-lg text-gray-500">데이터를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const { introduceCardProps, resumeCardProps, portfolioCardProps } =
    mapTalentDataToComponents(talentData);

  return (
    <div className="w-full text-black mt-8">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* 왼쪽: 이전 페이지 (Link 사용) */}
        <Link href="/talents" className="flex items-center gap-1 hover:opacity-80 transition">
          <Image src="/icons/outline-cheveron-left.svg" alt="back" width={24} height={24} />
          <span className="text-lg font-bold text-black">이전 페이지</span>
        </Link>

        {/* 가운데 제목 */}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-black">
          인재 상세 페이지
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* 🔥 여기서만 간단 소개 숨기기 */}
        <IntroduceCard {...introduceCardProps} showSummary={false} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <ResumeCard {...resumeCardProps} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <PortfolioCard {...portfolioCardProps} />
      </div>
    </div>
  );
}
