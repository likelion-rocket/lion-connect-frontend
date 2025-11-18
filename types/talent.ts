/**
 * 인재 상세 조회 관련 타입 정의
 */

/**
 * 경력 사항
 */
export interface WorkExperience {
  id: number;
  companyName: string;
  department: string;
  position: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  isCurrent: boolean;
  description: string;
}

/**
 * 학력 사항
 */
export interface Education {
  id: number;
  schoolName: string;
  major: string;
  status: "GRADUATED" | "ENROLLED" | "WITHDRAWN" | "LEAVE_OF_ABSENCE";
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  degree: string | null;
  description: string;
}

/**
 * 자격증
 */
export interface Certification {
  id: number;
  name: string;
  issuer: string;
  issueDate: string; // YYYY-MM-DD
}

/**
 * 수상 경력
 */
export interface Award {
  id: number;
  name: string;
  issuer: string;
  issueDate: string; // YYYY-MM-DD
  description?: string;
}

/**
 * 어학 능력
 */
export interface LanguageDetail {
  id: number;
  languageName: string;
  level: string | null;
  issueDate: string; // YYYY-MM-DD
}

/**
 * 인재 상세 정보 응답
 */
export interface TalentDetailResponse {
  id: number;
  name: string;
  introduction: string;
  jobRoles: string[];
  tendencies: string[];
  experiences: string[];
  skills: string[];
  languages: string[];
  thumbnailUrl: string | null;
  portfolioUrl: string | null;
  externalLink: string | null;
  likelionCertified: boolean;
  updatedAt: string; // ISO 8601
  workExperiences: WorkExperience[];
  educations: Education[];
  certifications: Certification[];
  awards: Award[];
  languageDetails: LanguageDetail[];
}
