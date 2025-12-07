/**
 * API 관련 상수 정의
 * - 환경변수로부터 Base URL 가져오기
 * - API 엔드포인트 중앙 관리
 * - HTTP 메서드, 타임아웃 등 설정 값
 */

// API Base URL (환경변수에서 가져오기)
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8090/api";

// API 엔드포인트
export const API_ENDPOINTS = {
  // 인증 관련
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/users/signup",
    JOINEDUSER_SIGNUP: "/users/joineduser-signup",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh",
  },
  // 사용자 관련
  USERS: {
    PROFILE: "/users/profile",
    UPDATE_PROFILE: "/users/profile",
  },

  // ✅ 학력
  EDUCATIONS: {
    CREATE: "/profile/educations", // POST
    LIST: "/profile/educations",
    UPDATE: (id: number | string) => `/profile/educations/${id}`,
    DELETE: (id: number | string) => `/profile/educations/${id}`,
  },
  PROFILES: {
    CREATE: "/profile/me", // POST - 프로필 생성
    GET: "/profile/me", // GET - 단일 프로필 조회
    UPDATE: "/profile/me", // PUT - 프로필 수정
    LIST: "/profile", // GET - 프로필 목록 조회
    DELETE: "/profile/me",
  },
  TENDENCIES: {
    UPDATE: "/profile/tendencies", // PUT
    GET: "/profile/tendencies", // GET
  },
  EXPERIENCES: {
    CREATE: "/profile/experiences",
    LIST: "/profile/experiences",
    UPDATE: (id: number) => `/profile/experiences/${id}`,
    DELETE: (id: number) => `/profile/experiences/${id}`,
  },
  LANGUAGES: {
    CREATE: "/profile/languages",
    LIST: "/profile/languages",
    UPDATE: (id: number) => `/profile/languages/${id}`,
    DELETE: (id: number) => `/profile/languages/${id}`,
  },
  CERTIFICATIONS: {
    CREATE: "/profile/certifications",
    LIST: "/profile/certifications",
    UPDATE: (id: number) => `/profile/certifications/${id}`,
    DELETE: (id: number) => `/profile/certifications/${id}`,
  },
  EXP_TAGS: {
    GET: "/profile/exp-tags", // GET
    UPDATE: "/profile/exp-tags", // PUT
  },
  SKILLS: {
    GET: "/profile/skills", // GET
    UPDATE: "/profile/skills", // PUT
  },
  CUSTOM_SKILLS: {
    GET: "/profile/custom-skills", // GET
    UPDATE: "/profile/custom-skills", // PUT
  },
  // 기업 문의
  INQUIRIES: {
    CREATE: "/inquiries", // POST - 기업 문의 제출
  },
  // 관리자 - 기업 문의 관리
  ADMIN: {
    INQUIRIES: {
      LIST: "/admin/inquiries", // GET
      UPDATE_STATUS: (id: number) => `/admin/inquiries/${id}/status`, // PATCH
    },
  },
  JOBS: {
    GET: "/profile/job-categories-with-groups", // GET
    UPDATE: "/profile/job-categories", // PUT
  },
  AWARDS: {
    CREATE: "/profile/awards",
    LIST: "/profile/awards",
    UPDATE: (id: number) => `/profile/awards/${id}`,
    DELETE: (id: number) => `/profile/awards/${id}`,
  },
  // ✅ 프로필 링크(썸네일 포함)
  PROFILE_LINKS: {
    LIST: (profileId: number | string) => `/profile/${profileId}/links`, // GET
    UPSERT: (profileId: number | string, type: string) => `/profile/${profileId}/links/${type}`, // POST/PUT
    DELETE: (profileId: number | string, type: string) => `/profile/${profileId}/links/${type}`, // DELETE
  },

  // ✅ 프로필 썸네일 presign
  PROFILE_THUMBNAIL: {
    PRESIGN: (profileId: number | string) => `/profile/${profileId}/thumbnail/presign`, // POST
    UPLOAD_COMPLETE: (profileId: number | string) => `/profile/${profileId}/thumbnail`, // POST
  },
  //프로필 PDF presign
  PROFILE_RESUME: {
    PRESIGN: (profileId: number | string) => `/profile/${profileId}/portfolio/presign`, // POST
    UPLOAD_COMPLETE: (profileId: number | string) => `/profile/${profileId}/portfolio`, // POST
  },
  // 공개 인재 검색
  TALENTS: {
    SEARCH: "/profiles/search", // GET - 인재 검색 (jobGroupId, jobRoleId, q, page, size)
  },
  // Work Driven 테스트
  WORK_DRIVEN: {
    SUBMIT: "/profile/work-driven/submit", // POST - 테스트 제출
    RESULT: "/profile/work-driven/result", // GET - 결과 조회
  },
} as const;

// HTTP 메서드
export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;

// API 설정
export const API_CONFIG = {
  TIMEOUT: 10000, // 10초
  RETRY_COUNT: 1, // 재시도 횟수
  RETRY_DELAY: 1000, // 재시도 딜레이 (ms)
} as const;

// HTTP 상태 코드
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

// 에러 메시지
export const API_ERROR_MESSAGES = {
  NETWORK_ERROR: "네트워크 연결을 확인해주세요",
  TIMEOUT_ERROR: "요청 시간이 초과되었습니다. 다시 시도해주세요",
  SERVER_ERROR: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요",
  UNKNOWN_ERROR: "알 수 없는 오류가 발생했습니다",
  UNAUTHORIZED: "인증이 필요합니다. 다시 로그인해주세요",
  FORBIDDEN: "접근 권한이 없습니다",
  NOT_FOUND: "요청하신 리소스를 찾을 수 없습니다",
} as const;
