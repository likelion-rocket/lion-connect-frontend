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
import { createEducation, updateEducation } from "@/lib/api/educations";
import { useMyProfile } from "@/hooks/useMyProfile";
import { useMyEducations } from "@/hooks/useMyEducation";
import { createProfile, updateMyProfile, type ProfileRequest } from "@/lib/api/profiles";
import { ApiError } from "@/lib/apiClient";
import { enumToKo } from "@/lib/education/statusMap";
import { useUpdateTendencies } from "@/hooks/useUpdateTendencies";
import { useCareerSection } from "@/hooks/useCareerSection";
import { createExperience, updateExperience } from "@/lib/api/experiences";
import { useMyExperiences } from "@/hooks/useMyExperiences";
import type { CompanyForm } from "@/hooks/useCareerSection";
// 상단 import 목록에 추가
import { parseYYYYMMRange } from "@/lib/date/ym";

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
  const career = useCareerSection(); // ✅ 경력 훅

  // 내 프로필 / 학력 호출
  const { data: myProfile } = useMyProfile();
  const { data: myEducations, refetch: refetchEducations } = useMyEducations();
  // ✅ effect 밖에서 setter만 뽑기 (객체 전체가 아니라 함수만)
  const { setForm } = edu;

  // ===== 프로필 프리필 =====
  const setNameSafe = (v: string) => setName((prev) => (prev === v ? prev : v));
  const setIntroSafe = (v: string) => setIntro((prev) => (prev === v ? prev : v));
  const setPortfolioFileSafe = (v: string) => setPortfolioFile((prev) => (prev === v ? prev : v));
  const setLikelionCodeSafe = (v: string) => setLikelionCode((prev) => (prev === v ? prev : v));
  // 컴포넌트 내부
  const [tendencyIds, setTendencyIds] = useState<number[]>([]);
  const updateTendencies = useUpdateTendencies();

  // 추가
  const [currentEduId, setCurrentEduId] = useState<number | null>(null);

  // ✅ 내 경력 불러오기
  const { data: myExperiences, refetch: refetchExperiences } = useMyExperiences();

  // ✅ 프리필한 각 행의 DB id를 인덱스에 맞춰 저장
  const [experienceIds, setExperienceIds] = useState<number[]>([]);

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

  // ===== 학력 프리필 ===== (기존 effect 안에서 id도 같이 세팅)
  const prefilledEduRef = useRef(false);
  useEffect(() => {
    if (!myEducations || myEducations.length === 0) return;
    if (prefilledEduRef.current) return;

    // 최신(업데이트 최신) 하나 선택
    const sorted = [...myEducations].sort((a, b) =>
      (b.updatedAt || "").localeCompare(a.updatedAt || "")
    );
    const e = sorted[0];

    // 삭제/수정 대상 id 저장
    setCurrentEduId(e.id);

    // ✅ prev를 사용해 변경이 필요한 필드만 채우기
    setForm((prev) => {
      const next = { ...prev };

      if (!prev.schoolName.trim()) next.schoolName = e.schoolName ?? "";
      if (!prev.status.trim()) next.status = enumToKo(e.status) || "";
      if (!prev.major.trim()) next.major = e.major ?? "";
      if (!prev.description.trim()) next.description = e.description ?? "";

      if (!prev.periodText.trim()) {
        const s = fmtYM(e.startDate);
        const t = fmtYM(e.endDate);
        next.periodText = s || t ? `${s} - ${t}` : "";
      }

      // 변경이 없으면 prev 그대로 반환 (불필요 렌더 방지)
      const changed =
        next.schoolName !== prev.schoolName ||
        next.status !== prev.status ||
        next.major !== prev.major ||
        next.description !== prev.description ||
        next.periodText !== prev.periodText;

      // 이 ref는 deps에 안 걸리므로 여기서 셋업해도 OK
      prefilledEduRef.current = true;

      return changed ? next : prev;
    });
  }, [myEducations, setForm]); // ✅ 더 이상 'edu'가 필요 없음

  // ===== 경력 프리필 =====
  const prefilledCareerRef = useRef(false);
  useEffect(() => {
    if (!myExperiences) return;
    if (prefilledCareerRef.current) return;

    if (myExperiences.length === 0) {
      prefilledCareerRef.current = true;
      return;
    }

    // 서버 응답 → UI 폼으로 매핑
    const rows: CompanyForm[] = myExperiences.map((e) => {
      const start = fmtYM(e.startDate);
      const end = e.isCurrent || !e.endDate ? "현재" : fmtYM(e.endDate);
      const period = start ? `${start} - ${end}` : "";

      return {
        company: e.companyName ?? "",
        period,
        dept: e.department ?? "",
        role: e.position ?? "",
        desc: e.description ?? "",
      };
    });

    career.setCompanies(rows);
    career.setErrors(new Array(rows.length).fill({})); // 에러 초기화
    setExperienceIds(myExperiences.map((e) => e.id)); // ✅ 인덱스 매칭용 id 저장
    prefilledCareerRef.current = true;
  }, [myExperiences, career]);

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

      const coreFilled =
        edu.form.schoolName.trim() &&
        edu.form.periodText.trim() &&
        edu.form.status.trim() &&
        edu.form.major.trim();

      const coreEmpty =
        !edu.form.schoolName.trim() &&
        !edu.form.periodText.trim() &&
        !edu.form.status.trim() &&
        !edu.form.major.trim() &&
        !edu.form.description.trim();

      const built = edu.validateAndBuild();

      const existingEduId = currentEduId ?? undefined;

      if (coreFilled && existingEduId && built && "shouldSubmit" in built && built.shouldSubmit) {
        // ✅ 모두 채워져 있고 기존 학력이 있으면 수정(put)
        const res = await updateEducation(existingEduId, built.payload);
        console.log(`[학력] 수정 완료 id=${res.id}`);
      } else if (coreEmpty) {
        // ✅ 전부 빈칸이면 생성(post) — 서버가 허용하지 않으면 무시됨
        // 안전장치: build 실패(날짜 파싱 등)면 넘기지 않음
        if (built && "shouldSubmit" in built && built.shouldSubmit) {
          const res = await createEducation(built.payload);
          console.log(`[학력] 등록 완료 id=${res.id}`);
        } else {
          console.log("[학력] 전부 빈칸 + 유효 payload 없음 → 생성 스킵");
        }
      } else if (built && "shouldSubmit" in built && built.shouldSubmit) {
        // 그 외 케이스: 기존 로직대로 입력이 있으면 생성(post)
        const res = await createEducation(built.payload);
        console.log(`[학력] 등록 완료 id=${res.id}`);
      } else {
        console.log("[학력] 입력 없음 → 스킵");
      }

      // 3) 성향 PUT: 선택이 없어도 []로 자연스레 갱신
      await updateTendencies.mutateAsync({ ids: tendencyIds });
      console.log("[성향] 갱신 완료", tendencyIds);

      // 4) 경력 처리 (PUT/POST 분기)
      // ✅ unused-var 경고 제거: 변수에 담지 않고 호출만 하여 에러 세팅 트리거
      career.validateAndBuild();

      // 인덱스 기준으로 각 행을 검사
      for (let i = 0; i < career.companies.length; i += 1) {
        const row = career.companies[i];

        // 완전 빈 행은 스킵
        const hasAny =
          row.company.trim() ||
          row.period.trim() ||
          row.dept.trim() ||
          row.role.trim() ||
          row.desc.trim();
        if (!hasAny) continue;

        // 에러가 있는 행은 스킵 (실제 에러 메시지가 있는 경우에만)
        const rowErr = career.errors?.[i];
        const hasRealError =
          !!rowErr && Object.values(rowErr).some((v) => typeof v === "string" && v.length > 0);
        if (hasRealError) {
          console.log(`[경력] ${i}번 행 유효성 오류 → 스킵`, rowErr);
          continue;
        }

        // 기간 파싱 (월 단위)
        const parsed = parseYYYYMMRange(row.period);
        if (!parsed) {
          console.log(`[경력] ${i}번 행 기간 파싱 실패 → 스킵`);
          continue;
        }

        // API payload
        const payload = {
          companyName: row.company.trim(),
          department: row.dept.trim() || undefined,
          position: row.role.trim(),
          startDate: parsed.startDate, // YYYY-MM-01
          endDate: parsed.endDate ?? null, // 현재/재직이면 null
          isCurrent: parsed.endDate === undefined,
          description: row.desc.trim() || undefined,
        } as const;

        const id = experienceIds[i];

        if (id) {
          // ✅ 기존 행이면 수정(put)
          const res = await updateExperience(id, payload);
          console.log(`[경력] 수정 완료 id=${res.id}`);
        } else {
          // ✅ 신규 행이면 생성(post)
          const res = await createExperience(payload);
          console.log(`[경력] 등록 완료 id=${res.id}`);
        }
      }

      // ✅ 경력 저장 이후: 목록 재조회 → 폼/ids 재프리필 (한 번만)
      prefilledCareerRef.current = false;
      await refetchExperiences();
      console.log("[경력] 서버 데이터 재조회 완료");
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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items_center justify-between">
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
        <TendencyComponent onChangeSelectedIds={setTendencyIds} />

        <EducationComponent
          educationId={currentEduId}
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
          onDeleted={() => {
            // ✅ 삭제 후: 선택 id 초기화 + 프리필 허용 + 서버 목록 새로고침
            setCurrentEduId(null);
            prefilledEduRef.current = false;
            refetchEducations();
          }}
          errors={edu.errors}
        />

        <CareerComponent
          companies={career.companies}
          errors={career.errors}
          hasAnyValue={career.hasAnyValue}
          onChange={career.onChange}
          onAdd={career.addCompany}
          onClear={career.clearCompany}
        />
        <SkillComponent />
        <QualificationComponent />
        <LinkRegisterComponent />
        <PortfolioComponent fileName={portfolioFile} onFileSelect={setPortfolioFileSafe} />
      </main>
    </div>
  );
}
