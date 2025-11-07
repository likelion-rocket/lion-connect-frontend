"use client";

import { useMutation } from "@tanstack/react-query";
import { logoutAPI } from "@/lib/api/auth";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

/**
 * 로그아웃 Mutation 훅 (TanStack Query 기반)
 * - 백엔드 로그아웃 API 호출 (리프레시 토큰 세션 삭제)
 * - Zustand 상태 초기화
 * - 로그인 페이지로 리다이렉트
 */
export function useLogout() {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      // 백엔드 로그아웃 API 호출
      await logoutAPI();
    },
    onSuccess: () => {
      // Zustand 상태 초기화 (액세스 토큰, 사용자 정보 삭제)
      clearAuth();

      console.log("Logout success");

      // 로그인 페이지로 리다이렉트
      router.push("/login");
    },
    onError: (error: Error) => {
      console.error("Logout error:", error.message);

      // 에러가 발생해도 클라이언트 상태는 초기화
      clearAuth();

      // 로그인 페이지로 리다이렉트
      router.push("/login");
    },
  });

  return {
    logout: mutation.mutate,
    logoutAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error?.message || null,
  };
}
