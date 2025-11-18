/**
 * 관리자 - 기업 문의 관리 커스텀 훅 (TanStack Query)
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminInquiries, updateInquiryStatus } from "@/lib/api/inquiries";
import type { InquiryListParams, UpdateInquiryStatusRequest } from "@/types/inquiry";

/**
 * Query Key Factory - 계층적 캐시 관리
 */
export const inquiryKeys = {
  all: ["admin", "inquiries"] as const,
  lists: () => [...inquiryKeys.all, "list"] as const,
  list: (params: InquiryListParams) => [...inquiryKeys.lists(), params] as const,
};

/**
 * 문의 목록 조회 훅
 * - URL 쿼리 파라미터와 동기화
 * - 자동 캐싱 및 재검증
 */
export function useAdminInquiries(params: InquiryListParams) {
  return useQuery({
    queryKey: inquiryKeys.list(params),
    queryFn: () => getAdminInquiries(params),
    staleTime: 1000 * 60, // 1분간 데이터를 신선한 것으로 간주
  });
}

/**
 * 문의 상태 업데이트 훅
 * - 낙관적 업데이트 가능
 * - 성공 시 캐시 무효화
 */
export function useUpdateInquiryStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: UpdateInquiryStatusRequest["status"] }) =>
      updateInquiryStatus(id, { status }),
    onSuccess: () => {
      // 모든 문의 목록 쿼리 무효화 (재조회)
      queryClient.invalidateQueries({ queryKey: inquiryKeys.lists() });
    },
  });
}
