import { post, get, del, put } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import type { LanguageRequest, LanguageResponse } from "@/types/talent";

// Re-export types for backwards compatibility
export type { LanguageRequest, LanguageResponse };
export type LanguageListItem = LanguageResponse;

/** 어학 생성 (POST /api/profile/Languages) - 단일 생성 (deprecated) */
export function createLanguage(body: LanguageRequest): Promise<LanguageResponse> {
  return post<LanguageResponse>(API_ENDPOINTS.LANGUAGES.CREATE, body, {
    credentials: "include",
  });
}

/** 어학 배치 생성 (POST /api/profile/Languages) - 배열 전송 */
export function createLanguages(body: LanguageRequest[]): Promise<LanguageResponse[]> {
  return post<LanguageResponse[]>(API_ENDPOINTS.LANGUAGES.CREATE, body, {
    credentials: "include",
  });
}

/** 내 어학 목록 조회 (GET /api/profile/Languages) */
export function fetchMyLanguages(): Promise<LanguageResponse[]> {
  return get<LanguageResponse[]>(API_ENDPOINTS.LANGUAGES.LIST, {
    credentials: "include",
  });
}

/** 어학 수정 (PUT /api/profile/Languages/{id}) */
export function updateLanguage(id: number, body: LanguageRequest): Promise<LanguageResponse> {
  return put<LanguageResponse>(API_ENDPOINTS.LANGUAGES.UPDATE(id), body, {
    credentials: "include",
  });
}

/** 어학 삭제 (DELETE /api/profile/Languages/{id}) → 204 No Content */
export async function deleteLanguage(id: number): Promise<void> {
  await del<void>(API_ENDPOINTS.LANGUAGES.DELETE(id), {
    credentials: "include",
  });
}
