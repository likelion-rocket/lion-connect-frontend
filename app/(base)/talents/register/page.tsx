"use client";

/**
 * 인재 등록 폼 페이지
 * React Hook Form (FormProvider) 연동을 고려한 마크업 구조
 *
 * 나중에 useForm, FormProvider, useFormContext로 연결하기 쉽게 설계됨
 * - 모든 input에 name, id 속성 포함
 * - 에러 메시지 placeholder 포함
 * - 반응형 레이아웃 (모바일 1열, PC 2열)
 *
 * 향후 구조:
 * 1. UI 컴포넌트와 API 구조 분리 (FormProvider 안에서 자유롭게 분리)
 * 2. onSubmit에서 formData를 API 규격에 맞게 재조립(Mapping)
 * 3. mutateAsync로 순차 저장: [프로필 생성(await) -> ID 획득 -> 나머지 병렬 저장(Promise.all)]
 * 4. formState.dirtyFields로 dirty checking하여 필요한 API만 호출
 */

import {
  ProfileImageSection,
  PersonalInfoSection,
  IntroductionSection,
  JobSection,
  JobExperienceSection,
  EducationSection,
  CareerSection,
  SkillsSection,
  ActivitiesSection,
  LanguagesSection,
  CertificatesSection,
  LinksSection,
  PortfolioSection,
  LikelionCodeSection,
} from "./_components/sections";

export default function TalentRegisterPage() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-bg-page">
      {/* Navigation Bar */}
      <nav className="max-w-[1440px] mx-auto px-4 md:px-8 h-14 flex items-center justify-between mt-8">
        <button
          type="button"
          onClick={handleGoBack}
          className="flex items-center gap-2 md:gap-4 hover:opacity-80 transition-opacity"
        >
          <span className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M14 7L9 12L14 17"
                stroke="currentColor"
                className="text-icon-secondary"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-base md:text-lg font-bold text-text-primary">이전 페이지</span>
        </button>

        <button
          type="submit"
          form="talent-register-form"
          className="bg-bg-accent text-text-inverse-primary px-4 py-2.5 md:py-3 rounded-lg text-base md:text-lg font-bold hover:bg-brand-06 transition-colors"
        >
          작성 완료
        </button>
      </nav>

      {/* Main Form */}
      <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-16">
        <form
          id="talent-register-form"
          className="talent-register-form max-w-[1142px] mx-auto flex flex-col gap-16 md:gap-[100px]"
        >
          {/* Page Header */}
          <header className="page-header flex flex-col gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">인재 등록</h1>
            <p className="text-base text-text-secondary">기본 정보와 이력, 스킬을 입력해 주세요.</p>
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
  );
}
