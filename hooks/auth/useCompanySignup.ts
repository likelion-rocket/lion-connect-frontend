"use client";

import { useMutation } from "@tanstack/react-query";
import { CompanySignupFormData, CompanySignupResponse } from "@/types/auth";
import { companySignupAPI } from "@/lib/api/auth";
import { ApiError } from "@/lib/apiClient";

/**
 * 기업 회원가입 Mutation 훅 (TanStack Query 기반)
 * - 자동 에러 처리 (네트워크, 타임아웃, HTTP 에러)
 * - 조건부 재시도 (네트워크 에러만 재시도)
 * - 로딩 상태 자동 관리
 */
export function useCompanySignup() {
  const mutation = useMutation({
    mutationFn: async (data: CompanySignupFormData) => {
      const result = await companySignupAPI(data);
      return result;
    },
    onError: (error: Error) => {
      // 민감한 정보를 제외한 로깅
      if (error instanceof ApiError) {
        console.error("Company signup failed:", {
          code: error.code,
          statusCode: error.statusCode,
          message: error.message,
        });
      } else {
        console.error("Company signup error:", error.name);
      }
    },
    onSuccess: (data: CompanySignupResponse) => {
      console.log("기업 회원가입 성공:", data);
    },
    // 조건부 재시도: 네트워크 오류나 타임아웃만 재시도
    retry: (failureCount, error) => {
      // 최대 1회 재시도
      if (failureCount >= 1) return false;

      // ApiError인 경우 에러 코드 확인
      if (error instanceof ApiError) {
        // 네트워크 오류나 타임아웃만 재시도
        return error.code === "NETWORK_ERROR" || error.code === "TIMEOUT";
      }

      // 기타 에러는 재시도하지 않음
      return false;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 3000),
  });

  return {
    signup: mutation.mutate,
    signupAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error?.message || null,
    data: mutation.data,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}
