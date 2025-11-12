/**
 * 기업 문의 데이터 관리 커스텀 훅 (tanstack query)
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getInquiries, updateInquiryStatus, deleteInquiry } from "@/services/inquiryService";
import type { InquiryListParams, InquiryStatus } from "@/types/inquiry";

/**
 * Query Key Factory
 */
export const inquiryKeys = {
  all: ["inquiries"] as const,
  lists: () => [...inquiryKeys.all, "list"] as const,
  list: (params: InquiryListParams) => [...inquiryKeys.lists(), params] as const,
  detail: (id: string) => [...inquiryKeys.all, "detail", id] as const,
};

/**
 * 문의 목록 조회 훅
 */
export function useInquiries(params: InquiryListParams) {
  return useQuery({
    queryKey: inquiryKeys.list(params),
    queryFn: () => getInquiries(params),
    staleTime: 1000 * 60, // 1분간 데이터를 신선한 것으로 간주
  });
}

/**
 * 문의 상태 업데이트 훅
 */
export function useUpdateInquiryStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ inquiryId, status }: { inquiryId: string; status: InquiryStatus }) =>
      updateInquiryStatus(inquiryId, status),
    onSuccess: () => {
      // 모든 문의 목록 쿼리 무효화 (재조회)
      queryClient.invalidateQueries({ queryKey: inquiryKeys.lists() });
    },
  });
}

/**
 * 문의 삭제 훅
 */
export function useDeleteInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inquiryId: string) => deleteInquiry(inquiryId),
    onSuccess: () => {
      // 모든 문의 목록 쿼리 무효화 (재조회)
      queryClient.invalidateQueries({ queryKey: inquiryKeys.lists() });
    },
  });
}
