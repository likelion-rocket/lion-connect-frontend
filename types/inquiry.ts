/**
 * 기업 문의 관련 타입 정의
 */

/**
 * 문의 상태
 */
export type InquiryStatus = "NEW" | "IN_PROGRESS" | "DONE";

/**
 * 기업 문의 데이터
 */
export interface Inquiry {
  id: number;
  profileId: number;
  profileName: string;
  profileStorageUrl: string;
  companyName: string;
  contactPerson: string;
  department: string;
  position: string;
  email: string;
  phoneNumber: string;
  content: string;
  privacyPolicyAgreed: boolean;
  status: InquiryStatus;
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
}

/**
 * 정렬 객체
 */
export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

/**
 * 페이지 정보
 */
export interface Pageable {
  offset: number;
  sort: Sort;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}

/**
 * 문의 목록 조회 응답
 */
export interface InquiryListResponse {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: Inquiry[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}

/**
 * 문의 목록 조회 요청 파라미터
 */
export interface InquiryListParams {
  status?: InquiryStatus;
  profileId?: number;
  profileName?: string;
  receivedFrom?: string; // ISO 8601 date format (YYYY-MM-DD)
  receivedTo?: string; // ISO 8601 date format (YYYY-MM-DD)
  page?: number; // 0-based page index
  size?: number;
  sort?: string[]; // e.g., ["createdAt,desc", "id,asc"]
}

/**
 * 문의 상태 업데이트 요청
 */
export interface UpdateInquiryStatusRequest {
  status: InquiryStatus;
}

/**
 * 기업 문의 생성 요청
 */
export interface CreateInquiryRequest {
  companyName: string;
  contactPerson: string;
  department: string;
  position: string;
  email: string;
  phoneNumber: string;
  content: string;
  agreePrivacy: boolean;
}
