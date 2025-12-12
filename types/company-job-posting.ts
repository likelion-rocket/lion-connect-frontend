/**
 * 기업 채용공고 관련 타입 정의
 */

// 채용공고 상태
export type JobPostingStatus = "DRAFT" | "PUBLISHED" | "CLOSED";

// 채용공고 아이템
export interface JobPosting {
  jobPostingId: number;
  title: string;
  jobGroupName: string;
  jobRoleName: string;
  status: JobPostingStatus;
  publishedAt: string | null;
  createdAt: string;
  totalApplicationsCount: number;
  thumbnailImageUrl: string | null;
}

// 페이지 정보
export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

// 페이지네이션 응답
export interface PagedResponse<T> {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

// 채용공고 목록 응답
export type JobPostingsResponse = PagedResponse<JobPosting>;

// 채용공고 목록 요청 파라미터
export interface JobPostingsParams {
  page?: number;
  size?: number;
  sort?: string[];
  status?: JobPostingStatus | null;
}
