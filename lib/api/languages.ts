import { post, get, del, put } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import type { LanguageRequest, LanguageResponse } from "@/types/talent";

// Re-export types for backwards compatibility
export type { LanguageRequest, LanguageResponse };
export type LanguageListItem = LanguageResponse;

/**
 * ✅ 어학 배치 생성 (POST /api/profile/languages?profileId={profileId})
 * - 배열 전송으로 여러 어학을 한번에 생성
 */
export function createLanguages(
  profileId: string | number,
  body: LanguageRequest[]
): Promise<LanguageResponse[]> {
  return post<LanguageResponse[]>(
    `${API_ENDPOINTS.LANGUAGES.CREATE}?profileId=${profileId}`,
    body,
    {
      credentials: "include",
    }
  );
}

/**
 * ✅ 어학 목록 조회 (GET /api/profile/languages?profileId={profileId})
 * - 특정 프로필의 어학 목록 조회
 */
export function fetchLanguages(profileId: string | number): Promise<LanguageResponse[]> {
  return get<LanguageResponse[]>(`${API_ENDPOINTS.LANGUAGES.LIST}?profileId=${profileId}`, {
    credentials: "include",
  });
}

/**
 * ✅ 어학 수정 (PUT /api/profile/languages/{id}?profileId={profileId})
 * - 특정 어학 항목 수정
 */
export function updateLanguage(
  profileId: string | number,
  id: number,
  body: LanguageRequest
): Promise<LanguageResponse> {
  return put<LanguageResponse>(
    `${API_ENDPOINTS.LANGUAGES.UPDATE(id)}?profileId=${profileId}`,
    body,
    {
      credentials: "include",
    }
  );
}

/**
 * ✅ 어학 삭제 (DELETE /api/profile/languages/{id}?profileId={profileId})
 * - 특정 어학 항목 삭제
 */
export async function deleteLanguage(profileId: string | number, id: number): Promise<void> {
  await del<void>(`${API_ENDPOINTS.LANGUAGES.DELETE(id)}?profileId=${profileId}`, {
    credentials: "include",
  });
}

// ==================== 하위 호환성을 위한 기존 함수 유지 ====================

/**
 * ⚠️ Deprecated: 하위 호환성을 위해 유지
 */
export function createLanguage(body: LanguageRequest): Promise<LanguageResponse> {
  return post<LanguageResponse>(API_ENDPOINTS.LANGUAGES.CREATE, body, {
    credentials: "include",
  });
}

/**
 * ⚠️ Deprecated: 하위 호환성을 위해 유지
 */
export function fetchMyLanguages(): Promise<LanguageResponse[]> {
  return get<LanguageResponse[]>(API_ENDPOINTS.LANGUAGES.LIST, {
    credentials: "include",
  });
}
