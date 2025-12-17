"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutAPI } from "@/lib/api/auth";
import { useAuthStore } from "@/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import { clearAuthCookies } from "@/actions/auth";

/**
 * 로그아웃 Mutation 훅 (TanStack Query 기반)
 * - 백엔드 로그아웃 API 호출 (리프레시 토큰 세션 삭제)
 * - Zustand 상태 초기화
 * - Server Action으로 역할 쿠키 삭제 (HttpOnly 지원)
 * - 현재 경로에 따라 적절한 페이지로 리다이렉트
 *   - /dashboard 경로: /dashboard로 이동
 *   - 그 외: / (루트)로 이동
 */
export function useLogout() {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      // 백엔드 로그아웃 API 호출
      await logoutAPI();
    },
    onSuccess: async () => {
      // TanStack Query 캐시 완전 초기화 (다른 유저 데이터 제거)
      queryClient.clear();

      // Zustand 상태 초기화 (액세스 토큰, 사용자 정보 삭제)
      clearAuth();

      // Server Action으로 역할 쿠키 삭제 (HttpOnly 쿠키도 삭제 가능)
      await clearAuthCookies();

      // 서버 컴포넌트 캐시 갱신
      router.refresh();

      // 현재 경로에 따라 적절한 페이지로 리다이렉트
      // - /dashboard 경로에서 로그아웃: /dashboard로 이동
      // - 그 외 경로에서 로그아웃: / (루트)로 이동
      const redirectPath = pathname.startsWith("/dashboard") ? "/dashboard" : "/";
      router.push(redirectPath);
    },
    onError: async (error: Error) => {
      console.error("Logout error:", error.message);

      // TanStack Query 캐시 완전 초기화 (다른 유저 데이터 제거)
      queryClient.clear();

      // 에러가 발생해도 클라이언트 상태는 초기화
      clearAuth();

      // Server Action으로 역할 쿠키 삭제
      await clearAuthCookies();

      // 서버 컴포넌트 캐시 갱신
      router.refresh();

      // 현재 경로에 따라 적절한 페이지로 리다이렉트
      const redirectPath = pathname.startsWith("/dashboard") ? "/dashboard" : "/";
      router.push(redirectPath);
    },
  });

  return {
    logout: mutation.mutate,
    logoutAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error?.message || null,
  };
}
