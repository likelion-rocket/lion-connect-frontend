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
        // recoverTokenAPI() 호출: 새 액세스 토큰 발급
        // 사용자 정보는 localStorage에서 자동 복구됨 (Zustand persist)
        const accessToken = await recoverTokenAPI();

        // 복구 성공: 액세스 토큰 업데이트
        // user는 이미 localStorage에서 복구되었으므로, updateAccessToken만 호출
        const { user } = useAuthStore.getState();

        if (user) {
          // user가 이미 복구되어 있으면 updateAccessToken 호출
          useAuthStore.getState().updateAccessToken(accessToken);
        }
      } catch (error) {
        console.log(error);
        // 복구 실패: 기존 상태 유지 (로그아웃 상태)
        // - 리프레시 토큰이 없음
        // - 리프레시 토큰이 만료됨
        // - 네트워크 오류
      } finally {
        // 초기화 완료 (성공/실패 상관없음)
        setInitialized(true);
      }
    };

    initializeAuth();
  }, [isInitialized, setAuth, setInitialized]);
}
