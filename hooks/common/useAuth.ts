"use client";

import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { UserRole, hasAnyRole } from "@/utils/rbac";

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

/**
 * 특정 역할이 필요한 페이지를 위한 훅
 * - 로그인하지 않은 사용자 → 로그인 페이지로 리다이렉트
 * - 필요한 역할이 없는 사용자 → 지정된 경로로 리다이렉트
 *
 * 깜빡임 방지:
 * - isLoading 동안 컨텐츠를 렌더링하지 않음
 * - hasAccess가 true가 될 때까지 null 반환 권장
 *
 * @param requiredRoles - 필요한 역할들 (OR 조건 - 하나라도 있으면 접근 허용)
 * @param redirectTo - 권한 없을 때 리다이렉트 경로 (기본: "/")
 *
 * 사용법:
 * const { hasAccess, isLoading } = useRequireRoles([UserRole.ADMIN, UserRole.COMPANY]);
 *
 * if (isLoading || !hasAccess) return null; // 로딩 또는 리다이렉트 중
 */
export function useRequireRoles(requiredRoles: UserRole[], redirectTo: string = "/") {
  const { isAuthenticated, user, isLoading } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
    if (!isAuthenticated || !user) {
      window.location.href = "/login";
      return;
    }

    // 역할 체크 (hasAnyRole: OR 조건)
    const hasRequiredRole = hasAnyRole(user.roles, requiredRoles);
    if (!hasRequiredRole) {
      window.location.href = redirectTo;
      return;
    }

    // 권한 있음
    setHasAccess(true);
  }, [isAuthenticated, user, isLoading, requiredRoles, redirectTo]);

  return { hasAccess, isLoading };
}
