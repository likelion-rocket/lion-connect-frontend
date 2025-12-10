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

// ───────────────── 사용자 관리 타입 ─────────────────

/**
 * 관리자 - 사용자 목록 단일 항목
 */
export type AdminUserItem = {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  joinedAt: string;
  roles: string[];
  locked?: boolean; // 프로필 잠금 상태
};

/**
 * 관리자 - 사용자 목록 응답 (페이지네이션 포함)
 */
export type AdminUsersResponse = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: AdminUserItem[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  };
  empty: boolean;
};

/**
 * 프로필 잠금/해제 응답 타입
 */
export type ProfileLockResponse = {
  id: number;
  name: string;
  title: string;
  introduction: string;
  storageUrl: string;
  likelionCode: string;
  visibility: "PUBLIC" | "PRIVATE";
  status: "DRAFT" | "PUBLISHED";
  locked: boolean;
  createdAt: string;
  updatedAt: string;
};

// ───────────────── 기업 회원 관리 타입 ─────────────────

/**
 * 관리자 - 기업 회원 목록 단일 항목
 * AdminUserItem과 유사하나 companyLocked 필드 사용
 */
export type AdminCompanyItem = {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  joinedAt: string;
  roles: string[];
  companyLocked?: boolean; // 기업 회원 잠금 상태
};

/**
 * 관리자 - 기업 회원 목록 응답 (페이지네이션 포함)
 */
export type AdminCompaniesResponse = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: AdminCompanyItem[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
  };
  empty: boolean;
};
