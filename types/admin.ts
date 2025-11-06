// 관리자 페이지 데이터 타입 정의

/**
 * 관리자 테이블 단일 행 데이터
 */
export type AdminTableRow = {
  id: number;
  name: string;
  companyName: string;
  phoneNumber: string;
  position: string;
  keywords: string;
  description: string;
};

/**
 * 관리자 페이지 응답 데이터 (페이지네이션 포함)
 */
export type AdminTableResponse = {
  data: AdminTableRow[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
};
