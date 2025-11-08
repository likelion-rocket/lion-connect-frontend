import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * 사용자 정보 타입
 */
export type User = {
  id: number;
  email: string;
  phoneNumber: string | null;
  phoneVerified: boolean;
  roles: string[];
};

/**
 * Auth Store 상태 타입
 */
type AuthState = {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean; // 앱 초기화 완료 여부 (메모리에만 유지)
};

/**
 * Auth Store 액션 타입
 */
type AuthActions = {
  setAuth: (accessToken: string, user: User) => void;
  clearAuth: () => void;
  updateAccessToken: (accessToken: string) => void;
  setInitialized: (initialized: boolean) => void; // 초기화 완료 설정
};

/**
 * Auth Store
 *
 * 상태 저장 전략:
 * - accessToken: 메모리만 (새로고침 시 삭제) → 보안
 * - user: localStorage에 persist (새로고침 후에도 유지) → UX
 * - isAuthenticated: 계산된 상태 (accessToken과 user 기반)
 * - isInitialized: 메모리만 (앱 초기화 플래그)
 * - 리프레시 토큰: 백엔드 HttpOnly 쿠키 (보안)
 *
 * 흐름:
 * 1. 로그인: setAuth(token, user) → localStorage에 user만 저장
 * 2. 새로고침: localStorage에서 user 자동 복구 → recoverTokenAPI로 새 accessToken 발급
 * 3. 로그아웃: clearAuth() → localStorage의 user도 삭제
 *
 * 보안 고려사항:
 * - accessToken은 메모리만 (XSS 공격 시 메모리 탈취만 가능, 쿠키 안전)
 * - user는 localStorage (공개 정보,민감하지 않음)
 * - 리프레시 토큰은 HttpOnly 쿠키 (JavaScript 접근 불가)
 */
export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      // 초기 상태
      accessToken: null,
      user: null,
      isAuthenticated: false,
      isInitialized: false,

      // 로그인 성공 시 호출
      setAuth: (accessToken: string, user: User) =>
        set({
          accessToken,
          user,
          isAuthenticated: true,
        }),

      // 로그아웃 시 호출
      clearAuth: () =>
        set({
          accessToken: null,
          user: null,
          isAuthenticated: false,
        }),

      // 토큰 리프레시 시 호출
      updateAccessToken: (accessToken: string) =>
        set((state) => ({
          accessToken,
          isAuthenticated: !!accessToken && !!state.user,
        })),

      // 앱 초기화 완료 설정
      setInitialized: (initialized: boolean) =>
        set({
          isInitialized: initialized,
        }),
    }),
    {
      name: "auth-store",
      // user만 localStorage에 저장 (accessToken과 isInitialized는 메모리만)
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
