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

// ✅ 내 경험 태그 선택 목록 조회 (GET /api/profile/exp-tags)
export function fetchMyExpTags(): Promise<ExpTagItem[]> {
  return get<ExpTagItem[]>(API_ENDPOINTS.EXP_TAGS.GET, {
    credentials: "include",
  });
}

// ✅ 내 경험 태그 선택 목록 치환 (PUT /api/profile/exp-tags)
export function updateMyExpTags(body: UpdateExpTagsRequest): Promise<ExpTagItem[]> {
  return put<ExpTagItem[]>(API_ENDPOINTS.EXP_TAGS.UPDATE, body, {
    credentials: "include",
  });
}
