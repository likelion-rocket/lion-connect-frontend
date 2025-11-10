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
    // 필요해지면 READ/LIST/UPDATE/DELETE도 여기에 추가
    LIST: "/profile/educations",
    // DETAIL: (id: number | string) => `/profile/educations/${id}`,
    // UPDATE: (id: number | string) => `/profile/educations/${id}`,
    // DELETE: (id: number | string) => `/profile/educations/${id}`,
  },
  PROFILES: {
    CREATE: "/profile/me", // ✅ 여기 추가
    GET: "/profile/me", // GET
    UPDATE: "/profile/me", // ✅ 추가 (PUT)
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
