/**
 * Server-side API 클라이언트
 * - Server Components와 Server Actions에서만 사용
 * - 인증 토큰 없이 공개 API 호출
 * - 명시적으로 환경변수 사용
 */

import { API_ERROR_MESSAGES, HTTP_STATUS } from "@/constants/api";

// Server-side에서 환경변수 명시적으로 사용
const getApiBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.maple109.store/api";
};

// API 에러 클래스
export class ServerApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string
  ) {
    super(message);
    this.name = "ServerApiError";
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
      throw new ServerApiError(errorMessage || "잘못된 요청입니다", response.status, errorCode);
    case HTTP_STATUS.UNAUTHORIZED:
      throw new ServerApiError(
        errorMessage || API_ERROR_MESSAGES.UNAUTHORIZED,
        response.status,
        "UNAUTHORIZED"
      );
    case HTTP_STATUS.FORBIDDEN:
      throw new ServerApiError(
        errorMessage || API_ERROR_MESSAGES.FORBIDDEN,
        response.status,
        "FORBIDDEN"
      );
    case HTTP_STATUS.NOT_FOUND:
      throw new ServerApiError(
        errorMessage || API_ERROR_MESSAGES.NOT_FOUND,
        response.status,
        "NOT_FOUND"
      );
    case HTTP_STATUS.CONFLICT:
      throw new ServerApiError(errorMessage || "이미 존재하는 데이터입니다", response.status, "CONFLICT");
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
    case HTTP_STATUS.BAD_GATEWAY:
    case HTTP_STATUS.SERVICE_UNAVAILABLE:
      throw new ServerApiError(
        errorMessage || API_ERROR_MESSAGES.SERVER_ERROR,
        response.status,
        "SERVER_ERROR"
      );
    default:
      throw new ServerApiError(errorMessage, response.status, errorCode);
  }
}

/**
 * Server-side GET 요청
 */
export async function serverGet<T>(endpoint: string): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const url = endpoint.startsWith("http") ? endpoint : `${baseUrl}${endpoint}`;

  console.log("[serverGet] Fetching URL:", url);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // ISR을 위해 revalidate 사용하므로 no-store
    });

    // 응답 상태 확인
    if (!response.ok) {
      await handleResponseError(response);
    }

    // 204 No Content 처리
    if (response.status === HTTP_STATUS.NO_CONTENT) {
      return {} as T;
    }

    // Content-Type 확인
    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const text = await response.text();
      if (!text || text.trim() === "") {
        return {} as T;
      }
      try {
        return JSON.parse(text) as T;
      } catch {
        return {} as T;
      }
    }

    // JSON 응답 파싱
    const data = await response.json();
    return data as T;
  } catch (error) {
    // ServerApiError는 그대로 전달
    if (error instanceof ServerApiError) {
      throw error;
    }

    // 예상치 못한 에러
    console.error("[serverGet] Unexpected error:", error);
    throw new ServerApiError(API_ERROR_MESSAGES.UNKNOWN_ERROR, undefined, "UNEXPECTED_ERROR");
  }
}
