/**
 * 채용 공고 관련 타입 정의
 */

export type EmploymentType = "FULL_TIME" | "INTERN";

/**
 * 채용 공고 폼 데이터
 */
export interface JobFormData {
  images: File[];
  title: string;
  employmentType: EmploymentType;
  jobRoleId: number;
  description: string;
  responsibilities: string;
  requirements: string;
  preferredQualifications: string;
  benefits: string;
  hiringProcess: string;
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
