/**
 * 채용 공고 관련 타입 정의
 */

/**
 * 고용 형태
 */
export type EmploymentType = "FULL_TIME" | "INTERN";

/**
 * 채용 공고 폼 데이터
 */
export interface JobFormData {
  /**
   * 공고 노출 이미지 (최대 5개)
   */
  images: File[];

  /**
   * 공고명
   */
  title: string;

  /**
   * 고용 형태
   */
  employmentType: EmploymentType;

  /**
   * 회사/직무 소개
   */
  description: string;

  /**
   * 주요 업무
   */
  responsibilities: string;

  /**
   * 자격요건
   */
  requirements: string;

  /**
   * 우대사항
   */
  preferredQualifications: string;

  /**
   * 혜택 및 복지
   */
  benefits: string;

  /**
   * 채용 전형
   */
  hiringProcess: string;

  /**
   * 근무지
   */
  location: string;
}

/**
 * 채용 공고 응답 데이터 (API에서 받아오는 형태)
 */
export interface Job extends JobFormData {
  id: string;
  companyId: string;
  status: "DRAFT" | "PUBLISHED" | "CLOSED";
  createdAt: string;
  updatedAt: string;
  imageUrls?: string[];
}
