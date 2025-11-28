/**
 * 인재 등록 페이지 통합 API
 * - 페이지 진입 시 모든 섹션 데이터 한번에 조회
 * - api-integration SKILL 패턴 준수
 */

import { get } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import { fetchMyProfile } from "./profiles";
import { fetchMyEducations } from "./educations";
import { fetchMyExperiences } from "./experiences";
import { fetchMyLanguages } from "./languages";
import { fetchMyCertifications } from "./certifications";
import { fetchMyAwards } from "./awards";
import { fetchMyExpTags } from "./expTags";
import { fetchMyJobs } from "./jobs";
import { fetchMySkills } from "./skills";
import { fetchMyCustomSkills } from "./customSkills";
import { fetchWorkDrivenTestResult } from "./workDriven";
import type {
  ProfileResponse,
  EducationResponse,
  ExperienceResponse,
  LanguageResponse,
  CertificationResponse,
  AwardResponse,
  ExpTagResponse,
  JobCategoryResponse,
  ProfileLinkResponse,
  SkillResponse,
  CustomSkillResponse,
  WorkDrivenTestResultResponse,
} from "@/types/talent";

/**
 * 프로필 링크 목록 조회 (GET /api/profile/me/links)
 */
export function fetchMyProfileLinks(): Promise<ProfileLinkResponse[]> {
  return get<ProfileLinkResponse[]>(API_ENDPOINTS.PROFILE_LINKS.LIST, {
    credentials: "include",
  });
}

/**
 * 인재 등록 페이지 전체 데이터 타입
 */
export type TalentRegisterData = {
  profile: ProfileResponse | null;
  educations: EducationResponse[];
  experiences: ExperienceResponse[];
  languages: LanguageResponse[];
  certifications: CertificationResponse[];
  awards: AwardResponse[];
  expTags: ExpTagResponse[];
  jobCategories: JobCategoryResponse[];
  profileLinks: ProfileLinkResponse[];
  skills: SkillResponse[];
  customSkills: CustomSkillResponse[];
  workDrivenTestResult: WorkDrivenTestResultResponse | null;
};

/**
 * 인재 등록 페이지 전체 데이터 조회
 * - 모든 섹션 데이터를 병렬로 조회
 * - 프로필이 없으면 null 반환 (신규 등록)
 * - 다른 섹션은 빈 배열 반환
 */
export async function fetchTalentRegisterData(): Promise<TalentRegisterData> {
  try {
    // 병렬로 모든 데이터 조회
    const [
      profile,
      educations,
      experiences,
      languages,
      certifications,
      awards,
      expTags,
      jobCategories,
      profileLinks,
      skills,
      customSkills,
      workDrivenTestResult,
    ] = await Promise.allSettled([
      fetchMyProfile(),
      fetchMyEducations(),
      fetchMyExperiences(),
      fetchMyLanguages(),
      fetchMyCertifications(),
      fetchMyAwards(),
      fetchMyExpTags(),
      fetchMyJobs(),
      fetchMyProfileLinks(),
      fetchMySkills(),
      fetchMyCustomSkills(),
      fetchWorkDrivenTestResult(),
    ]);

    return {
      // 프로필이 없으면 null (신규 등록)
      profile: profile.status === "fulfilled" ? profile.value : null,

      // 다른 섹션은 실패 시 빈 배열
      educations: educations.status === "fulfilled" ? educations.value : [],
      experiences: experiences.status === "fulfilled" ? experiences.value : [],
      languages: languages.status === "fulfilled" ? languages.value : [],
      certifications: certifications.status === "fulfilled" ? certifications.value : [],
      awards: awards.status === "fulfilled" ? awards.value : [],
      expTags: expTags.status === "fulfilled" ? expTags.value : [],
      jobCategories: jobCategories.status === "fulfilled" ? jobCategories.value : [],
      profileLinks: profileLinks.status === "fulfilled" ? profileLinks.value : [],
      skills: skills.status === "fulfilled" ? skills.value : [],
      customSkills: customSkills.status === "fulfilled" ? customSkills.value : [],

      // Work Driven 테스트 결과 (없으면 null)
      workDrivenTestResult:
        workDrivenTestResult.status === "fulfilled" ? workDrivenTestResult.value : null,
    };
  } catch (error) {
    console.error("Failed to fetch talent register data:", error);
    throw error;
  }
}
