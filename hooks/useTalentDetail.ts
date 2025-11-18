/**
 * 인재 상세 조회 커스텀 훅
 */

import { useQuery } from "@tanstack/react-query";
import { getTalentDetail } from "@/lib/api/talentDetail";
import type { TalentDetailResponse } from "@/types/talent";

interface UseTalentDetailOptions {
  profileId: string;
  enabled?: boolean;
}

/**
 * 인재 상세 정보를 조회하는 훅
 * @param options - 훅 옵션
 * @param options.profileId - 조회할 인재 프로필 ID
 * @param options.enabled - 쿼리 활성화 여부 (기본값: true)
 * @returns React Query의 useQuery 결과
 */
export function useTalentDetail({ profileId, enabled = true }: UseTalentDetailOptions) {
  return useQuery<TalentDetailResponse>({
    queryKey: ["talent", "detail", profileId],
    queryFn: () => getTalentDetail(profileId),
    enabled: enabled && !!profileId,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5분
  });
}
