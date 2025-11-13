// app/(base)/talents/register/page.tsx
"use client";

/* =============================
 *  1. 기본 라이브러리 & Next
 * ============================= */
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";

/* =============================
 *  2. 섹션 컴포넌트
 * ============================= */
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

/* =============================
 *  3. 훅 & API (도메인별)
 * ============================= */
// 학력
import { useEducationSection } from "@/hooks/useEducationSection";
import { createEducation, updateEducation } from "@/lib/api/educations";
import { useMyEducations } from "@/hooks/useMyEducation";
import { enumToKo } from "@/lib/education/statusMap";

// 프로필
import { useMyProfile } from "@/hooks/useMyProfile";
import { createProfile, updateMyProfile, type ProfileRequest } from "@/lib/api/profiles";

// 성향
import { useUpdateTendencies } from "@/hooks/useUpdateTendencies";

// 경력
import { useCareerSection } from "@/hooks/useCareerSection";
import type { CompanyForm } from "@/hooks/useCareerSection";
import { useMyExperiences } from "@/hooks/useMyExperiences";
import { createExperience, updateExperience, deleteExperience } from "@/lib/api/experiences";

// 어학
import { useLanguageSection } from "@/hooks/useLanguageSection";
import { useMyLanguages } from "@/hooks/useMyLanguages";
import { createLanguage, updateLanguage, deleteLanguage } from "@/lib/api/languages";

// 자격증
import { useCertificationSection } from "@/hooks/useCertificationSection";
import { useMyCertifications } from "@/hooks/useMyCertifications";
import {
  createcertification,
  updatecertification,
  deletecertification,
} from "@/lib/api/certifications";

/* =============================
 *  4. 공통 유틸
 * ============================= */
import { ApiError } from "@/lib/apiClient";
import { parseYYYYMMRange } from "@/lib/date/ym";

/* =============================
 *  5. 헬퍼 함수 (컴포넌트 밖)
 * ============================= */

// YYYY-MM-DD -> YYYY.MM
const fmtYM = (d?: string | null) => {
  if (!d) return "";
  const [y, m] = d.split("-");
  if (!y || !m) return "";
  return `${y}.${m}`;
};

// YYYY.MM -> YYYY-MM-01
const toYYYYMM01 = (ym: string) => {
  const m = ym.trim().match(/^(\d{4})\.(0[1-9]|1[0-2])$/);
  if (!m) return "";
  return `${m[1]}-${m[2]}-01`;
};

/* =============================
 *  6. 메인 컴포넌트
 * ============================= */

export default function RegisterTalent() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  /* -----------------------------
   *  6-1. 상단 프로필 기본 정보
   * ----------------------------- */
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [portfolioFile, setPortfolioFile] = useState("");
  const [likelionCode, setLikelionCode] = useState("");

  // 직군 / 직무
  const [jobGroup, setJobGroup] = useState("");
  const [job, setJob] = useState("");

  // 성향
  const [tendencyIds, setTendencyIds] = useState<number[]>([]);
  const updateTendencies = useUpdateTendencies();

  // 안전 set 함수들 (동일값이면 무시)
  const setNameSafe = (v: string) => setName((prev) => (prev === v ? prev : v));
  const setIntroSafe = (v: string) => setIntro((prev) => (prev === v ? prev : v));
  const setPortfolioFileSafe = (v: string) => setPortfolioFile((prev) => (prev === v ? prev : v));
  const setLikelionCodeSafe = (v: string) => setLikelionCode((prev) => (prev === v ? prev : v));

  /* -----------------------------
   *  6-2. 섹션 훅 (폼 상태)
   * ----------------------------- */

  // 학력
  const edu = useEducationSection();
  const { setForm } = edu;

  // 경력
  const career = useCareerSection();

  // 어학
  const lang = useLanguageSection();

  // 자격증
  const cert = useCertificationSection();

  /* -----------------------------
   *  6-3. 서버 데이터 (내 정보 조회)
   * ----------------------------- */

  // 프로필
  const { data: myProfile } = useMyProfile();

  // 학력
  const { data: myEducations, refetch: refetchEducations } = useMyEducations();

  // 경력
  const { data: myExperiences, refetch: refetchExperiences } = useMyExperiences();

  // 어학
  const { data: myLanguages, refetch: refetchLanguages } = useMyLanguages();

  // 자격증
  const { data: myCerts, refetch: refetchCerts } = useMyCertifications();

  /* -----------------------------
   *  6-4. 서버 row id 매핑용 상태
   * ----------------------------- */

  // 학력 id (단일)
  const [currentEduId, setCurrentEduId] = useState<number | null>(null);

  // 경력 각 행 id (index 매칭)
  const [experienceIds, setExperienceIds] = useState<number[]>([]);

  // 어학 각 행 id (index 매칭)
  const [languageIds, setLanguageIds] = useState<number[]>([]);

  // 자격증 각 행 id (index 매칭)
  const [certificationIds, setCertificationIds] = useState<number[]>([]);

  /* -----------------------------
   *  6-5. 프리필 여부 ref
   * ----------------------------- */
  const prefilledProfileRef = useRef(false);
  const prefilledEduRef = useRef(false);
  const prefilledCareerRef = useRef(false);
  const prefilledLangRef = useRef(false);
  const prefilledCertRef = useRef(false);

  /* =============================
   *  7. useEffect 영역
   * ============================= */

  // 7-1. 직군이 바뀌면 직무 리셋
  useEffect(() => {
    setJob("");
  }, [jobGroup]);

  // 7-2. 프로필 프리필
  useEffect(() => {
    if (!myProfile) return;
    if (prefilledProfileRef.current) return;

    if (!name.trim()) setNameSafe(myProfile.name ?? "");
    if (!intro.trim()) setIntroSafe(myProfile.introduction ?? "");
    if (!portfolioFile.trim()) setPortfolioFileSafe(myProfile.storageUrl ?? "");
    if (!likelionCode.trim()) setLikelionCodeSafe(myProfile.likelionCode ?? "");

    prefilledProfileRef.current = true;
  }); // 의도적으로 deps 생략

  // 7-3. 학력 프리필 (단일)
  useEffect(() => {
    if (!myEducations || myEducations.length === 0) return;
    if (prefilledEduRef.current) return;

    // 최신(업데이트 기준) 하나 선택
    const sorted = [...myEducations].sort((a, b) =>
      (b.updatedAt || "").localeCompare(a.updatedAt || "")
    );
    const e = sorted[0];

    // 삭제/수정 대상 id 저장
    setCurrentEduId(e.id);

    // prev 기반으로 변경 필요 필드만 채움
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

      const changed =
        next.schoolName !== prev.schoolName ||
        next.status !== prev.status ||
        next.major !== prev.major ||
        next.description !== prev.description ||
        next.periodText !== prev.periodText;

      prefilledEduRef.current = true;

      return changed ? next : prev;
    });
  }, [myEducations, setForm]);

  // 7-4. 경력 프리필 (리스트)
  useEffect(() => {
    if (!myExperiences) return;
    if (prefilledCareerRef.current) return;

    if (myExperiences.length === 0) {
      prefilledCareerRef.current = true;
      return;
    }

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
    career.setErrors(new Array(rows.length).fill({}));
    setExperienceIds(myExperiences.map((e) => e.id));

    prefilledCareerRef.current = true;
  }, [myExperiences, career]);

  // 7-5. 어학 프리필 (리스트)
  useEffect(() => {
    if (!myLanguages) return;
    if (prefilledLangRef.current) return;

    if (myLanguages.length === 0) {
      setLanguageIds([]);
      prefilledLangRef.current = true;
      return;
    }

    const rows = myLanguages.map((l) => {
      const raw = (l.issueDate ?? "").split("T")[0] || l.issueDate || "";
      let ym = "";

      if (raw && /^\d{4}-\d{2}-\d{2}$/.test(raw)) {
        const [y, m] = raw.split("-");
        ym = `${y}.${m}`;
      } else if (/^\d{4}\.(0[1-9]|1[0-2])$/.test(l.issueDate)) {
        ym = l.issueDate; // 이미 YYYY.MM 형태
      }

      return {
        name: l.languageName ?? "",
        issueDate: ym,
      };
    });

    lang.setLangs(rows);
    lang.setErrors(new Array(rows.length).fill({}));
    setLanguageIds(myLanguages.map((l) => l.id));

    prefilledLangRef.current = true;
  }, [myLanguages, lang]);

  // 7-6. 자격증 프리필 (리스트)
  useEffect(() => {
    if (!myCerts) return;
    if (prefilledCertRef.current) return;

    if (myCerts.length === 0) {
      setCertificationIds([]);
      prefilledCertRef.current = true;
      return;
    }

    const rows = myCerts.map((c) => {
      const raw = (c.issueDate ?? "").split("T")[0] || c.issueDate || "";
      let ym = "";

      if (raw && /^\d{4}-\d{2}-\d{2}$/.test(raw)) {
        const [y, m] = raw.split("-");
        ym = `${y}.${m}`;
      } else if (/^\d{4}\.(0[1-9]|1[0-2])$/.test(c.issueDate)) {
        ym = c.issueDate;
      }

      return { name: c.certificationName ?? "", issueDate: ym };
    });

    cert.setCerts(rows);
    cert.setErrors(new Array(rows.length).fill({}));
    setCertificationIds(myCerts.map((c) => c.id));

    prefilledCertRef.current = true;
  }, [myCerts, cert]);

  /* =============================
   *  8. 핸들러들
   * ============================= */

  const handleGoBack = () => router.back();

  // 8-1. 경력 삭제 (개별 행)
  const handleDeleteExperience = async (index: number) => {
    const id = experienceIds[index];

    // 화면 먼저 초기화
    career.clearCompany(index);
    career.setErrors((prev) => {
      const next = [...prev];
      next[index] = {};
      return next;
    });

    // id 제거 -> 신규 취급
    setExperienceIds((prev) => {
      const next = [...prev];
      next[index] = undefined as unknown as number;
      return next;
    });

    // 서버 삭제
    try {
      if (id) {
        await deleteExperience(id);
      }
      console.log(`[경력] 삭제 완료 (index=${index}, id=${id ?? "없음"})`);
    } catch (e) {
      console.error(e);
      alert("경력 삭제 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.");
    }
  };

  // 8-2. 어학 삭제
  const handleDeleteLanguage = async (index: number) => {
    const id = languageIds[index];

    lang.clear(index);

    setLanguageIds((prev) => {
      const next = [...prev];
      next[index] = undefined as unknown as number;
      return next;
    });

    try {
      if (id) await deleteLanguage(id);
      console.log(`[어학] 삭제 완료 (index=${index}, id=${id ?? "없음"})`);
    } catch (e) {
      console.error(e);
      alert("어학 삭제 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.");
    }
  };

  // 8-3. 자격증 삭제
  const handleDeleteCertification = async (index: number) => {
    const id = certificationIds[index];

    cert.clear(index);

    setCertificationIds((prev) => {
      const next = [...prev];
      next[index] = undefined as unknown as number;
      return next;
    });

    try {
      if (id) await deletecertification(id);
      console.log(`[자격증] 삭제 완료 (index=${index}, id=${id ?? "없음"})`);
    } catch (e) {
      console.error(e);
      alert("자격증 삭제 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.");
    }
  };

  /* =============================
   *  9. 파생 값 (버튼 활성화 등)
   * ============================= */

  const isComplete =
    name.trim().length > 0 &&
    intro.trim().length > 0 &&
    portfolioFile.trim().length > 0 &&
    jobGroup.trim().length > 0 &&
    job.trim().length > 0;

  /* =============================
   *  10. 전체 저장 핸들러
   * ============================= */

  const handleSubmitAll = async (): Promise<void> => {
    try {
      startTransition(() => {});

      /* ---------- 10-1. 프로필 등록/수정 ---------- */
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

      /* ---------- 10-2. 학력 등록/수정 ---------- */
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
        const res = await updateEducation(existingEduId, built.payload);
        console.log(`[학력] 수정 완료 id=${res.id}`);
      } else if (coreEmpty) {
        if (built && "shouldSubmit" in built && built.shouldSubmit) {
          const res = await createEducation(built.payload);
          console.log(`[학력] 등록 완료 id=${res.id}`);
        } else {
          console.log("[학력] 전부 빈칸 + 유효 payload 없음 → 생성 스킵");
        }
      } else if (built && "shouldSubmit" in built && built.shouldSubmit) {
        const res = await createEducation(built.payload);
        console.log(`[학력] 등록 완료 id=${res.id}`);
      } else {
        console.log("[학력] 입력 없음 → 스킵");
      }

      /* ---------- 10-3. 성향 ---------- */
      await updateTendencies.mutateAsync({ ids: tendencyIds });
      console.log("[성향] 갱신 완료", tendencyIds);

      /* ---------- 10-4. 경력 등록/수정 ---------- */

      // unused-var 경고 제거 용도: 에러 세팅 트리거
      career.validateAndBuild();

      for (let i = 0; i < career.companies.length; i += 1) {
        const row = career.companies[i];

        const hasAny =
          row.company.trim() ||
          row.period.trim() ||
          row.dept.trim() ||
          row.role.trim() ||
          row.desc.trim();
        if (!hasAny) continue;

        const rowErr = career.errors?.[i];
        const hasRealError =
          !!rowErr && Object.values(rowErr).some((v) => typeof v === "string" && v.length > 0);
        if (hasRealError) {
          console.log(`[경력] ${i}번 행 유효성 오류 → 스킵`, rowErr);
          continue;
        }

        const parsed = parseYYYYMMRange(row.period);
        if (!parsed) {
          console.log(`[경력] ${i}번 행 기간 파싱 실패 → 스킵`);
          continue;
        }

        const expPayload = {
          companyName: row.company.trim(),
          department: row.dept.trim() || undefined,
          position: row.role.trim(),
          startDate: parsed.startDate,
          endDate: parsed.endDate ?? null,
          isCurrent: parsed.endDate === undefined,
          description: row.desc.trim() || undefined,
        } as const;

        const id = experienceIds[i];

        if (id) {
          const res = await updateExperience(id, expPayload);
          console.log(`[경력] 수정 완료 id=${res.id}`);
        } else {
          const res = await createExperience(expPayload);
          console.log(`[경력] 등록 완료 id=${res.id}`);
        }
      }

      prefilledCareerRef.current = false;
      await refetchExperiences();
      console.log("[경력] 서버 데이터 재조회 완료");

      /* ---------- 10-5. 어학 등록/수정 ---------- */
      const v = lang.validateAndBuild();
      if (!v.ok) {
        console.log("[어학] 유효성 오류 → 저장 스킵");
      } else {
        for (let i = 0; i < lang.langs.length; i += 1) {
          const row = lang.langs[i];
          const hasAny = row.name.trim() || row.issueDate.trim();
          if (!hasAny) continue;

          const issue = toYYYYMM01(row.issueDate);
          if (!issue) {
            console.log(`[어학] ${i}번 행 취득월 포맷 오류 → 스킵`);
            continue;
          }

          const langPayload = {
            languageName: row.name.trim(),
            issueDate: issue,
          } as const;

          const id = languageIds[i];
          if (id) {
            const res = await updateLanguage(id, langPayload);
            console.log(`[어학] 수정 완료 id=${res.id}`);
          } else {
            const res = await createLanguage(langPayload);
            console.log(`[어학] 등록 완료 id=${res.id}`);
          }
        }

        prefilledLangRef.current = false;

        /* ---------- 10-6. 자격증 등록/수정 ---------- */
        const cv = cert.validateAndBuild();
        if (!cv.ok) {
          console.log("[자격증] 유효성 오류 → 저장 스킵");
        } else {
          for (let i = 0; i < cert.certs.length; i += 1) {
            const row = cert.certs[i];
            const hasAny = row.name.trim() || row.issueDate.trim();
            if (!hasAny) continue;

            const issue = toYYYYMM01(row.issueDate);
            if (!issue) {
              console.log(`[자격증] ${i}번 행 취득월 포맷 오류 → 스킱`);
              continue;
            }

            const certPayload = {
              certificationName: row.name.trim(),
              issueDate: issue,
            } as const;

            const id = certificationIds[i];
            if (id) {
              const res = await updatecertification(id, certPayload);
              console.log(`[자격증] 수정 완료 id=${res.id}`);
            } else {
              const res = await createcertification(certPayload);
              console.log(`[자격증] 등록 완료 id=${res.id}`);
            }
          }

          prefilledCertRef.current = false;
          await refetchCerts();
          console.log("[자격증] 서버 데이터 재조회 완료");
        }

        await refetchLanguages();
        console.log("[어학] 서버 데이터 재조회 완료");
      }

      /* ---------- 10-7. 페이지 새로고침 ---------- */
      window.location.reload();
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

  /* =============================
   *  11. 렌더
   * ============================= */

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
        <IntroComponent name={name} onNameChange={setNameSafe} />
        <PhotoComponent />
        <CodeRegisterComponent code={likelionCode} onCodeChange={setLikelionCodeSafe} />
        <ProfileComponent
          intro={intro}
          onIntroChange={setIntroSafe}
          jobGroup={jobGroup}
          job={job}
          onChangeJobGroup={setJobGroup}
          onChangeJob={setJob}
        />
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
          errors={edu.errors}
          onDeleted={() => {
            setCurrentEduId(null);
            prefilledEduRef.current = false;
            refetchEducations();
          }}
        />

        <CareerComponent
          companies={career.companies}
          errors={career.errors}
          hasAnyValue={career.hasAnyValue}
          onChange={career.onChange}
          onAdd={career.addCompany}
          onClear={career.clearCompany}
          onDelete={handleDeleteExperience}
        />

        <SkillComponent />

        <QualificationComponent
          // 어학
          langs={lang.langs}
          langErrors={lang.errors}
          hasAnyValue={lang.hasAnyValue}
          onLangChange={lang.onChange}
          onLangAdd={lang.add}
          onLangClear={lang.clear}
          onLangDelete={handleDeleteLanguage}
          // 자격증
          certs={cert.certs}
          certErrors={cert.errors}
          hasAnyCertValue={cert.hasAnyValue}
          onCertChange={cert.onChange}
          onCertAdd={cert.add}
          onCertClear={cert.clear}
          onCertDelete={handleDeleteCertification}
        />

        <LinkRegisterComponent />
        <PortfolioComponent fileName={portfolioFile} onFileSelect={setPortfolioFileSafe} />
      </main>
    </div>
  );
}
