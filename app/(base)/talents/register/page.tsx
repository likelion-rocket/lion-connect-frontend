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

import { buildEducationPayload } from "@/lib/forms/buildEducation";
import { createEducation } from "@/lib/api/educations";
import { ApiError } from "@/lib/apiClient";

export default function RegisterTalent() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  // 상단 3개
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [portfolioFile, setPortfolioFile] = useState("");

  // 학력 폼 상태
  const [eduSchoolName, setEduSchoolName] = useState("");
  const [eduPeriodText, setEduPeriodText] = useState("");
  const [eduStatus, setEduStatus] = useState("");
  const [eduMajor, setEduMajor] = useState("");
  const [eduDescription, setEduDescription] = useState("");

  // page.tsx
  const [eduErrors, setEduErrors] = useState<{
    schoolName?: string;
    periodText?: string;
    status?: string;
    major?: string;
    // description은 선택값으로 둘게요(원하면 이것도 필수로 바꿔줄 수 있어요)
  }>({});

  const handleGoBack = () => router.back();

  const isComplete =
    name.trim().length > 0 && intro.trim().length > 0 && portfolioFile.trim().length > 0;

  // 간단 검증 헬퍼
  const validateEducation = () => {
    const errors: {
      schoolName?: string;
      periodText?: string;
      status?: string;
      major?: string;
      description?: string;
    } = {};

    const anyInput =
      !!eduSchoolName.trim() ||
      !!eduPeriodText.trim() ||
      !!eduStatus.trim() ||
      !!eduMajor.trim() ||
      !!eduDescription.trim();

    if (!anyInput) {
      // 입력 없음 → 에러 없음
      return errors;
    }

    if (!eduSchoolName.trim()) {
      errors.schoolName = "학교명을 입력해주세요.";
    }

    if (eduPeriodText.trim()) {
      const ok = /^\s*\d{4}\.\d{2}\s*-\s*\d{4}\.\d{2}\s*$/.test(eduPeriodText);
      if (!ok) {
        errors.periodText = "재학 기간은 'YYYY.MM - YYYY.MM' 형식으로 입력해주세요.";
      }
    }

    if (!eduPeriodText.trim()) {
      errors.periodText = "재학 날짜를 입력해주세요.";
    }

    // 필수값: 졸업 여부(status)
    if (!eduStatus.trim()) {
      errors.status = "졸업 상태를 입력해주세요.";
    }

    // 필수값: 전공(major)
    if (!eduMajor.trim()) {
      errors.major = "전공을 입력해주세요.";
    }
    if (!eduDescription.trim()) {
      errors.description = "활동 내용을 입력해주세요.";
    }

    return errors;
  };

  const handleSubmitAll = async (): Promise<void> => {
    try {
      startTransition(() => {});

      // ✅ 1) 에러 계산
      const errors = validateEducation();
      setEduErrors(errors);

      // 에러가 있으면 제출 중단
      if (Object.keys(errors).length > 0) return;

      // ✅ 2) 선택 섹션 빌더로 payload 생성/스킵 판단
      const eduResult = buildEducationPayload({
        schoolName: eduSchoolName,
        periodText: eduPeriodText,
        status: eduStatus,
        major: eduMajor,
        description: eduDescription,
      });

      if (eduResult.shouldSubmit) {
        const res = await createEducation(eduResult.payload);
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

  // ✅ 인풋 변경 시 해당 에러 즉시 제거
  const onSchoolName = (v: string) => {
    setEduSchoolName(v);
    if (eduErrors.schoolName) setEduErrors((e) => ({ ...e, schoolName: undefined }));
  };
  const onPeriodText = (v: string) => {
    setEduPeriodText(v);
    if (eduErrors.periodText) setEduErrors((e) => ({ ...e, periodText: undefined }));
  };
  const onStatus = (v: string) => {
    setEduStatus(v);
    if (eduErrors.status) setEduErrors((e) => ({ ...e, status: undefined }));
  };
  const onMajor = (v: string) => {
    setEduMajor(v);
    if (eduErrors.major) setEduErrors((e) => ({ ...e, major: undefined }));
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
          schoolName={eduSchoolName}
          onChangeSchoolName={onSchoolName}
          periodText={eduPeriodText}
          onChangePeriodText={onPeriodText}
          status={eduStatus}
          onChangeStatus={onStatus}
          major={eduMajor}
          onChangeMajor={onMajor}
          description={eduDescription}
          onChangeDescription={setEduDescription}
          errors={eduErrors}
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
