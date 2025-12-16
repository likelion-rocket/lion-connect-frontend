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
  // 수정 모드에서 기존 이미지 메타데이터 전달용 (선택적)
  existingImages?: JobImageMetadata[];
}

/**
 * 채용 공고 상세 응답 데이터 (GET /api/job-postings/{id})
 */
export interface JobDetailResponse {
  jobPostingId: number;
  title: string;
  employmentType: EmploymentType;
  jobDescription: string;
  mainTasks: string;
  requirements: string;
  preferred: string;
  benefits: string;
  hiringProcess: string;
  workplace: string;
  companyName: string;
  courseName: string;
  courseGeneration: number;
  jobGroupName: string;
  jobRoleId: number;
  jobRoleName: string;
  publishedAt: string;
  images: JobImageMetadata[];
  myJobApplicationId: number | null;
  myJobApplicationStatus: "APPLIED" | "INTERVIEW" | "PASS" | "FAIL" | null;
  applied: boolean;
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
  url?: string; // S3 접근 가능한 URL (presigned URL)
  fileUrl?: string; // 호환성을 위한 별칭
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

/**
 * 이미지 업로드 완료 처리 요청
 */
export interface ImageUploadCompleteRequest {
  objectKey: string;
  originalFilename: string;
  contentType: string;
  fileSize: number;
}

/**
 * 이미지 업로드 완료 처리 응답
 */
export interface ImageUploadCompleteResponse {
  objectKey: string;
  fileUrl: string;
}
