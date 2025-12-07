import { post, get, del, put } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import type { AwardRequest, AwardResponse } from "@/types/talent";

// Re-export types for backwards compatibility
export type { AwardRequest, AwardResponse };
export type AwardListItem = AwardResponse;

/**
 * ✅ 수상 배치 생성 (POST /api/profile/awards?profileId={profileId})
 * - 배열 전송으로 여러 수상을 한번에 생성
 */
export function createAwards(
  profileId: string | number,
  body: AwardRequest[]
): Promise<AwardResponse[]> {
  return post<AwardResponse[]>(`${API_ENDPOINTS.AWARDS.CREATE}?profileId=${profileId}`, body, {
    credentials: "include",
  });
}

/**
 * ✅ 수상 목록 조회 (GET /api/profile/awards?profileId={profileId})
 * - 특정 프로필의 수상 목록 조회
 */
export function fetchAwards(profileId: string | number): Promise<AwardListItem[]> {
  return get<AwardListItem[]>(`${API_ENDPOINTS.AWARDS.LIST}?profileId=${profileId}`, {
    credentials: "include",
  });
}

/**
 * ✅ 수상 수정 (PUT /api/profile/awards/{id}?profileId={profileId})
 * - 특정 수상 항목 수정
 */
export function updateAward(
  profileId: string | number,
  id: number,
  body: AwardRequest
): Promise<AwardResponse> {
  return put<AwardResponse>(`${API_ENDPOINTS.AWARDS.UPDATE(id)}?profileId=${profileId}`, body, {
    credentials: "include",
  });
}

/**
 * ✅ 수상 삭제 (DELETE /api/profile/awards/{id}?profileId={profileId})
 * - 특정 수상 항목 삭제
 */
export async function deleteAward(profileId: string | number, id: number): Promise<void> {
  await del<void>(`${API_ENDPOINTS.AWARDS.DELETE(id)}?profileId=${profileId}`, {
    credentials: "include",
  });
}
