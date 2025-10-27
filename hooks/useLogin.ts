"use client";

import { useMutation } from "@tanstack/react-query";
import { LoginFormData, LoginResponse } from "@/types/auth";
import { loginAPI } from "@/lib/api/auth";

/**
 * 로그인 Mutation 훅 (TanStack Query 기반)
 * - 자동 에러 처리
 * - 자동 재시도
 * - 로딩 상태 자동 관리
 * - 낙관적 업데이트 지원
 */
export function useLogin() {
  const mutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const result = await loginAPI(data);

      // rememberMe 처리
      if (data.rememberMe) {
        localStorage.setItem("rememberEmail", data.email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      return result;
    },
    onError: (error: Error) => {
      // 에러 발생 시 자동으로 처리됨
      console.error("Login error:", error.message);
    },
    onSuccess: (data: LoginResponse) => {
      // 로그인 성공 시 처리
      console.log("Login success:", data.message);

      // TODO: 토큰 저장
      // if (data.token) {
      //   localStorage.setItem("authToken", data.token);
      // }
    },
    retry: 1, // 실패 시 1회 재시도
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    login: mutation.mutate,
    loginAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error?.message || null,
    data: mutation.data,
    isSuccess: mutation.isSuccess,
  };
}
