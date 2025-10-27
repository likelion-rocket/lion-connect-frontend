import { LoginFormData, LoginResponse } from "@/types/auth";

/**
 * 로그인 API 호출
 * @param data - 로그인 폼 데이터 (이메일, 비밀번호)
 * @returns 로그인 응답
 */
export async function loginAPI(data: LoginFormData): Promise<LoginResponse> {
  try {
    // TODO: 실제 API 엔드포인트로 변경
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "로그인에 실패했습니다");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "로그인에 실패했습니다");
  }
}
