/**
 * 기업 문의 관련 타입 정의
 */

/**
 * 문의 상태
 */
export type InquiryStatus = "new" | "done";

/**
 * 문의 기간 필터
 */
export type InquiryPeriod =
  | "12h" // 12시간 이내
  | "24h" // 24시간 이내
  | "2d" // 이틀 이내
  | "3d" // 3일 이내
  | "1w" // 1주일 이내
  | "1m" // 한달 이내
  | "over"; // 한달 이상

/**
 * 기업 문의 데이터
 */
export interface Inquiry {
  id: string;
  companyName: string; // 담당자명
  position: string; // 회사명
  attribute: string; // 전화번호
  description: string; // 이메일(ID)
  category: string; // 부서 / 직책
  status: InquiryStatus; // 문의 상태
  content: string; // 문의 내용
  createdAt: string; // 생성 일시 (ISO 8601)
}

/**
 * 문의 목록 조회 파라미터
 */
export interface InquiryListParams {
  q?: string; // 검색어
  status?: InquiryStatus; // 상태 필터
  period?: InquiryPeriod; // 기간 필터
  page?: number; // 페이지 번호 (1부터 시작)
  limit?: number; // 페이지당 항목 수
}

/**
 * 문의 목록 응답
 */
export interface InquiryListResponse {
  data: Inquiry[];
  meta: {
    total: number; // 전체 항목 수
    page: number; // 현재 페이지
    limit: number; // 페이지당 항목 수
    totalPages: number; // 전체 페이지 수
  };
}
