import { post, get, del, put } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import type { AwardRequest, AwardResponse } from "@/types/talent";

// Re-export types for backwards compatibility
export type { AwardRequest, AwardResponse };
export type AwardListItem = AwardResponse;

/** 수상 생성 (POST /api/profile/awards) - 단일 생성 (deprecated) */
export function createAward(body: AwardRequest): Promise<AwardResponse> {
  return post<AwardResponse>(API_ENDPOINTS.AWARDS.CREATE, body, {
    credentials: "include",
  });
}

/** 수상 배치 생성 (POST /api/profile/awards) - 배열 전송 */
export function createAwards(body: AwardRequest[]): Promise<AwardResponse[]> {
  return post<AwardResponse[]>(API_ENDPOINTS.AWARDS.CREATE, body, {
    credentials: "include",
  });
}

// LIST
export function fetchMyAwards(): Promise<AwardListItem[]> {
  return get<AwardListItem[]>(API_ENDPOINTS.AWARDS.LIST, {
    credentials: "include",
  });
}

// UPDATE
export function updateAward(id: number, body: AwardRequest): Promise<AwardResponse> {
  return put<AwardResponse>(API_ENDPOINTS.AWARDS.UPDATE(id), body, {
    credentials: "include",
  });
}

// DELETE
export async function deleteAward(id: number): Promise<void> {
  await del<void>(API_ENDPOINTS.AWARDS.DELETE(id), {
    credentials: "include",
  });
}
