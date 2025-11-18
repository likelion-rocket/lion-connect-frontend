/**
 * 인재 상세 조회 API 서비스
 */

import { get } from "@/lib/apiClient";
import type { TalentDetailResponse } from "@/types/talent";

/**
 * 인재 상세 조회
 * @param profileId - 인재 프로필 ID
 * @returns 인재 상세 정보
 */
export async function getTalentDetail(profileId: string): Promise<TalentDetailResponse> {
  return get<TalentDetailResponse>(`/profiles/${profileId}`);
}
