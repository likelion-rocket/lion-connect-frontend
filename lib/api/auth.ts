import {
  LoginFormData,
  LoginResponse,
  SignupFormData,
  SignupRequestData,
  SignupResponse,
} from "@/types/auth";
import { post } from "@/lib/apiClient";
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

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "로그인에 실패했습니다");
  }

  // Authorization 헤더에서 액세스 토큰 추출
  const authHeader = response.headers.get("Authorization");
  const accessToken = authHeader?.replace("Bearer ", "") || "";

  if (!accessToken) {
    throw new Error("액세스 토큰을 받지 못했습니다");
  }

  // 응답 바디 파싱
  const responseData = await response.json();

  // 사용자 정보 검증
  if (!responseData.user) {
    throw new Error("사용자 정보를 받지 못했습니다");
  }

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
 * - 리프레시 토큰 세션 삭제
 * - 리프레시 토큰 쿠키 삭제
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
    phone: data.phone,
  };

  return post<SignupResponse>(API_ENDPOINTS.AUTH.SIGNUP, requestData, { skipAuth: true });
}
