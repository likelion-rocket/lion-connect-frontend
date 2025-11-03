"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

import IntroComponent from "@/app/(consumer)/talents/register/components/IntroComponent";
import CodeRegisterComponent from "@/app/(consumer)/talents/register/components/CodeRegisterComponent";
import ProfileComponent from "./components/ProfileComponent";
import PortfolioComponent from "./components/PortfolioComponent";
import LinkRegisterComponent from "./components/LinkComponent";
import EducationComponent from "./components/EducationComponent";
import CareerComponent from "./components/CareerComponent";
import SkillComponent from "./components/SkillComponent";
import QualificationComponent from "./components/QualificationComponent";
import TendencyComponent from "./components/TendencyComponent";
import PhotoComponent from "./components/PhotoComponent";

export default function RegisterTalent() {
  const router = useRouter();

  // ✅ 여기서 3가지를 다 모아놓는다
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [portfolioFile, setPortfolioFile] = useState("");

  const handleGoBack = () => {
    router.back();
  };

  // ✅ 3개가 다 채워졌을 때만 버튼 활성화
  const isComplete =
    name.trim().length > 0 && intro.trim().length > 0 && portfolioFile.trim().length > 0;

  return (
    <div className="w-full text-black border-b border-border-quaternary mt-8">
      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* 왼쪽: 이전 페이지 */}
        <button
          onClick={handleGoBack}
          className="flex items-center gap-1 hover:opacity-80 transition"
        >
          <Image src="/icons/outline-cheveron-left.svg" alt="back" width={24} height={24} />
          <span className="text-lg font-bold text-black">이전 페이지</span>
        </button>

        {/* 가운데 제목 */}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-black">
          인재 등록 페이지
        </h1>

        {/* 오른쪽: 작성 완료 */}
        <div className="flex items-center gap-3">
          <button
            disabled={!isComplete}
            className={`px-4 py-2 rounded-md text-sm font-semibold border border-border-quaternary transition
              ${
                isComplete
                  ? "bg-[#FF6000] text-white hover:opacity-90"
                  : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
              }`}
          >
            작성 완료
          </button>
        </div>
      </div>

      {/* 본문 */}
      <main className="py-8 flex flex-col gap-10 mx-40">
        {/* ✅ 이름 입력값을 위로 올린다 */}
        <IntroComponent onNameChange={setName} />

        <PhotoComponent />
        <CodeRegisterComponent />
        {/* ✅ 간단 소개도 위로 올린다 */}
        <ProfileComponent onIntroChange={setIntro} />
        <TendencyComponent />
        <EducationComponent />
        <CareerComponent />
        <SkillComponent />
        <QualificationComponent />
        <LinkRegisterComponent />

        {/* ✅ 포트폴리오 파일명도 위로 올린다 */}
        <PortfolioComponent onFileSelect={setPortfolioFile} />
      </main>
    </div>
  );
}
