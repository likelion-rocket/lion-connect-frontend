"use client";

import { useAuthStore } from "@/store/authStore";
import { recoverTokenAPI } from "@/lib/api/auth";
import { useEffect } from "react";
import { setAuthCookies, clearAuthCookies } from "@/actions/auth";

/**
 * 앱 초기화 훅 (토큰 복구)
 *
 * 목적: 페이지 새로고침 또는 브라우저 재시작 후 세션 복구
 * - root layout에서만 호출
 * - 앱 시작 시 한 번만 실행
 *
 * 동작:
 * 1. HttpOnly 쿠키의 리프레시 토큰으로 액세스 토큰 복구 시도
 * 2. 성공 시: Zustand에 토큰 + 사용자 정보 저장, 미들웨어용 역할 쿠키 설정
 * 3. 실패 시: 로그아웃 상태 유지 (리프레시 토큰 없음 또는 만료), 역할 쿠키 삭제
 * 4. 완료 후: isInitialized = true로 설정 (UI가 진짜 상태 확인 가능)
 */
export function useInitializeAuth() {
  const { isInitialized, setInitialized } = useAuthStore();

  useEffect(() => {
    // 이미 초기화된 경우 스킵
    if (isInitialized) {
      return;
    }

    // 앱 초기화: HttpOnly 쿠키의 리프레시 토큰으로 액세스 토큰 복구 시도
    const initializeAuth = async () => {
      try {
        // localStorage에서 user 먼저 확인 (Zustand persist가 이미 복구했을 것임)
        const { user, accessToken } = useAuthStore.getState();

        // user가 없으면 로그인 상태가 아니므로 스킵
        if (!user) {
          // 역할 쿠키도 정리 (Server Action으로 HttpOnly 쿠키 삭제)
          await clearAuthCookies();
          return;
        }

        // accessToken이 이미 있으면 스킵 (이미 로그인된 상태)
        if (accessToken) {
          // 역할 쿠키가 없을 수 있으므로 설정 (Server Action으로 HttpOnly 쿠키 설정)
          await setAuthCookies(user.roles);
          return;
        }

        // recoverTokenAPI() 호출: 새 액세스 토큰 발급
        // refreshAccessToken 내부에서 자동으로 updateAccessToken 호출됨
        const newAccessToken = await recoverTokenAPI();

        // 복구 성공: setAuth로 accessToken + user 모두 설정
        // (이미 updateAccessToken이 호출되었지만, isAuthenticated를 확실하게 true로 설정)
        useAuthStore.getState().setAuth(newAccessToken, user);

        // 미들웨어용 역할 쿠키 설정 (Server Action으로 HttpOnly 쿠키 설정)
        await setAuthCookies(user.roles);
      } catch (error) {
        console.error("❌ 세션 복구 실패:", error);
        // 복구 실패: 기존 상태 유지 (로그아웃 상태)
        // - 리프레시 토큰이 없음
        // - 리프레시 토큰이 만료됨
        // - 네트워크 오류

        // refreshAccessToken 내부에서 이미 clearAuth가 호출되었을 수 있음
        // 안전하게 한 번 더 호출 (중복 호출해도 문제없음)
        useAuthStore.getState().clearAuth();

        // 역할 쿠키도 삭제 (Server Action으로 HttpOnly 쿠키 삭제)
        await clearAuthCookies();
      } finally {
        // 초기화 완료 (성공/실패 상관없음)
        setInitialized(true);
      }
    };

    initializeAuth();
  }, [isInitialized, setInitialized]);
}
