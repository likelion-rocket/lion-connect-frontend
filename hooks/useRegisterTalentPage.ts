// hooks/useRegisterTalentPage.ts
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

import { useEducationSection } from "@/hooks/useEducationSection";
import { createEducation, updateEducation } from "@/lib/api/educations";
import { useMyEducations } from "@/hooks/useMyEducation";
import { enumToKo } from "@/lib/education/statusMap";

import { useMyProfile } from "@/hooks/useMyProfile";
import { createProfile, updateMyProfile, type ProfileRequest } from "@/lib/api/profiles";

import { useMyExpTags } from "@/hooks/useMyExpTags";
import { useUpdateExpTags } from "@/hooks/useUpdateExpTags";

import { useMySkills } from "@/hooks/useMySkills";
import { useUpdateSkills } from "@/hooks/useUpdateSkills";

import { useUpdateTendencies } from "@/hooks/useUpdateTendencies";
import { useMyTendencies } from "./useMyTendencies";

import { useCareerSection } from "@/hooks/useCareerSection";
import type { CompanyForm } from "@/hooks/useCareerSection";
import { useMyExperiences } from "@/hooks/useMyExperiences";
import { createExperience, updateExperience, deleteExperience } from "@/lib/api/experiences";

import { useLanguageSection } from "@/hooks/useLanguageSection";
import { useMyLanguages } from "@/hooks/useMyLanguages";
import { createLanguage, updateLanguage, deleteLanguage } from "@/lib/api/languages";

import { useCertificationSection } from "@/hooks/useCertificationSection";
import { useMyCertifications } from "@/hooks/useMyCertifications";
import {
  createCertification,
  updateCertification,
  deleteCertification,
} from "@/lib/api/certifications";

import { ApiError } from "@/lib/apiClient";
import { parseYYYYMMRange } from "@/lib/date/ym";

// YYYY-MM-DD -> YYYY.MM
const fmtYM = (d?: string | null) => {
  if (!d) return "";
  const [y, m] = d.split("-");
  if (!y || !m) return "";
  return `${y}.${m}`;
};

// YYYY.MM -> YYYY-MM-01 위에 두거나 아래 아무데나(훅 바깥)
const areIdArraysEqual = (a: number[], b: number[]) => {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort((x, y) => x - y);
  const sortedB = [...b].sort((x, y) => x - y);
  return sortedA.every((v, i) => v === sortedB[i]);
};

// YYYY.MM -> YYYY-MM-01
const toYYYYMM01 = (ym: string) => {
  const m = ym.trim().match(/^(\d{4})\.(0[1-9]|1[0-2])$/);
  if (!m) return "";
  return `${m[1]}-${m[2]}-01`;
};

export function useRegisterTalentPage() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  /* -----------------------------
   * 상단 프로필 기본 정보
   * ----------------------------- */
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [portfolioFile, setPortfolioFile] = useState("");
  const [likelionCode, setLikelionCode] = useState("");
  // ✅ 스킬 ids
  const [skillIds, setSkillIds] = useState<number[]>([]);
  const [initialSkillIds, setInitialSkillIds] = useState<number[]>([]);

  const [jobGroup, setJobGroup] = useState("");
  const [job, setJob] = useState("");

  const [tendencyIds, setTendencyIds] = useState<number[]>([]);
  const [initialTendencyIds, setInitialTendencyIds] = useState<number[]>([]); // ✅ 추가
  const updateTendencies = useUpdateTendencies();

  // ✅ 경험 태그
  const [expTagIds, setExpTagIds] = useState<number[]>([]);
  const [initialExpTagIds, setInitialExpTagIds] = useState<number[]>([]);
  const updateExpTags = useUpdateExpTags();

  const setNameSafe = (v: string) => setName((prev) => (prev === v ? prev : v));
  const setIntroSafe = (v: string) => setIntro((prev) => (prev === v ? prev : v));
  const setPortfolioFileSafe = (v: string) => setPortfolioFile((prev) => (prev === v ? prev : v));
  const setLikelionCodeSafe = (v: string) => setLikelionCode((prev) => (prev === v ? prev : v));

  /* -----------------------------
   * 섹션 훅
   * ----------------------------- */
  const edu = useEducationSection();
  const { setForm } = edu;

  const career = useCareerSection();
  const lang = useLanguageSection();
  const cert = useCertificationSection();

  /* -----------------------------
   * 서버 데이터 조회
   * ----------------------------- */
  const { data: myProfile } = useMyProfile();
  const { data: myEducations, refetch: refetchEducations } = useMyEducations();
  const { data: myExperiences, refetch: refetchExperiences } = useMyExperiences();
  const { data: myLanguages, refetch: refetchLanguages } = useMyLanguages();
  const { data: myCerts, refetch: refetchCerts } = useMyCertifications();
  const { data: myTendencies } = useMyTendencies(); // ✅ 추가
  const { data: myExpTags } = useMyExpTags();
  const { data: mySkills } = useMySkills(); // GET /api/profile/skills
  const updateSkills = useUpdateSkills(); // PUT 훅

  /* -----------------------------
   * 서버 row id 매핑 상태
   * ----------------------------- */
  const [currentEduId, setCurrentEduId] = useState<number | null>(null);
  const [experienceIds, setExperienceIds] = useState<number[]>([]);
  const [languageIds, setLanguageIds] = useState<number[]>([]);
  const [certificationIds, setCertificationIds] = useState<number[]>([]);

  /* -----------------------------
   * 프리필 여부 ref
   * ----------------------------- */
  const prefilledProfileRef = useRef(false);
  const prefilledEduRef = useRef(false);
  const prefilledCareerRef = useRef(false);
  const prefilledLangRef = useRef(false);
  const prefilledCertRef = useRef(false);
  const prefilledTendencyRef = useRef(false); // ✅ 추가
  const prefilledExpTagRef = useRef(false); // ✅ 추가
  // const prefilledSkillRef = useRef(false);

  /* =============================
   * useEffect 영역
   * ============================= */

  // 직군 바뀌면 직무 리셋
  useEffect(() => {
    setJob("");
  }, [jobGroup]);

  // ✅ 스킬 프리필 (처음에 skillIds가 비어 있을 때만 서버 값으로 채움)
  useEffect(() => {
    if (!mySkills) return;

    const serverIds = mySkills.map((s) => s.id);

    setSkillIds((prev) => {
      // 이미 뭔가 선택돼 있으면(= 유저가 만진 상태면) 덮어쓰지 않기
      if (prev.length > 0) return prev;
      console.log("[useRegisterTalentPage] 스킬 프리필 →", serverIds);
      return serverIds;
    });

    setInitialSkillIds((prev) => {
      if (prev.length > 0) return prev;
      return serverIds;
    });
  }, [mySkills]);

  // 프로필 프리필
  useEffect(() => {
    if (!myProfile) return;
    if (prefilledProfileRef.current) return;

    if (!name.trim()) setNameSafe(myProfile.name ?? "");
    if (!intro.trim()) setIntroSafe(myProfile.introduction ?? "");
    if (!portfolioFile.trim()) setPortfolioFileSafe(myProfile.storageUrl ?? "");
    if (!likelionCode.trim()) setLikelionCodeSafe(myProfile.likelionCode ?? "");

    prefilledProfileRef.current = true;
  });

  // ✅ 경험 태그 프리필
  useEffect(() => {
    console.log("🔍 myExpTags from server:", myExpTags);
    if (!myExpTags) return;
    if (prefilledExpTagRef.current) return;

    const ids = myExpTags.map((t) => t.id);

    setExpTagIds(ids);
    setInitialExpTagIds(ids);
    prefilledExpTagRef.current = true;
  }, [myExpTags]);

  // ✅ 성향 프리필
  useEffect(() => {
    if (!myTendencies) return;
    if (prefilledTendencyRef.current) return;

    // 백엔드에서 받은 내 성향 id 배열
    const ids = myTendencies.map((t) => t.id);

    setTendencyIds(ids); // 현재 선택값 (PUT 바디용)
    setInitialTendencyIds(ids); // 처음 렌더 시 체크박스에 뿌려줄 값
    prefilledTendencyRef.current = true;
  }, [myTendencies]);

  // 학력 프리필
  useEffect(() => {
    if (!myEducations || myEducations.length === 0) return;
    if (prefilledEduRef.current) return;

    const sorted = [...myEducations].sort((a, b) =>
      (b.updatedAt || "").localeCompare(a.updatedAt || "")
    );
    const e = sorted[0];

    setCurrentEduId(e.id);

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

  // 경력 프리필
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

  // 어학 프리필
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
        ym = l.issueDate;
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

  // 자격증 프리필
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

      return { name: c.name ?? "", issueDate: ym };
    });

    cert.setCerts(rows);
    cert.setErrors(new Array(rows.length).fill({}));
    setCertificationIds(myCerts.map((c) => c.id));

    prefilledCertRef.current = true;
  }, [myCerts, cert]);

  /* =============================
   * 삭제 핸들러들
   * ============================= */

  const handleGoBack = () => router.back();

  const handleDeleteExperience = async (index: number) => {
    const id = experienceIds[index];
    const hasMultiple = career.companies.length > 1;

    if (hasMultiple) {
      const nextCompanies = career.companies.filter((_, i) => i !== index);
      const nextErrors = (career.errors ?? []).filter((_, i) => i !== index);
      const nextIds = experienceIds.filter((_, i) => i !== index);

      career.setCompanies(nextCompanies);
      career.setErrors(nextErrors);
      setExperienceIds(nextIds);
    } else {
      career.clearCompany(index);
      career.setErrors([{}]);
      setExperienceIds([undefined as unknown as number]);
    }

    try {
      if (id) {
        await deleteExperience(id);
      }
      console.log(
        `[경력] 삭제 완료 (index=${index}, id=${id ?? "없음"}, hasMultiple=${hasMultiple})`
      );
    } catch (e) {
      console.error(e);
      alert("경력 삭제 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.");
    }
  };

  const handleDeleteLanguage = async (index: number) => {
    const id = languageIds[index];
    const hasMultiple = lang.langs.length > 1;

    if (hasMultiple) {
      const nextLangs = lang.langs.filter((_, i) => i !== index);
      const nextErrors = (lang.errors ?? []).filter((_, i) => i !== index);
      const nextIds = languageIds.filter((_, i) => i !== index);

      lang.setLangs(nextLangs);
      lang.setErrors(nextErrors);
      setLanguageIds(nextIds);
    } else {
      lang.clear(index);
      lang.setErrors([{}]);
      setLanguageIds([undefined as unknown as number]);
    }

    try {
      if (id) await deleteLanguage(id);
      console.log(
        `[어학] 삭제 완료 (index=${index}, id=${id ?? "없음"}, hasMultiple=${hasMultiple})`
      );
    } catch (e) {
      console.error(e);
      alert("어학 삭제 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.");
    }
  };

  const handleDeleteCertification = async (index: number) => {
    const id = certificationIds[index];
    const hasMultiple = cert.certs.length > 1;

    if (hasMultiple) {
      const nextCerts = cert.certs.filter((_, i) => i !== index);
      const nextErrors = (cert.errors ?? []).filter((_, i) => i !== index);
      const nextIds = certificationIds.filter((_, i) => i !== index);

      cert.setCerts(nextCerts);
      cert.setErrors(nextErrors);
      setCertificationIds(nextIds);
    } else {
      cert.clear(index);
      cert.setErrors([{}]);
      setCertificationIds([undefined as unknown as number]);
    }

    try {
      if (id) await deleteCertification(id);
      console.log(
        `[자격증] 삭제 완료 (index=${index}, id=${id ?? "없음"}, hasMultiple=${hasMultiple})`
      );
    } catch (e) {
      console.error(e);
      alert("자격증 삭제 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.");
    }
  };

  /* =============================
   * 파생 값
   * ============================= */

  const isComplete =
    name.trim().length > 0 &&
    intro.trim().length > 0 &&
    portfolioFile.trim().length > 0 &&
    jobGroup.trim().length > 0 &&
    job.trim().length > 0;

  /* =============================
   * 전체 저장 핸들러
   * ============================= */

  const handleSubmitAll = async (): Promise<void> => {
    try {
      console.log("[작성완료] 클릭됨, 현재 expTagIds =", expTagIds);
      startTransition(() => {});

      // 1. 프로필
      const profilePayload: ProfileRequest = {
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
        const updated = await updateMyProfile(profilePayload);
        console.log(`[프로필] 수정 완료 id=${updated.id}`);
      } else {
        const created = await createProfile(profilePayload);
        console.log(`[프로필] 등록 완료 id=${created.id}`);
      }

      // 2. 학력
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

      // 3. 성향
      const tendenciesChanged = !areIdArraysEqual(initialTendencyIds, tendencyIds);
      if (tendenciesChanged) {
        await updateTendencies.mutateAsync({ ids: tendencyIds });
        console.log("[성향] 변경 있음 → 갱신 완료", tendencyIds);
        // 한 번 저장 후엔 기준값도 현재 값으로 맞춰주면, 같은 세션에서 다시 눌러도 스킵됨
        setInitialTendencyIds(tendencyIds);
      } else {
        console.log("[성향] 변경 없음 → PUT 스킵", { initialTendencyIds, tendencyIds });
      }

      // 3-1. 관련 경험 태그
      const expTagsChanged = !areIdArraysEqual(initialExpTagIds, expTagIds);
      if (expTagsChanged) {
        console.log("[작성완료] 3-1. 경험 태그 변경 있음 → PUT 시작", expTagIds);
        await updateExpTags.mutateAsync({ ids: expTagIds });
        console.log("[관련 경험 태그] 갱신 완료", expTagIds);
        setInitialExpTagIds(expTagIds);
      } else {
        console.log("[작성완료] 3-1. 경험 태그 변경 없음 → PUT 스킵", {
          initialExpTagIds,
          expTagIds,
        });
      }

      // 3-2. 스킬 태그
      // ✅ 3-2. 직무 스킬 태그
      const skillsChanged = !areIdArraysEqual(initialSkillIds, skillIds);
      if (skillsChanged) {
        console.log("[작성완료] 3-2. 스킬 태그 변경 있음 → PUT 시작", skillIds);
        await updateSkills.mutateAsync({ ids: skillIds });
        console.log("[스킬 태그] 갱신 완료", skillIds);
        setInitialSkillIds(skillIds);
      } else {
        console.log("[작성완료] 3-2. 스킬 태그 변경 없음 → PUT 스킵", {
          initialSkillIds,
          skillIds,
        });
      }

      // 4. 경력
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

      // 5. 어학
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

        // 6. 자격증
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
              console.log(`[자격증] ${i}번 행 취득월 포맷 오류 → 스킵`);
              continue;
            }

            const certPayload = {
              name: row.name.trim(),
              issueDate: issue,
              issuer: "미입력", // ✅ 임시 발급기관(백엔드가 NotBlank일 때용)
            } as const;

            const id = certificationIds[i];
            if (id) {
              const res = await updateCertification(id, certPayload);
              console.log(`[자격증] 수정 완료 id=${res.id}`);
            } else {
              const res = await createCertification(certPayload);
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

  /* -----------------------------
   * 학력 삭제 후 후처리 핸들러
   * ----------------------------- */
  const handleEducationDeleted = () => {
    setCurrentEduId(null);
    prefilledEduRef.current = false;
    refetchEducations();
  };

  return {
    // 공통
    pending,
    isComplete,
    handleSubmitAll,
    handleGoBack,

    // 상단 프로필/코드/포트폴리오
    name,
    setNameSafe,
    intro,
    setIntroSafe,
    portfolioFile,
    setPortfolioFileSafe,
    likelionCode,
    setLikelionCodeSafe,

    // 직군/직무
    jobGroup,
    setJobGroup,
    job,
    setJob,

    // ✅ 스킬 태그
    skillIds,
    setSkillIds,
    initialSkillIds,

    // 경험 태그
    expTagIds,
    setExpTagIds,
    initialExpTagIds,

    // 성향
    tendencyIds,
    setTendencyIds,
    initialTendencyIds, // ✅ 반환 추가

    // 학력
    edu,
    currentEduId,
    handleEducationDeleted,

    // 경력
    career,
    handleDeleteExperience,

    // 어학
    lang,
    handleDeleteLanguage,

    // 자격증
    cert,
    handleDeleteCertification,
  };
}
