import {
  LoginFormData,
  LoginResponse,
  SignupFormData,
  SignupRequestData,
  SignupResponse,
} from "@/types/auth";
import { post, refreshAccessToken } from "@/lib/apiClient";
import { API_ENDPOINTS, API_BASE_URL } from "@/constants/api";

/**
 * 로그인 API 호출
 * @param data - 로그인 폼 데이터 (이메일, 비밀번호)
 * @returns 로그인 응답 (액세스 토큰 + 사용자 정보)
 * @throws ApiError - API 요청 실패 시
 *
 * 토큰 관리:
 * - 액세스 토큰: Authorization 헤더에서 추출 (Zustand 저장용)
 * - 리프레시 토큰: 백엔드에서 HttpOnly 쿠키로 자동 설정
 */
export async function loginAPI(data: LoginFormData): Promise<LoginResponse> {
  console.log("🔐 [loginAPI] 로그인 시작");

  // 백엔드 직접 호출 (fetch 사용 - Response 헤더 접근 필요)
  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 리프레시 토큰 쿠키 받기 위해
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  console.log("🔐 [loginAPI] 응답 상태:", response.status);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "로그인에 실패했습니다");
  }

  // Set-Cookie 헤더 확인 (디버깅용 - CORS 제한으로 보이지 않을 수 있음)
  const setCookieHeader = response.headers.get("Set-Cookie");
  console.log("🔐 [loginAPI] Set-Cookie 헤더:", setCookieHeader || "없음 (CORS 제한)");

  // Authorization 헤더에서 액세스 토큰 추출
  const authHeader = response.headers.get("Authorization");
  const accessToken = authHeader?.replace("Bearer ", "") || "";

  console.log("🔐 [loginAPI] Authorization 헤더:", authHeader ? "존재" : "없음");

  if (!accessToken) {
    throw new Error("액세스 토큰을 받지 못했습니다");
  }

  // 응답 바디 파싱
  const responseData = await response.json();

  // 사용자 정보 검증
  if (!responseData.user) {
    throw new Error("사용자 정보를 받지 못했습니다");
  }

  // 로그인 후 쿠키 확인
  setTimeout(() => {
    const cookies = document.cookie;
    const hasRefreshToken = cookies.includes("refreshToken");
    console.log(
      "🔐 [loginAPI] 로그인 후 쿠키 확인:",
      hasRefreshToken ? "✅ refreshToken 존재" : "❌ refreshToken 없음"
    );
    if (!hasRefreshToken) {
      console.warn("⚠️ [loginAPI] 백엔드가 refreshToken 쿠키를 설정하지 않았습니다!");
      console.log("🔐 [loginAPI] 현재 모든 쿠키:", cookies);
    }
  }, 100);

  console.log("✅ [loginAPI] 로그인 성공:", { email: responseData.user.email });

  // 액세스 토큰을 포함한 응답 반환
  return {
    success: true,
    message: "로그인 성공",
    accessToken,
    user: responseData.user,
  };
}

/**
 * 로그아웃 API 호출
 * @returns 로그아웃 응답
 * @throws ApiError - API 요청 실패 시
 *
 * 백엔드에서:
 * - HttpOnly 쿠키에 저장된 리프레시 토큰 삭제
 * - 클라이언트에서는 Zustand 저장소의 액세스 토큰 및 사용자 정보 삭제
 */
export async function logoutAPI(): Promise<{ success: boolean; message: string }> {
  return post(
    API_ENDPOINTS.AUTH.LOGOUT,
    {},
    { skipAuth: false } // 액세스 토큰 포함해서 전송
  );
}

/**
 * 회원가입 API 호출
 * @param data - 회원가입 폼 데이터 (이메일, 비밀번호, 전화번호)
 * @returns 회원가입 응답
 * @throws ApiError - API 요청 실패 시
 *
 * 보안 고려사항:
 * - confirmPassword와 agreeTerms는 클라이언트 측에서만 사용 (서버로 전송 안 함)
 * - 비밀번호는 서버에서 해싱 처리 필요
 * - HTTPS 통신 필수 (프로덕션 환경)
 */
export async function signupAPI(data: SignupFormData): Promise<SignupResponse> {
  // 서버로 전송할 데이터만 추출 (confirmPassword, agreeTerms 제외)
  const requestData: SignupRequestData = {
    email: data.email,
    password: data.password,
    phoneNumber: data.phoneNumber,
  };

  return post<SignupResponse>(API_ENDPOINTS.AUTH.SIGNUP, requestData, { skipAuth: true });
}

/**
 * 토큰 복구 API 호출 (페이지 새로고침 또는 브라우저 재시작 후 액세스 토큰 복구)
 *
 * 목적: 앱 초기화 시 한 번만 호출 (useInitializeAuth 훅에서)
 * - HttpOnly 쿠키의 리프레시 토큰으로 새 액세스 토큰 발급
 * - 사용자 정보는 localStorage에서 자동 복구됨 (Zustand persist)
 * - 성공 시: 새 액세스 토큰 반환 및 Zustand에 자동 저장
 * - 실패 시: 에러 발생 (리프레시 토큰 없음 또는 만료)
 *
 * 상태 복구 흐름:
 * 1. localStorage에서 user 자동 복구 (Zustand persist)
 * 2. recoverTokenAPI() 호출 → HttpOnly 쿠키의 리프레시 토큰으로 새 accessToken 발급
 * 3. refreshAccessToken 내부에서 자동으로 Zustand 업데이트
 *
 * @returns 액세스 토큰 문자열
 * @throws ApiError - 리프레시 토큰 없음 또는 만료된 경우
 *
 * 내부 구현:
 * - apiClient.ts의 refreshAccessToken()을 재사용 (중복 제거)
 * - 401 자동 재시도와 동일한 로직 사용
 */
export async function recoverTokenAPI(): Promise<string> {
  return refreshAccessToken();
}
