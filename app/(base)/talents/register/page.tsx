// app/(base)/talents/register/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";

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
import { useMyProfile } from "@/hooks/useMyProfile";
import { createProfile } from "@/lib/api/profiles";
import { ApiError } from "@/lib/apiClient";

export default function RegisterTalent() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  // 상단 3개 + 인재 코드
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [portfolioFile, setPortfolioFile] = useState("");
  const [likelionCode, setLikelionCode] = useState("");

  // 학력 섹션 훅
  const edu = useEducationSection();

  // 내 프로필 호출 (로그인 안되면 내부에서 호출 X)
  const { data: myProfile } = useMyProfile();

  // ✅ 같은 값이면 state를 갱신하지 않는 no-op setter
  const setNameSafe = (v: string) => setName((prev) => (prev === v ? prev : v));
  const setIntroSafe = (v: string) => setIntro((prev) => (prev === v ? prev : v));
  const setPortfolioFileSafe = (v: string) => setPortfolioFile((prev) => (prev === v ? prev : v));
  const setLikelionCodeSafe = (v: string) => setLikelionCode((prev) => (prev === v ? prev : v));

  // ✅ 프리필은 계정별 1회만 수행
  const prefilledRef = useRef(false);
  useEffect(() => {
    if (!myProfile) return;
    if (prefilledRef.current) return; // 이미 프리필 했으면 스킵

    // 비어있는 필드만 채우기 + 동일값이면 no-op setter가 막아줌
    if (!name.trim()) setNameSafe(myProfile.name ?? "");
    if (!intro.trim()) setIntroSafe(myProfile.introduction ?? "");
    if (!portfolioFile.trim()) setPortfolioFileSafe(myProfile.storageUrl ?? "");
    if (!likelionCode.trim()) setLikelionCodeSafe(myProfile.likelionCode ?? "");

    prefilledRef.current = true;
  }); // 의도적으로 state deps 미포함(1회 프리필)

  const handleGoBack = () => router.back();

  const isComplete =
    name.trim().length > 0 && intro.trim().length > 0 && portfolioFile.trim().length > 0;

  const handleSubmitAll = async (): Promise<void> => {
    try {
      startTransition(() => {});
      const payload = {
        name: name.trim(),
        introduction: intro.trim(),
        storageUrl: portfolioFile.trim(),
        ...(likelionCode.trim() ? { likelionCode: likelionCode.trim() } : {}),
      };

      const profileRes = await createProfile(payload);
      console.log(`[프로필] 등록 완료 id=${profileRes.id}`);

      const built = edu.validateAndBuild();
      if (built !== null && built.shouldSubmit) {
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
              ${isComplete && !pending ? "bg-[#FF6000] text-white hover:opacity-90" : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"}`}
          >
            {pending ? "작성 중..." : "작성 완료"}
          </button>
        </div>
      </div>

      {/* 본문 */}
      <main className="py-8 flex flex-col gap-10 mx-40">
        {/* 자식에 "값 + 변경함수" 전달 (UI 그대로) */}
        <IntroComponent name={name} onNameChange={setNameSafe} />
        <PhotoComponent />
        <CodeRegisterComponent code={likelionCode} onCodeChange={setLikelionCodeSafe} />
        <ProfileComponent intro={intro} onIntroChange={setIntroSafe} />
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
          errors={edu.errors}
        />

        <CareerComponent />
        <SkillComponent />
        <QualificationComponent />
        <LinkRegisterComponent />
        <PortfolioComponent fileName={portfolioFile} onFileSelect={setPortfolioFileSafe} />
      </main>
    </div>
  );
}
