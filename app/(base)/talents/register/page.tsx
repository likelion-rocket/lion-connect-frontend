"use client";

/**
 * 인재 등록 폼 페이지
 * React Hook Form (FormProvider) + API 연동
 *
 * 데이터 흐름:
 * 1. useTalentRegisterData 훅으로 페이지 진입 시 모든 데이터 조회
 * 2. 조회한 데이터는 useTalentRegisterStore에 자동 저장
 * 3. 각 섹션은 store에서 필요한 데이터만 선택적으로 구독
 * 4. authStore에서 user 정보(전화번호, 이메일) 가져옴
 *
 * API 호출 순서:
 * 1. POST api/profile/me → 프로필 생성 (await, ID 획득)
 * 2. 나머지 병렬 저장 (Promise.all)
 *
 * formState.dirtyFields로 dirty checking하여 필요한 API만 호출
 */

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  talentRegisterSchema,
  defaultTalentRegisterValues,
  type TalentRegisterFormValues,
} from "@/schemas/talent/talentRegisterSchema";

// API 함수들 (lib/api/) - api-integration SKILL 패턴 준수
import { createProfile, updateMyProfile } from "@/lib/api/profiles";
import { createEducation } from "@/lib/api/educations";
import { createExperience } from "@/lib/api/experiences";
import { createLanguage } from "@/lib/api/languages";
import { createCertification } from "@/lib/api/certifications";
import { createAward } from "@/lib/api/awards";
import { updateMyExpTags } from "@/lib/api/expTags";
import { updateJobs } from "@/lib/api/jobs";

// 훅
import { useTalentRegisterData } from "@/hooks/talent/queries/useTalentRegisterData";
import { useInitializeTalentForm } from "@/hooks/talent/queries/useInitializeTalentForm";

// Store
import { useTalentRegisterStore } from "@/store/talentRegisterStore";

// 컴포넌트
import TalentRegisterNav from "./_components/TalentRegisterNav";

// 섹션 컴포넌트
import ProfileImageSection from "./_components/sections/ProfileImageSection";
import PersonalInfoSection from "./_components/sections/PersonalInfoSection";
import IntroductionSection from "./_components/sections/IntroductionSection";
import JobSection from "./_components/sections/JobSection";
import JobExperienceSection from "./_components/sections/JobExperienceSection";
import EducationSection from "./_components/sections/EducationSection";
import CareerSection from "./_components/sections/CareerSection";
import SkillsSection from "./_components/sections/SkillsSection";
import ActivitiesSection from "./_components/sections/ActivitiesSection";
import LanguagesSection from "./_components/sections/LanguagesSection";
import CertificatesSection from "./_components/sections/CertificatesSection";
import LinksSection from "./_components/sections/LinksSection";
import PortfolioSection from "./_components/sections/PortfolioSection";
import LikelionCodeSection from "./_components/sections/LikelionCodeSection";
import WorkDrivenTestSection from "./_components/sections/WorkDrivenTestSection";

// resolver를 컴포넌트 외부로 이동 (재생성 방지)
const formResolver = zodResolver(talentRegisterSchema);

export default function TalentRegisterPage() {
  // 페이지 진입 시 모든 데이터 조회 (자동으로 store에 저장됨)
  // 각 섹션 컴포넌트에서 useTalentRegisterStore로 직접 사용
  const { isLoading, error } = useTalentRegisterData();

  // 프로필 존재 여부 확인 (POST vs PUT 분기용)
  const existingProfile = useTalentRegisterStore((state) => state.profile);

  const methods = useForm<TalentRegisterFormValues>({
    resolver: formResolver,
    defaultValues: defaultTalentRegisterValues,
    mode: "onChange", // 실시간 validation (버튼 활성화 위해)
    shouldFocusError: true, // 에러 발생 시 첫 번째 필드로 자동 포커스
  });

  // 데이터가 로드되면 자동으로 React Hook Form을 초기화
  useInitializeTalentForm(methods, isLoading);

  const handleGoBack = () => {
    // window.history.back();
  };

  /**
   * 임시 저장 핸들러
   * - validation 체크 없이 현재 입력된 값으로 submit
   * - handleSubmit을 사용하지 않고 직접 onSubmit 호출
   */
  const handleTempSave = async () => {
    const currentValues = methods.getValues();
    await onSubmit(currentValues);
  };

  // 로딩 상태 처리
  if (isLoading) {
  }

  // 에러 상태 처리
  if (error) {
  }

  /**
   * 폼 제출 핸들러
   * talent-register-api SKILL 가이드에 따라:
   * 1. POST api/profile/me 먼저 호출 (await)
   * 2. 나머지 API 병렬 호출 (Promise.all)
   */
  const onSubmit = async (values: TalentRegisterFormValues) => {
    const { dirtyFields } = methods.formState;

    try {
      // 1. 프로필 생성 또는 수정 (최우선 호출)
      const profilePayload = {
        name: values.profile.name,
        introduction: values.profile.introduction || "",
        storageUrl: values.links.portfolio || "", // 포트폴리오 URL
        likelionCode: values.likelion.code,
        visibility: "PUBLIC" as const,
      };

      let profileResponse;

      if (existingProfile?.id) {
        // ✅ 프로필이 이미 존재 → PUT 요청
        profileResponse = await updateMyProfile(profilePayload);
        console.log("프로필 수정 완료:", profileResponse.id);
      } else {
        // ✅ 프로필이 없음 → POST 요청
        profileResponse = await createProfile(profilePayload);
        console.log("프로필 생성 완료:", profileResponse.id);
      }

      // 2. 나머지 병렬 저장
      const parallelPromises: Promise<unknown>[] = [];

      // 직무 카테고리 (PUT)
      if (dirtyFields.job?.category || dirtyFields.job?.role) {
        // TODO: job.category, job.role을 job-categories API 형식으로 매핑
        // parallelPromises.push(updateMyJobs([{ id: 0, name: values.job.category }]));
      }

      // 경험 태그 (PUT)
      if (dirtyFields.job?.experiences) {
        // TODO: job.experiences를 exp-tags API 형식으로 매핑
        // parallelPromises.push(updateMyExpTags([...]));
      }

      // 학력 (POST)
      if (dirtyFields.education) {
        // TODO: education 필드를 educations API 형식으로 매핑
        // parallelPromises.push(createEducation({...}));
      }

      // 경력 (POST)
      if (dirtyFields.career) {
        // TODO: career 필드를 experiences API 형식으로 매핑
        // parallelPromises.push(createExperience({...}));
      }

      // 수상/활동 (POST)
      if (dirtyFields.activities) {
        // TODO: activities 배열을 awards API 형식으로 매핑
        // values.activities?.forEach(activity => {...});
      }

      // 언어 (POST)
      if (dirtyFields.languages) {
        // TODO: languages 배열을 languages API 형식으로 매핑
        // values.languages?.forEach(lang => {...});
      }

      // 자격증 (POST)
      if (dirtyFields.certificates) {
        // TODO: certificates 배열을 certifications API 형식으로 매핑
        // values.certificates?.forEach(cert => {...});
      }

      // 링크 (POST /profile/me/links/{type})
      if (dirtyFields.links) {
        // TODO: links를 profile-links API 형식으로 매핑
      }

      // 병렬 호출 실행
      if (parallelPromises.length > 0) {
        await Promise.all(parallelPromises);
      }

      console.log("인재 등록 완료!");
      // TODO: 성공 시 리다이렉트 또는 토스트 메시지
    } catch (error) {
      console.error("인재 등록 실패:", error);
      // TODO: 에러 처리 (ApiError 타입 체크)
    }
  };

  // 필수 필드 체크: formState.isValid 활용
  const isSubmitDisabled = !methods.formState.isValid;

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-bg-page">
        {/* Navigation Bar */}
        <TalentRegisterNav
          onBack={handleGoBack}
          onTempSave={handleTempSave}
          formId="talent-register-form"
          isSubmitDisabled={isSubmitDisabled}
        />

        {/* Main Form */}
        <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-16">
          <form
            id="talent-register-form"
            onSubmit={methods.handleSubmit(onSubmit)}
            className="talent-register-form max-w-[1142px] mx-auto flex flex-col gap-16 md:gap-[100px]"
          >
            {/* Page Header */}
            <header className="page-header flex flex-col gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary">인재 등록</h1>
              <p className="text-base text-text-secondary">
                기본 정보와 이력, 스킬을 입력해 주세요.
              </p>
            </header>

            {/* 프로필 사진 섹션 */}
            <ProfileImageSection />

            {/* 인적사항 섹션 */}
            <PersonalInfoSection />

            {/* 간단 소개 섹션 */}
            <IntroductionSection />

            {/* 직군 및 직무 선택 섹션 */}
            <JobSection />

            {/* 직무 관련 경험 섹션 */}
            <JobExperienceSection />

            {/* 학력 섹션 */}
            <EducationSection />

            {/* 경력 섹션 */}
            <CareerSection />

            {/* 직무 스킬 섹션 */}
            <SkillsSection />

            {/* 수상/활동/기타 섹션 */}
            <ActivitiesSection />

            {/* 언어 & 자격증 섹션 (2열 레이아웃) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              <LanguagesSection />
              <CertificatesSection />
            </div>

            {/* 링크 섹션 */}
            <LinksSection />

            {/* 포트폴리오 섹션 */}
            <PortfolioSection />

            {/* 멋사 수료생 코드 섹션 */}
            <LikelionCodeSection />

            {/* Work Driven 테스트 섹션 */}
            <WorkDrivenTestSection />

            {/* Page Footer */}
            <footer className="page-footer flex flex-col md:flex-row items-center justify-end gap-4 pt-8 border-t border-border-quaternary">
              <button
                type="button"
                onClick={handleGoBack}
                className="w-full md:w-auto px-8 py-3 border border-border-quaternary rounded-lg text-base font-medium text-text-secondary hover:bg-bg-tertiary transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-bg-accent text-text-inverse-primary rounded-lg text-base font-bold hover:bg-brand-06 transition-colors"
              >
                전체 저장
              </button>
            </footer>
          </form>
        </main>
      </div>
    </FormProvider>
  );
}
