"use client";

import { useMutation } from "@tanstack/react-query";
import { createInquiry } from "@/lib/api/inquiries";
import { CreateInquiryRequest } from "@/types/inquiry";
import { ApiError } from "@/lib/apiClient";

/**
 * 기업 문의 제출 Mutation 훅 (TanStack Query 기반)
 * - 자동 에러 처리
 * - 조건부 재시도 (네트워크 에러만 재시도)
 * - 로딩 상태 자동 관리
 */
export function useCreateInquiry() {
  const mutation = useMutation({
    mutationFn: async (data: CreateInquiryRequest) => {
      await createInquiry(data);
    },
    onError: (error: Error) => {
      if (error instanceof ApiError) {
        console.error("Failed to submit inquiry:", {
          code: error.code,
          statusCode: error.statusCode,
        });
      } else {
        console.error("Inquiry submission error:", error.name);
      }
    },
    onSuccess: () => {
      console.log("Inquiry submitted successfully");
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
    createInquiry: mutation.mutate,
    createInquiryAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}
