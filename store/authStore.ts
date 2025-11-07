import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * 사용자 정보 타입
 */
export interface User {
  id: number;
  email: string;
  phoneNumber: string | null;
  phoneVerified: boolean;
  roles: string[];
}

/**
 * Auth Store 상태 타입
 */
interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

/**
 * Auth Store 액션 타입
 */
interface AuthActions {
  setAuth: (accessToken: string, user: User) => void;
  clearAuth: () => void;
  updateAccessToken: (accessToken: string) => void;
}

/**
 * Auth Store
 *
 * 액세스 토큰과 사용자 정보를 메모리에 저장
 * - 액세스 토큰: Zustand 메모리 (persist하지 않음, 보안 강화)
 * - 리프레시 토큰: 백엔드에서 HttpOnly 쿠키로 설정
 *
 * 보안 고려사항:
 * - sessionStorage에만 persist (탭 닫으면 삭제)
 * - XSS 공격 시에도 액세스 토큰은 15분만 유효
 * - 리프레시 토큰은 HttpOnly 쿠키로 완전히 보호
 */
export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      // 초기 상태
      accessToken: null,
      user: null,
      isAuthenticated: false,

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
    }),
    {
      name: "auth-storage", // sessionStorage 키 이름
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);
