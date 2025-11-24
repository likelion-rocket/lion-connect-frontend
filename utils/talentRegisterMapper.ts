/**
 * API Response → React Hook Form Values 매핑 유틸
 *
 * API에서 받은 데이터를 React Hook Form 스키마에 맞게 변환
 */

import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";
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
} from "@/types/talent";
import type { User } from "@/store/authStore";

/**
 * API 응답 데이터를 폼 값으로 변환
 *
 * @param data - useTalentRegisterStore에 저장된 데이터
 * @param user - authStore의 user 정보 (전화번호, 이메일)
 * @returns TalentRegisterFormValues
 */
export function mapApiDataToFormValues(
  data: {
    profile: ProfileResponse | null;
    educations: EducationResponse[];
    experiences: ExperienceResponse[];
    languages: LanguageResponse[];
    certifications: CertificationResponse[];
    awards: AwardResponse[];
    expTags: ExpTagResponse[];
    jobCategories: JobCategoryResponse[];
    profileLinks: ProfileLinkResponse[];
  },
  user: User | null
): Partial<TalentRegisterFormValues> {
  // 프로필 썸네일 찾기
  const thumbnail = data.profileLinks.find((link) => link.type === "THUMBNAIL");

  // 일반 링크 찾기
  const generalLink = data.profileLinks.find((link) => link.type === "LINK");

  return {
    // 인적사항 (authStore + ProfileResponse)
    profile: {
      avatar: thumbnail ? thumbnail.url : null,
      name: data.profile?.name || "",
      phone: user?.phoneNumber || "",
      email: user?.email || "",
      introduction: data.profile?.introduction || "",
    },

    // 직무 카테고리 & 경험 태그
    job: {
      // jobCategories는 배열인데, 폼에서는 단일 값 (첫번째 값 사용)
      category: data.jobCategories[0]?.name || "",
      role: "", // TODO: role은 별도 API가 필요할 수 있음
      // expTags의 name을 문자열 배열로 변환
      experiences: data.expTags.map((tag) => tag.name),
    },

    // 학력 (첫번째 항목만 사용, 배열은 나중에 지원)
    education: data.educations[0]
      ? {
          schoolName: data.educations[0].schoolName,
          major: data.educations[0].major || "",
          status: data.educations[0].status,
          startDate: data.educations[0].startDate,
          endDate: data.educations[0].endDate || "",
          description: data.educations[0].description || "",
          degree: data.educations[0].degree || "",
        }
      : undefined,

    // 경력 (첫번째 항목만 사용)
    career: data.experiences[0]
      ? {
          companyName: data.experiences[0].companyName,
          department: data.experiences[0].department || "",
          position: data.experiences[0].position || "",
          startDate: data.experiences[0].startDate,
          endDate: data.experiences[0].endDate || "",
          isCurrent: data.experiences[0].isCurrent,
          description: data.experiences[0].description || "",
        }
      : undefined,

    // 스킬 (TODO: 별도 API 필요)
    skills: {
      main: [],
    },

    // 수상/활동 (awards → activities 매핑)
    activities:
      data.awards.length > 0
        ? data.awards.map((award) => ({
            title: award.title,
            organization: award.organization,
            awardDate: award.awardDate,
            description: award.description,
          }))
        : [{ title: "", organization: "", awardDate: "", description: "" }],

    // 어학
    languages:
      data.languages.length > 0
        ? data.languages.map((lang) => ({
            languageName: lang.languageName,
            level: lang.level,
            issueDate: lang.issueDate,
          }))
        : [{ languageName: "", level: "", issueDate: "" }],

    // 자격증
    certificates:
      data.certifications.length > 0
        ? data.certifications.map((cert) => ({
            name: cert.name,
            issuer: cert.issuer || "",
            issueDate: cert.issueDate,
          }))
        : [{ name: "", issuer: "", issueDate: "" }],

    // 링크
    links: {
      general: generalLink?.url || "",
      portfolio: data.profile?.storageUrl || "",
    },

    // 멋사 코드
    likelion: {
      code: data.profile?.likelionCode || "",
    },
  };
}
