// lib/api/expTags.ts
import { get, put } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";

export type ExpTagItem = {
  id: number;
  name: string;
};

export type UpdateExpTagsRequest = {
  ids: number[];
};

/**
 * ✅ 경험 태그 선택 목록 조회 (GET /api/profile/exp-tags?profileId={profileId})
 * - 특정 프로필의 경험 태그 목록 조회
 */
export function fetchExpTags(profileId: string | number): Promise<ExpTagItem[]> {
  return get<ExpTagItem[]>(`${API_ENDPOINTS.EXP_TAGS.GET}?profileId=${profileId}`, {
    credentials: "include",
  });
}

/**
 * ✅ 경험 태그 선택 목록 치환 (PUT /api/profile/exp-tags?profileId={profileId})
 * - 특정 프로필의 경험 태그 목록 업데이트
 */
export function updateExpTags(
  profileId: string | number,
  body: UpdateExpTagsRequest
): Promise<ExpTagItem[]> {
  return put<ExpTagItem[]>(`${API_ENDPOINTS.EXP_TAGS.UPDATE}?profileId=${profileId}`, body, {
    credentials: "include",
  });
}
