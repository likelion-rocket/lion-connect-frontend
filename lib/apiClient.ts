/**
 * API 클라이언트 유틸리티
 * - 중앙화된 fetch 래퍼
 * - 에러 핸들링 (네트워크 오류, 타임아웃, HTTP 에러)
 * - 요청/응답 인터셉터
 * - Zustand에서 액세스 토큰 자동 추가
 * - 401 에러 시 자동 토큰 리프레시
 */

import {
  API_BASE_URL,
  API_CONFIG,
  API_ERROR_MESSAGES,
  HTTP_STATUS,
  API_ENDPOINTS,
} from "@/constants/api";
import { useAuthStore } from "@/store/authStore";

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
  skipAuth?: boolean; // 인증 헤더 스킵 옵션 (로그인/회원가입 등)
  skipCredentials?: boolean; // credentials 스킵 옵션 (공개 API)
  _isRetry?: boolean; // 내부 플래그: 이미 재시도한 요청인지 표시 (무한 루프 방지)
};

// 리프레시 토큰 요청 중 플래그 (중복 방지)
let isRefreshing: boolean = false;
let refreshSubscribers: ((token: string) => void)[] = [];

/**
 * 리프레시 완료 후 대기 중인 요청들에게 새 토큰 전달
 */
function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

/**
 * 리프레시 대기열에 추가
 */
function addRefreshSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

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
 * 토큰 리프레시 함수
 * - Authorization 헤더 우선, 없으면 응답 body에서 추출
 * - 앱 초기화(useInitializeAuth)와 401 자동 재시도에서 모두 사용
 */
export async function refreshAccessToken(): Promise<string> {
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`, {
    method: "POST",
    credentials: "include", // 리프레시 토큰 쿠키 포함
  });

  if (!response.ok) {
    // 에러 메시지 추출
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || "세션이 만료되었습니다. 다시 로그인해주세요.";

    console.error("❌ [refreshAccessToken] 리프레시 실패:", {
      status: response.status,
      message: errorMessage,
      errorData,
    });

    // 리프레시 실패 시 로그아웃 처리
    useAuthStore.getState().clearAuth();

    throw new ApiError(errorMessage, response.status, "REFRESH_FAILED");
  }

  // 1순위: Authorization 헤더에서 토큰 추출
  const authHeader = response.headers.get("Authorization");
  let newAccessToken = authHeader?.replace("Bearer ", "") || "";

  // 2순위: 응답 body에서 토큰 추출 (헤더에 없는 경우)
  if (!newAccessToken) {
    try {
      const responseData = await response.json();
      newAccessToken = responseData.accessToken || "";
    } catch (error) {
      console.error("❌ [refreshAccessToken] JSON 파싱 실패:", error);
    }
  }

  if (!newAccessToken) {
    console.error("❌ [refreshAccessToken] 토큰을 찾을 수 없음");
    throw new ApiError("토큰 갱신에 실패했습니다.", 401, "NO_ACCESS_TOKEN");
  }

  // Zustand에 새 토큰 저장
  useAuthStore.getState().updateAccessToken(newAccessToken);

  return newAccessToken;
}

/**
 * API 요청을 보내는 범용 함수
 * - Zustand에서 액세스 토큰 자동 추가
 * - 401 에러 시 자동 토큰 리프레시 및 재시도
 */
export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  // URL 구성 (endpoint가 절대 경로인 경우 그대로 사용, 상대 경로인 경우 BASE_URL 추가)
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;

  // 기본 헤더 설정
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Zustand에서 액세스 토큰 가져와서 Authorization 헤더 추가
  if (!options.skipAuth) {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
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
      credentials: options.skipCredentials ? "omit" : "include", // 조건부 credentials
    });

    // 401 Unauthorized 처리 (토큰 만료)
    // _isRetry가 true면 이미 재시도한 요청이므로 무한 루프 방지
    if (response.status === HTTP_STATUS.UNAUTHORIZED && !options.skipAuth && !options._isRetry) {
      // 이미 리프레시 중이면 대기
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          addRefreshSubscriber((token: string) => {
            // 새 토큰으로 재시도
            headers["Authorization"] = `Bearer ${token}`;
            fetchWithTimeout(url, {
              ...options,
              headers,
              credentials: options.skipCredentials ? "omit" : "include",
              _isRetry: true, // 재시도 플래그 설정
            })
              .then((retryResponse) => {
                if (retryResponse.ok) {
                  return retryResponse.json();
                }
                return handleResponseError(retryResponse);
              })
              .then(resolve)
              .catch(reject);
          });
        });
      }

      // 리프레시 시작
      isRefreshing = true;

      try {
        const newAccessToken = await refreshAccessToken();
        isRefreshing = false;
        onRefreshed(newAccessToken);

        // 새 토큰으로 원래 요청 재시도
        headers["Authorization"] = `Bearer ${newAccessToken}`;
        const retryResponse = await fetchWithTimeout(url, {
          ...options,
          headers,
          credentials: options.skipCredentials ? "omit" : "include",
          _isRetry: true, // 재시도 플래그 설정
        });

        if (!retryResponse.ok) {
          await handleResponseError(retryResponse);
        }

        // 204 No Content 처리
        if (retryResponse.status === HTTP_STATUS.NO_CONTENT) {
          return {} as T;
        }

        const data = await retryResponse.json();
        return data as T;
      } catch (refreshError) {
        isRefreshing = false;
        refreshSubscribers = [];
        throw refreshError;
      }
    }

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
