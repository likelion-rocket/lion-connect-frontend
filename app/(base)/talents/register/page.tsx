// app/(base)/talents/register/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useTransition } from "react";

import IntroComponent from "./_components/IntroComponent";
import CodeRegisterComponent from "./_components/CodeRegisterComponent";
import ProfileComponent from "./_components/ProfileComponent";
import PortfolioComponent from "./_components/PortfolioComponent";
import LinkRegisterComponent from "./_components/LinkComponent";
import EducationComponent from "./_components/EducationComponent";
import CareerComponent from "./_components/CareerComponent";
import SkillComponent from "./_components/SkillComponent";
import QualificationComponent from "./_components/QualificationComponent";
import TendencyComponent from "./_components/TendencyComponent";
import PhotoComponent from "./_components/PhotoComponent";

import { useEducationSection } from "@/hooks/useEducationSection";
import { createEducation } from "@/lib/api/educations";
import { ApiError } from "@/lib/apiClient";

export default function RegisterTalent() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  // 상단 3개
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [portfolioFile, setPortfolioFile] = useState("");

  // ✅ 학력 섹션 훅
  const edu = useEducationSection();

  const handleGoBack = () => router.back();

  const isComplete =
    name.trim().length > 0 && intro.trim().length > 0 && portfolioFile.trim().length > 0;

  const handleSubmitAll = async (): Promise<void> => {
    try {
      startTransition(() => {});
      const built = edu.validateAndBuild();

      if (built === null) return; // 에러 → 화면에 표시됨
      if (built.shouldSubmit) {
        const res = await createEducation(built.payload);
        console.log(`[학력] 등록 완료 id=${res.id}`);
      } else {
        console.log("[학력] 입력 없음 → 스킵");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        console.log(`${err.message}${err.statusCode ? ` (code ${err.statusCode})` : ""}`);
      } else if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="w-full text-black mt-8">
      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-1 hover:opacity-80 transition"
        >
          <Image src="/icons/outline-cheveron-left.svg" alt="back" width={24} height={24} />
          <span className="text-lg font-bold text-black">이전 페이지</span>
        </button>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-black">
          인재 등록 페이지
        </h1>

        <div className="flex items-center gap-3">
          <button
            disabled={!isComplete || pending}
            onClick={handleSubmitAll}
            className={`px-4 py-2 rounded-md text-sm font-semibold border border-border-quaternary transition
              ${
                isComplete && !pending
                  ? "bg-[#FF6000] text-white hover:opacity-90"
                  : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"
              }`}
          >
            {pending ? "작성 중..." : "작성 완료"}
          </button>
        </div>
      </div>

      {/* 본문 */}
      <main className="py-8 flex flex-col gap-10 mx-40">
        <IntroComponent onNameChange={setName} />
        <PhotoComponent />
        <CodeRegisterComponent />
        <ProfileComponent onIntroChange={setIntro} />
        <TendencyComponent />

        <EducationComponent
          schoolName={edu.form.schoolName}
          onChangeSchoolName={edu.onChangeSchoolName}
          periodText={edu.form.periodText}
          onChangePeriodText={edu.onChangePeriodText}
          status={edu.form.status}
          onChangeStatus={edu.onChangeStatus}
          major={edu.form.major}
          onChangeMajor={edu.onChangeMajor}
          description={edu.form.description}
          onChangeDescription={edu.onChangeDescription}
          // 에러 전달
          errors={edu.errors}
        />

        <CareerComponent />
        <SkillComponent />
        <QualificationComponent />
        <LinkRegisterComponent />
        <PortfolioComponent onFileSelect={setPortfolioFile} />
      </main>
    </div>
  );
}
