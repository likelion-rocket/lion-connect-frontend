/**
 * 인재 등록 폼 섹션 컴포넌트 barrel export
 *
 * 나중에 FormProvider와 연동할 때:
 * 1. UI 컴포넌트는 자유롭게 분리
 * 2. onSubmit에서 formData를 API 규격에 맞게 재조립(Mapping)
 * 3. mutateAsync로 순차 저장: [프로필 생성(await) -> ID 획득 -> 나머지 병렬 저장(Promise.all)]
 * 4. formState.dirtyFields로 dirty checking하여 필요한 API만 호출
 */

export { default as ProfileImageSection } from "./ProfileImageSection";
export { default as PersonalInfoSection } from "./PersonalInfoSection";
export { default as IntroductionSection } from "./IntroductionSection";
export { default as JobSection } from "./JobSection";
export { default as JobExperienceSection } from "./JobExperienceSection";
export { default as EducationSection } from "./EducationSection";
export { default as CareerSection } from "./CareerSection";
export { default as SkillsSection } from "./SkillsSection";
export { default as ActivitiesSection } from "./ActivitiesSection";
export { default as LanguagesSection } from "./LanguagesSection";
export { default as CertificatesSection } from "./CertificatesSection";
export { default as LinksSection } from "./LinksSection";
export { default as PortfolioSection } from "./PortfolioSection";
export { default as LikelionCodeSection } from "./LikelionCodeSection";
