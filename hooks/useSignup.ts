"use client";

import { useMutation } from "@tanstack/react-query";
import { SignupFormData, SignupResponse } from "@/types/auth";
import { signupAPI } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

/**
 * 회원가입 Mutation 훅 (TanStack Query 기반)
 * - 자동 에러 처리
 * - 자동 재시도
 * - 로딩 상태 자동 관리
 * - 성공 시 자동 라우팅
 */
export function useSignup() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: SignupFormData) => {
      const result = await signupAPI(data);
      return result;
    },
    onError: (error: Error) => {
      // 에러 발생 시 자동으로 처리됨
      console.error("Signup error:", error.message);
    },
    onSuccess: (_data: SignupResponse) => {
      // 회원가입 성공 시 처리
      // TODO: 성공 메시지 표시 (Toast 등)

      // TODO: 필요시 토큰 저장 또는 환영 메시지 표시
      // if (_data.token) {
      //   localStorage.setItem("authToken", _data.token);
      // }

      // 로그인 페이지로 이동
      router.push("/login");
    },
    retry: 1, // 실패 시 1회 재시도
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    signup: mutation.mutate,
    signupAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error?.message || null,
    data: mutation.data,
    isSuccess: mutation.isSuccess,
  };
}
