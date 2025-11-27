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
  SkillResponse,
} from "@/types/talent";
import type { User } from "@/store/authStore";
import { findJobGroupById, findJobRoleById } from "@/constants/jobMapping";
import { EXP_TAG_ID_MAP } from "@/lib/expTags/map";

/**
 * yyyy-mm-dd 형식을 yyyy-mm 형식으로 변환
 * @param dateString - yyyy-mm-dd 형식의 날짜 문자열
 * @returns yyyy-mm 형식의 날짜 문자열 (빈 값이면 빈 문자열)
 */
function convertFullDateToMonth(dateString?: string | null): string {
  if (!dateString || dateString.trim() === "") {
    return "";
  }
  // yyyy-mm-dd 형식이면 yyyy-mm만 추출
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString.substring(0, 7); // "2025-01-01" → "2025-01"
  }
  // 이미 yyyy-mm 형식이면 그대로 반환
  return dateString;
}

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
    skills: SkillResponse[];
  },
  user: User | null
): Partial<TalentRegisterFormValues> {
  // 프로필 썸네일 찾기
  const thumbnail = data.profileLinks.find((link) => link.type === "THUMBNAIL");

  // 일반 링크들 (LINK 타입만) 추출
  const generalLinks = data.profileLinks
    .filter((link) => link.type === "LINK")
    .map((link) => ({
      id: link.id,
      url: link.url,
    }));

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
      // jobCategories[0]은 직군, jobCategories[1]은 직무
      // ID로 code 찾기
      category: data.jobCategories[0] ? findJobGroupById(data.jobCategories[0].id)?.code || "" : "",
      role: data.jobCategories[1] ? findJobRoleById(data.jobCategories[1].id)?.role.code || "" : "",
      // expTags의 id를 EXP_TAG_ID_MAP의 key(문자열)로 역변환
      experiences: data.expTags
        .map((tag) => {
          // id로 key 찾기 (예: 1 → "bootcamp")
          const entry = Object.entries(EXP_TAG_ID_MAP).find(([, value]) => value === tag.id);
          return entry ? entry[0] : null;
        })
        .filter((key): key is string => key !== null),
    },

    // 학력 (배열 전체 지원)
    educations:
      data.educations.length > 0
        ? data.educations.map((edu) => ({
            id: edu.id,
            schoolName: edu.schoolName,
            major: edu.major || "",
            status:
              edu.status === "GRADUATED" || edu.status === "ENROLLED" || edu.status === "COMPLETED"
                ? edu.status
                : undefined,
            startDate: convertFullDateToMonth(edu.startDate),
            endDate: convertFullDateToMonth(edu.endDate),
            description: edu.description || "",
            degree: edu.degree || "",
          }))
        : [
            {
              schoolName: "",
              major: "",
              status: undefined,
              startDate: "",
              endDate: "",
              description: "",
              degree: "",
            },
          ],

    // 경력 (배열 전체 지원)
    careers:
      data.experiences.length > 0
        ? data.experiences.map((exp) => ({
            id: exp.id,
            companyName: exp.companyName,
            department: exp.department || "",
            position: exp.position || "",
            startDate: convertFullDateToMonth(exp.startDate),
            endDate: convertFullDateToMonth(exp.endDate),
            isCurrent: exp.isCurrent,
            description: exp.description || "",
          }))
        : [
            {
              companyName: "",
              department: "",
              position: "",
              startDate: "",
              endDate: "",
              isCurrent: false,
              description: "",
            },
          ],

    // 스킬 (SkillResponse[] → {id, name}[] 구조로 변경하여 명시적 id 관리)
    skills: {
      main:
        data.skills.length > 0
          ? data.skills.map((skill) => ({
              id: skill.id,
              name: skill.name,
            }))
          : [{ name: "" }],
    },

    // 수상/활동 (awards → activities 매핑)
    activities:
      data.awards.length > 0
        ? data.awards.map((award) => ({
            id: award.id,
            title: award.title,
            organization: award.organization,
            awardDate: convertFullDateToMonth(award.awardDate),
            description: award.description,
          }))
        : [{ title: "", organization: "", awardDate: "", description: "" }],

    // 어학
    languages:
      data.languages.length > 0
        ? data.languages.map((lang) => ({
            id: lang.id,
            languageName: lang.languageName,
            level: lang.level,
            issueDate: convertFullDateToMonth(lang.issueDate),
          }))
        : [{ languageName: "", level: "", issueDate: "" }],

    // 자격증
    certificates:
      data.certifications.length > 0
        ? data.certifications.map((cert) => ({
            id: cert.id,
            name: cert.name,
            issuer: cert.issuer || "",
            issueDate: convertFullDateToMonth(cert.issueDate),
          }))
        : [{ name: "", issuer: "", issueDate: "" }],

    // 링크 (LINK 타입 배열)
    links: generalLinks.length > 0 ? generalLinks : [{ url: "" }],

    // 포트폴리오 URL (profile.storageUrl)
    portfolio: data.profile?.storageUrl || "",

    // 멋사 코드
    likelion: {
      code: data.profile?.likelionCode || "",
    },
  };
}
