// 로그인 폼 데이터 타입
export type LoginFormData = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

// API 응답 타입
export type LoginResponse = {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
};

// 에러 응답 타입
export type ApiError = {
  code: string;
  message: string;
};
