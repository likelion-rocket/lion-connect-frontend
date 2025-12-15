/**
 * 지원 현황 관련 타입 정의
 */

// 지원 상태
export type JobApplicationStatus = "APPLIED" | "DOCUMENT_PASS" | "FINAL_PASS" | "REJECTED";

// 지원 현황 아이템
export interface JobApplication {
  jobApplicationId: number;
  status: JobApplicationStatus;
  appliedAt: string; // ISO 8601 날짜 문자열
  canceledAt: string | null; // ISO 8601 날짜 문자열
  companyName: string;
  jobPostingTitle: string;
  jobGroupName: string;
  jobRoleName: string;
}

// 페이지 정렬 정보
export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

// 페이지 정보
export interface Pageable {
  offset: number;
  sort: Sort;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}

// 지원 현황 목록 응답
export interface JobApplicationsResponse {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: JobApplication[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}

// 지원 현황 목록 요청 파라미터
export interface JobApplicationsRequest {
  page: number;
  size: number;
  sort?: string[];
}

// 채용공고 지원 요청
export interface ApplyJobRequest {
  talentProfileId: number;
}

// 채용공고 지원 응답
export interface ApplyJobResponse {
  jobApplicationId: number;
  jobPostingId: number;
  talentProfileId: number;
  status: JobApplicationStatus;
}
