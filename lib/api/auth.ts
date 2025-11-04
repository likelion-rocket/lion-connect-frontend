import {
  LoginFormData,
  LoginResponse,
  SignupFormData,
  SignupRequestData,
  SignupResponse,
} from "@/types/auth";
import { post } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";

/**
 * 로그인 API 호출
 * @param data - 로그인 폼 데이터 (이메일, 비밀번호)
 * @returns 로그인 응답
 * @throws ApiError - API 요청 실패 시
 */
export async function loginAPI(data: LoginFormData): Promise<LoginResponse> {
  // TODO: 실제 API 엔드포인트로 변경 예정
  return post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, {
    email: data.email,
    password: data.password,
  });
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

  return post<SignupResponse>(API_ENDPOINTS.AUTH.SIGNUP, requestData);
}
