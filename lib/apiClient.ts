/**
 * API 클라이언트 유틸리티
 * - 중앙화된 fetch 래퍼
 * - 에러 핸들링 (네트워크 오류, 타임아웃, HTTP 에러)
 * - 요청/응답 인터셉터
 * - 보안 헤더 자동 추가
 */

import { API_BASE_URL, API_CONFIG, API_ERROR_MESSAGES, HTTP_STATUS } from "@/constants/api";

// API 에러 클래스
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// 요청 옵션 타입
type RequestOptions = RequestInit & {
  timeout?: number;
};

/**
 * 타임아웃 기능이 있는 fetch 래퍼
 */
async function fetchWithTimeout(url: string, options: RequestOptions = {}): Promise<Response> {
  const { timeout = API_CONFIG.TIMEOUT, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);

    // 타임아웃 에러
    if (error instanceof Error && error.name === "AbortError") {
      throw new ApiError(API_ERROR_MESSAGES.TIMEOUT_ERROR, undefined, "TIMEOUT");
    }

    // 네트워크 에러
    if (error instanceof TypeError) {
      throw new ApiError(API_ERROR_MESSAGES.NETWORK_ERROR, undefined, "NETWORK_ERROR");
    }

    throw error;
  }
}

/**
 * HTTP 응답 에러 처리
 */
async function handleResponseError(response: Response): Promise<never> {
  let errorMessage = API_ERROR_MESSAGES.UNKNOWN_ERROR;
  let errorCode = "UNKNOWN_ERROR";

  // 응답 본문에서 에러 메시지 추출 시도
  try {
    const errorData = await response.json();
    errorMessage = errorData.message || errorData.error || errorMessage;
    errorCode = errorData.code || errorCode;
  } catch {
    // JSON 파싱 실패 시 기본 메시지 사용
  }

  // HTTP 상태 코드별 처리
  switch (response.status) {
    case HTTP_STATUS.BAD_REQUEST:
      throw new ApiError(errorMessage || "잘못된 요청입니다", response.status, errorCode);
    case HTTP_STATUS.UNAUTHORIZED:
      throw new ApiError(
        errorMessage || API_ERROR_MESSAGES.UNAUTHORIZED,
        response.status,
        "UNAUTHORIZED"
      );
    case HTTP_STATUS.FORBIDDEN:
      throw new ApiError(
        errorMessage || API_ERROR_MESSAGES.FORBIDDEN,
        response.status,
        "FORBIDDEN"
      );
    case HTTP_STATUS.NOT_FOUND:
      throw new ApiError(
        errorMessage || API_ERROR_MESSAGES.NOT_FOUND,
        response.status,
        "NOT_FOUND"
      );
    case HTTP_STATUS.CONFLICT:
      throw new ApiError(errorMessage || "이미 존재하는 데이터입니다", response.status, "CONFLICT");
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
    case HTTP_STATUS.BAD_GATEWAY:
    case HTTP_STATUS.SERVICE_UNAVAILABLE:
      throw new ApiError(
        errorMessage || API_ERROR_MESSAGES.SERVER_ERROR,
        response.status,
        "SERVER_ERROR"
      );
    default:
      throw new ApiError(errorMessage, response.status, errorCode);
  }
}

/**
 * API 요청을 보내는 범용 함수
 */
export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  // URL 구성 (endpoint가 절대 경로인 경우 그대로 사용, 상대 경로인 경우 BASE_URL 추가)
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;

  // 기본 헤더 설정
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // 토큰이 있으면 Authorization 헤더 추가
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  // 추가 헤더 병합
  if (options.headers) {
    Object.entries(options.headers).forEach(([key, value]) => {
      if (typeof value === "string") {
        headers[key] = value;
      }
    });
  }

  try {
    // 요청 전송
    const response = await fetchWithTimeout(url, {
      ...options,
      headers,
    });

    // 응답 상태 확인
    if (!response.ok) {
      await handleResponseError(response);
    }

    // 204 No Content 처리
    if (response.status === HTTP_STATUS.NO_CONTENT) {
      return {} as T;
    }

    // JSON 응답 파싱
    const data = await response.json();
    return data as T;
  } catch (error) {
    // ApiError는 그대로 전달
    if (error instanceof ApiError) {
      throw error;
    }

    // 예상치 못한 에러
    console.error("Unexpected API error:", error);
    throw new ApiError(API_ERROR_MESSAGES.UNKNOWN_ERROR, undefined, "UNEXPECTED_ERROR");
  }
}

/**
 * GET 요청
 */
export async function get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: "GET",
  });
}

/**
 * POST 요청
 */
export async function post<T>(
  endpoint: string,
  data?: unknown,
  options?: RequestOptions
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT 요청
 */
export async function put<T>(
  endpoint: string,
  data?: unknown,
  options?: RequestOptions
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PATCH 요청
 */
export async function patch<T>(
  endpoint: string,
  data?: unknown,
  options?: RequestOptions
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: "PATCH",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE 요청
 */
export async function del<T>(endpoint: string, options?: RequestOptions): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    method: "DELETE",
  });
}
