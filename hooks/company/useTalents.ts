"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTalents, type FetchTalentsParams, type TalentListResponse } from "@/lib/api/talents";
import { useAuthStore } from "@/store/authStore";

/**
 * 인재 검색 훅
 * - 로그인 상태에서 인재 검색
 * - 페이지네이션, 필터링 지원
 */
export function useTalents(params: FetchTalentsParams) {
  const accessToken = useAuthStore((s) => s.accessToken);

  const enabled = !!accessToken; // 로그인 상태에서만 실행

  return useQuery<TalentListResponse>({
    queryKey: ["talents", "search", params], // 파라미터별 캐시 분리
    queryFn: () => fetchTalents(params),
    enabled,
    retry: false, // 401 에러 시 자동 리프레시되므로 retry 불필요
    staleTime: 0, // 즉시 stale 처리 (항상 최신 데이터)
    gcTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
}
