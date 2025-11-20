"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";

/**
 * 인증 상태 관리 훅
 * - 로그인 상태 확인
 * - 사용자 정보 제공
 * - 앱 초기화 시 페이지 새로고침 후에도 세션 유지
 *
 * 사용법:
 * const { isAuthenticated, user, isLoading } = useAuth();
 */
export function useAuth() {
  const { isAuthenticated, user, accessToken } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 페이지 로드 시 Zustand persist에서 복원된 상태 확인
    // sessionStorage에서 자동으로 복원됨
    setIsLoading(false);
  }, []);

  return {
    isAuthenticated,
    user,
    accessToken,
    isLoading,
  };
}

/**
 * 로그인 필수 페이지를 위한 HOC 훅
 * - 로그인하지 않은 사용자를 로그인 페이지로 리다이렉트
 *
 * 사용법:
 * const { isAuthenticated, isLoading } = useRequireAuth();
 *
 * if (isLoading) return <Loading />;
 * if (!isAuthenticated) return null; // 리다이렉트 중
 */
export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
      window.location.href = "/login";
    }
  }, [isAuthenticated, isLoading]);

  return { isAuthenticated, isLoading };
}
