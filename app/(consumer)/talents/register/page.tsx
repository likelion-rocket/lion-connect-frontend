"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import IntroComponent from "@/app/(consumer)/talents/register/components/IntroComponent";
import CodeRegisterComponent from "@/app/(consumer)/talents/register/components/CodeRegisterComponent";
import ProfileComponent from "./components/ProfileComponent";
import PortfolioComponent from "./components/PortfolioComponent";
import LinkRegisterComponent from "./components/LinkComponent";
import EducationComponent from "./components/EducationComponent";
import CareerComponent from "./components/CareerComponent";
import SkillComponent from "./components/SkillComponent";

export default function RegisterTalent() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="w-full text-black border-b border-border-quaternary mt-8">
      {/* Header와 동일한 마진/패딩 구조 */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* 왼쪽 영역: 이전 페이지 */}
        <button
          onClick={handleGoBack}
          className="flex items-center gap-1 hover:opacity-80 transition"
        >
          <Image src="/icons/outline-cheveron-left.svg" alt="back" width={24} height={24} />
          <span className="text-lg font-bold text-black">이전 페이지</span>
        </button>

        {/* ✅ 가운데 영역: 인재 등록 페이지 */}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-black">
          인재 등록 페이지
        </h1>

        {/* 오른쪽 영역: 임시 저장 + 작성 완료 */}
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-full bg-[#FF6000] text-white text-sm font-semibold border border-border-quaternary">
            작성 완료
          </button>
        </div>
      </div>

      <main className="py-8 flex flex-col gap-10 mx-40">
        {/* 인적 사항 섹션 */}
        <IntroComponent />
        <CodeRegisterComponent />
        <ProfileComponent />
        <EducationComponent />
        <CareerComponent />
        <SkillComponent />
        <LinkRegisterComponent />
        <PortfolioComponent />
      </main>
    </div>
  );
}
