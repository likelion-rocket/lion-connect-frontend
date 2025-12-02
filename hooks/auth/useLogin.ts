"use client";

import { useMutation } from "@tanstack/react-query";
import { LoginFormData, LoginResponse } from "@/types/auth";
import { loginAPI } from "@/lib/api/auth";
import { useAuthStore } from "@/store/authStore";
import { setUserRolesCookie } from "@/utils/auth-cookies";

/**
 * 로그인 Mutation 훅 (TanStack Query 기반)
 * - 자동 에러 처리
 * - 자동 재시도
 * - 로딩 상태 자동 관리
 * - Zustand에 액세스 토큰 및 사용자 정보 저장
 * - 미들웨어용 역할 쿠키 설정
 *
 * 보안 개선사항:
 * - 액세스 토큰: Zustand 메모리에 저장 (sessionStorage persist)
 * - 리프레시 토큰: 백엔드에서 HttpOnly 쿠키로 설정
 * - XSS 공격 시에도 리프레시 토큰은 완전히 보호됨
 */
export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  const mutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const result = await loginAPI(data);

      // rememberMe 처리 (이메일만 localStorage에 저장)
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
      // 로그인 성공 시 Zustand에 토큰과 사용자 정보 저장
      // Zustand store에 액세스 토큰과 사용자 정보 저장
      setAuth(data.accessToken, data.user);

      // 미들웨어용 역할 쿠키 설정 (역할 기반 라우팅 보호)
      setUserRolesCookie(data.user.roles);
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
