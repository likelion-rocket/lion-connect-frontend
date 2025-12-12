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

/**
 * 이미지 메타데이터
 */
export interface JobImageMetadata {
  objectKey: string;
  contentType: string;
  fileSize: number;
  originalFilename: string;
  sortOrder: number;
}

/**
 * 채용 공고 등록/수정 요청 바디
 */
export interface JobPostingRequest {
  title: string;
  employmentType: EmploymentType;
  jobRoleId: number;
  jobDescription: string;
  mainTasks: string;
  requirements: string;
  preferred: string;
  benefits: string;
  hiringProcess: string;
  workplace: string;
  status: "DRAFT" | "PUBLISHED";
  images: JobImageMetadata[];
}

/**
 * 채용 공고 등록/수정 응답
 */
export interface JobPostingResponse {
  jobPostingId: number;
  title: string;
  jobGroupName: string;
  jobRoleName: string;
  employmentType: EmploymentType;
  status: "DRAFT" | "PUBLISHED";
  publishedAt: string;
  createdAt: string;
  totalApplicationsCount: number;
}

/**
 * 프리사인 URL 발급 요청
 */
export interface PresignBulkRequest {
  files: {
    originalFilename: string;
    contentType: string;
  }[];
}

/**
 * 프리사인 URL 응답
 */
export interface PresignUpload {
  uploadUrl: string;
  fileUrl: string;
  objectKey: string;
}

export interface PresignBulkResponse {
  uploads: {
    originalFilename: string;
    contentType: string;
    objectKey: string;
    upload: PresignUpload;
    fileUrl: string;
  }[];
}
