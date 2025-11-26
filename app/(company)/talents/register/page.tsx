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

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  talentRegisterSchema,
  defaultTalentRegisterValues,
  type TalentRegisterFormValues,
} from "@/schemas/talent/talentRegisterSchema";

// 폼 제출 액션
import { submitTalentRegister } from "./_actions/submitTalentRegister";

// 훅
import { useTalentRegisterData } from "@/hooks/talent/queries/useTalentRegisterData";
import { useInitializeTalentForm } from "@/hooks/talent/queries/useInitializeTalentForm";

// Store
import { useTalentRegisterStore } from "@/store/talentRegisterStore";
import { useAuthStore } from "@/store/authStore";

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
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const [isUserVerified, setIsUserVerified] = useState(false);

  // 인증 상태 초기화 완료 후 사용자 확인
  useEffect(() => {
    // 아직 초기화 중이면 대기
    if (!isInitialized) {
      return;
    }

    // 초기화 완료 후 사용자 확인
    if (user) {
      setIsUserVerified(true);
    } else {
      // user가 없으면 로그인 페이지로 리다이렉트
      console.warn("⚠️ 로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      router.push("/login");
    }
  }, [isInitialized, user, router]);

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
    shouldUnregister: true, // 컴포넌트 언마운트 시 필드 등록 해제 및 값 삭제
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
    console.log("임시 저장 내용", currentValues);
    await onSubmit(currentValues);
  };

  // 사용자 인증 확인 중 로딩 상태 처리
  if (!isUserVerified) {
    return (
      <div className="min-h-screen bg-bg-page flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-border-tertiary border-t-bg-accent rounded-full animate-spin" />
          <p className="text-text-secondary">인증을 확인하는 중입니다...</p>
        </div>
      </div>
    );
  }

  // 로딩 상태 처리
  if (isLoading) {
  }

  // 에러 상태 처리
  if (error) {
  }

  /**
   * 폼 제출 핸들러
   * submitTalentRegister 액션을 호출하여 처리
   */
  const onSubmit = async (values: TalentRegisterFormValues) => {
    const result = await submitTalentRegister({
      values,
      methods,
      existingProfileId: existingProfile?.id,
    });

    if (result.success) {
      // TODO: 성공 시 처리 (리다이렉트, 토스트 등)
    } else {
      // TODO: 에러 처리
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
            className="talent-register-form max-w-[1142px] mx-auto flex flex-col gap-60"
          >
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
