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
import { useMyEducations } from "@/hooks/useMyEducation";
import { createProfile, updateMyProfile, type ProfileRequest } from "@/lib/api/profiles";
import { ApiError } from "@/lib/apiClient";
import { enumToKo } from "@/lib/education/statusMap";

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

  // 내 프로필 / 학력 호출
  const { data: myProfile } = useMyProfile();
  const { data: myEducations } = useMyEducations(); // ✅ 추가

  // ===== 프로필 프리필 =====
  const setNameSafe = (v: string) => setName((prev) => (prev === v ? prev : v));
  const setIntroSafe = (v: string) => setIntro((prev) => (prev === v ? prev : v));
  const setPortfolioFileSafe = (v: string) => setPortfolioFile((prev) => (prev === v ? prev : v));
  const setLikelionCodeSafe = (v: string) => setLikelionCode((prev) => (prev === v ? prev : v));

  const prefilledProfileRef = useRef(false);
  useEffect(() => {
    if (!myProfile) return;
    if (prefilledProfileRef.current) return;

    if (!name.trim()) setNameSafe(myProfile.name ?? "");
    if (!intro.trim()) setIntroSafe(myProfile.introduction ?? "");
    if (!portfolioFile.trim()) setPortfolioFileSafe(myProfile.storageUrl ?? "");
    if (!likelionCode.trim()) setLikelionCodeSafe(myProfile.likelionCode ?? "");

    prefilledProfileRef.current = true;
  }); // 의도적으로 state deps 제외

  // ===== 학력 프리필 =====
  // YYYY-MM-DD -> YYYY.MM 로 바꾸는 헬퍼
  const fmtYM = (d?: string | null) => {
    if (!d) return "";
    // d: "YYYY-MM-DD"
    const [y, m] = d.split("-");
    if (!y || !m) return "";
    return `${y}.${m}`;
  };

  const prefilledEduRef = useRef(false);
  useEffect(() => {
    if (!myEducations || myEducations.length === 0) return; // 학력 없음 → 스킵
    if (prefilledEduRef.current) return;

    // 가장 최근(업데이트 최신) 항목 하나 선택
    const sorted = [...myEducations].sort((a, b) =>
      (b.updatedAt || "").localeCompare(a.updatedAt || "")
    );
    const e = sorted[0];

    // 현재 폼 값이 비어있는 항목만 채움 (사용자 입력 보호)
    const next = { ...edu.form };

    if (!next.schoolName.trim()) next.schoolName = e.schoolName ?? "";
    if (!next.status.trim()) next.status = enumToKo(e.status) || ""; // ✅ 한글로 표시
    if (!next.major.trim()) next.major = e.major ?? "";
    if (!next.description.trim()) next.description = e.description ?? "";

    if (!next.periodText.trim()) {
      const s = fmtYM(e.startDate);
      const t = fmtYM(e.endDate);
      // endDate 없으면 오른쪽 비워둠
      next.periodText = s || t ? `${s} - ${t}` : "";
    }

    // 실제 반영 (변경 없으면 no-op)
    if (
      next.schoolName !== edu.form.schoolName ||
      next.status !== edu.form.status ||
      next.major !== edu.form.major ||
      next.description !== edu.form.description ||
      next.periodText !== edu.form.periodText
    ) {
      edu.setForm(next);
    }

    prefilledEduRef.current = true;
  }); // edu.form을 deps에 넣지 않음(1회 프리필 보장)

  const handleGoBack = () => router.back();

  const isComplete =
    name.trim().length > 0 && intro.trim().length > 0 && portfolioFile.trim().length > 0;

  const handleSubmitAll = async (): Promise<void> => {
    try {
      startTransition(() => {});
      const payload: ProfileRequest = {
        name: name.trim(),
        introduction: intro.trim(),
        storageUrl: portfolioFile.trim(),
        ...(likelionCode.trim() ? { likelionCode: likelionCode.trim() } : {}),
      };

      const hasExistingProfile =
        !!myProfile &&
        !!(
          myProfile.name ||
          myProfile.introduction ||
          myProfile.storageUrl ||
          myProfile.likelionCode
        );

      if (hasExistingProfile) {
        const updated = await updateMyProfile(payload);
        console.log(`[프로필] 수정 완료 id=${updated.id}`);
      } else {
        const created = await createProfile(payload);
        console.log(`[프로필] 등록 완료 id=${created.id}`);
      }

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
