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
  phoneNumber: string;
  agreeTerms: boolean;
};

// 일반 회원가입 폼 데이터 타입 (이름 포함)
export type PersonalSignupFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  agreeTerms: boolean;
};

// 회원가입 API 요청 타입 (서버로 전송되는 데이터)
export type SignupRequestData = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
};

// 멋사 수료자 회원가입 폼 데이터 타입 (UI용)
export type JoinedUserSignupFormData = {
  name: string;
  courseName: string;
  courseNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  agreeTerms: boolean;
};

// 멋사 수료자 회원가입 API 요청 타입
export type JoinedUserSignupRequestData = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  courseName: string;
  courseGeneration: number;
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
    name: string;
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
    phoneNumber: string;
  };
};

// 멋사 수료자 회원가입 API 응답 타입
export type JoinedUserSignupResponse = {
  id: number;
  name: string;
  title: string;
  introduction: string;
  storageUrl: string;
  likelionCode: string;
  visibility: "PUBLIC" | "PRIVATE";
  status: "DRAFT" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
};

// 기업 이메일 인증 요청 타입
export type CompanyEmailVerificationRequest = {
  email: string;
};

// 기업 이메일 인증 응답 타입
export type CompanyEmailVerificationResponse = {
  success: boolean;
  message: string;
};

// 기업 이메일 인증 확인 요청 타입
export type CompanyEmailVerificationCheckRequest = {
  email: string;
  verificationToken: string;
};

// 기업 이메일 인증 확인 응답 타입
export type CompanyEmailVerificationCheckResponse = {
  valid: boolean;
};

// 기업 회원가입 폼 데이터 타입 (Step 1 + Step 2 합친 것)
export type CompanySignupFormData = {
  companyName: string;
  businessNumber: string;
  employeeCount: string;
  email: string;
  verificationToken: string;
  name: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
  agreeTerms: boolean;
};

// 기업 회원가입 API 요청 타입 (서버로 전송되는 데이터)
export type CompanySignupRequestData = {
  companyName: string;
  businessRegistrationNumber: string;
  numberOfEmployees: number;
  email: string;
  verificationToken: string;
  managerName: string;
  phoneNumber: string;
  password: string;
  agreementChecked: boolean;
};

// 기업 회원가입 API 응답 타입
export type CompanySignupResponse = {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    companyName: string;
  };
};

// 에러 응답 타입
export type ApiError = {
  code: string;
  message: string;
};
