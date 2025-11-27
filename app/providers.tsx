"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useInitializeAuth } from "@/hooks/auth/useInitializeAuth";
import SuccessToast from "@/components/SuccessToast";
import { ReactNode } from "react";

/**
 * QueryClient 생성
 * 앱 전체에서 사용될 TanStack Query 설정
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      gcTime: 1000 * 60 * 10, // 10분 (구식 가비지 컬렉션)
    },
  },
});

/**
 * 앱 초기화 컴포넌트
 * - 페이지 새로고침 후 토큰 복구
 */
function InitializeApp() {
  useInitializeAuth();
  return null;
}

/**
 * QueryClientProvider 컴포넌트
 * 앱 최상단에서 감싸서 전체 앱에서 TanStack Query 사용 가능
 *
 * 추가 기능:
 * - InitializeApp 컴포넌트로 앱 초기화 (토큰 복구)
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <InitializeApp />
      <SuccessToast />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
