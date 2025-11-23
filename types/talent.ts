/**
 * 인재 관련 타입 정의
 * - 인재 등록/수정 Request
 * - 인재 조회 Response
 */

// ========================
// Response 타입 (GET 요청)
// ========================

/**
 * 프로필 응답 타입
 */
export interface ProfileResponse {
  id: number;
  name: string;
  introduction: string;
  storageUrl: string;
  likelionCode: string | null;
  visibility: "PUBLIC" | "PRIVATE";
  createdAt: string;
  updatedAt: string;
}

/**
 * 학력 응답 타입
 */
export interface EducationResponse {
  id: number;
  schoolName: string;
  major: string;
  status: "GRADUATED" | "ENROLLED" | "WITHDRAWN" | "LEAVE_OF_ABSENCE";
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  degree: string | null;
  description: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 경력 응답 타입
 */
export interface ExperienceResponse {
  id: number;
  companyName: string;
  department: string;
  position: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  isCurrent: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 어학 응답 타입
 */
export interface LanguageResponse {
  id: number;
  languageName: string;
  level: string;
  issueDate: string; // YYYY-MM-DD
  createdAt: string;
  updatedAt: string;
}

/**
 * 자격증 응답 타입
 */
export interface CertificationResponse {
  id: number;
  name: string;
  issuer: string;
  issueDate: string; // YYYY-MM-DD
  createdAt: string;
  updatedAt: string;
}

/**
 * 수상 경력 응답 타입
 */
export interface AwardResponse {
  id: number;
  title: string;
  organization: string;
  awardDate: string; // YYYY-MM-DD
  description: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 경험 태그 응답 타입
 */
export interface ExpTagResponse {
  id: number;
  name: string;
}

/**
 * 직무 카테고리 응답 타입
 */
export interface JobCategoryResponse {
  id: number;
  name: string;
}

/**
 * 프로필 링크 응답 타입
 */
export interface ProfileLinkResponse {
  id: number;
  type: "LINK" | "THUMBNAIL";
  url: string;
  originalFilename: string;
  contentType: string;
  fileSize: number;
}

// ========================
// Request 타입 (POST/PUT 요청)
// ========================

/**
 * 프로필 생성/수정 요청 타입
 */
export interface ProfileRequest {
  name: string;
  introduction: string;
  storageUrl: string;
  likelionCode?: string;
  visibility: "PUBLIC" | "PRIVATE";
}

/**
 * 학력 생성/수정 요청 타입
 */
export interface EducationRequest {
  schoolName: string;
  major: string;
  status: "GRADUATED" | "ENROLLED" | "WITHDRAWN" | "LEAVE_OF_ABSENCE";
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  description: string;
  degree?: string;
}

/**
 * 경력 생성/수정 요청 타입
 */
export interface ExperienceRequest {
  companyName: string;
  department: string;
  position: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  isCurrent: boolean;
  description: string;
}

/**
 * 어학 생성/수정 요청 타입
 */
export interface LanguageRequest {
  languageName: string;
  level: string;
  issueDate: string; // YYYY-MM-DD
}

/**
 * 자격증 생성/수정 요청 타입
 */
export interface CertificationRequest {
  name: string;
  issuer: string;
  issueDate: string; // YYYY-MM-DD
}

/**
 * 수상 경력 생성/수정 요청 타입
 */
export interface AwardRequest {
  title: string;
  organization: string;
  awardDate: string; // YYYY-MM-DD
  description: string;
}

/**
 * 프로필 링크 생성/수정 요청 타입
 */
export interface ProfileLinkRequest {
  type: "LINK" | "THUMBNAIL";
  url: string;
  originalFilename: string;
  contentType: string;
  fileSize: number;
}

// ========================
// 도메인 모델 (하위 호환성)
// ========================

/**
 * @deprecated Use EducationResponse instead
 */
export type Education = EducationResponse;

/**
 * @deprecated Use ExperienceResponse instead
 */
export type WorkExperience = ExperienceResponse;

/**
 * @deprecated Use CertificationResponse instead
 */
export type Certification = CertificationResponse;

/**
 * @deprecated Use AwardResponse instead
 */
export type Award = AwardResponse;

/**
 * @deprecated Use LanguageResponse instead
 */
export type LanguageDetail = LanguageResponse;

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
  storageUrl: string | null;
  likelionCertified: boolean;
  updatedAt: string; // ISO 8601
  workExperiences: ExperienceResponse[];
  educations: EducationResponse[];
  certifications: CertificationResponse[];
  awards: AwardResponse[];
  languageDetails: LanguageResponse[];
}
