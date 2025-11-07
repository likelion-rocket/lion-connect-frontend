// 로그인 폼 데이터 타입
export type LoginFormData = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

// 회원가입 폼 데이터 타입 (UI용)
export type SignupFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  agreeTerms: boolean;
};

// 회원가입 API 요청 타입 (서버로 전송되는 데이터)
export type SignupRequestData = {
  email: string;
  password: string;
  phone: string;
};

// API 응답 타입
// 백엔드에서 액세스 토큰은 Authorization 헤더로, 리프레시 토큰은 HttpOnly 쿠키로 전달
export type LoginResponse = {
  success: boolean;
  message: string;
  accessToken: string; // Authorization 헤더에서 추출
  user: {
    id: number;
    email: string;
    phoneNumber: string | null;
    phoneVerified: boolean;
    roles: string[];
  };
};

// 회원가입 API 응답 타입
export type SignupResponse = {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    phone: string;
  };
};

// 에러 응답 타입
export type ApiError = {
  code: string;
  message: string;
};
