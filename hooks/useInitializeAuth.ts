"use client";

import { useAuthStore } from "@/store/authStore";
import { recoverTokenAPI } from "@/lib/api/auth";
import { useEffect } from "react";

/**
 * 앱 초기화 훅 (토큰 복구)
 *
 * 목적: 페이지 새로고침 또는 브라우저 재시작 후 세션 복구
 * - root layout에서만 호출
 * - 앱 시작 시 한 번만 실행
 *
 * 동작:
 * 1. HttpOnly 쿠키의 리프레시 토큰으로 액세스 토큰 복구 시도
 * 2. 성공 시: Zustand에 토큰 + 사용자 정보 저장
 * 3. 실패 시: 로그아웃 상태 유지 (리프레시 토큰 없음 또는 만료)
 * 4. 완료 후: isInitialized = true로 설정 (UI가 진짜 상태 확인 가능)
 */
export function useInitializeAuth() {
  const { isInitialized, setAuth, setInitialized } = useAuthStore();

  useEffect(() => {
    // 이미 초기화된 경우 스킵
    if (isInitialized) {
      return;
    }

    // 앱 초기화: HttpOnly 쿠키의 리프레시 토큰으로 액세스 토큰 복구 시도
    const initializeAuth = async () => {
      try {
        // localStorage에서 user 먼저 확인 (Zustand persist가 이미 복구했을 것임)
        const { user } = useAuthStore.getState();

        // user가 없으면 로그인 상태가 아니므로 스킵
        if (!user) {
          console.log("세션 복구 스킵: localStorage에 user 정보가 없습니다");
          return;
        }

        // recoverTokenAPI() 호출: 새 액세스 토큰 발급
        const accessToken = await recoverTokenAPI();

        // 복구 성공: setAuth로 accessToken + user 모두 설정
        // updateAccessToken 대신 setAuth를 사용하여 isAuthenticated를 확실하게 true로 설정
        useAuthStore.getState().setAuth(accessToken, user);

        console.log("세션 복구 성공:", { email: user.email });
      } catch (error) {
        console.error("세션 복구 실패:", error);
        // 복구 실패: 기존 상태 유지 (로그아웃 상태)
        // - 리프레시 토큰이 없음
        // - 리프레시 토큰이 만료됨
        // - 네트워크 오류

        // user는 localStorage에 남아있지만 accessToken이 없으므로
        // clearAuth를 호출하여 localStorage의 user도 삭제
        useAuthStore.getState().clearAuth();
      } finally {
        // 초기화 완료 (성공/실패 상관없음)
        setInitialized(true);
      }
    };

    initializeAuth();
  }, [isInitialized, setAuth, setInitialized]);
}
