// lib/api/experiences.ts
import { post, get, put, del } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import type { ExperienceRequest, ExperienceResponse } from "@/types/talent";

// Re-export types for backwards compatibility
export type { ExperienceRequest, ExperienceResponse };
export type ExperienceListItem = ExperienceResponse;

/**
 * ✅ 경력 배치 생성 (POST /api/profile/experiences?profileId={profileId})
 * - 배열 전송으로 여러 경력을 한번에 생성
 */
export function createExperiences(
  profileId: string | number,
  body: ExperienceRequest[]
): Promise<ExperienceResponse[]> {
  return post<ExperienceResponse[]>(
    `${API_ENDPOINTS.EXPERIENCES.CREATE}?profileId=${profileId}`,
    body,
    {
      credentials: "include",
    }
  );
}

/**
 * ✅ 경력 목록 조회 (GET /api/profile/experiences?profileId={profileId})
 * - 특정 프로필의 경력 목록 조회
 */
export function fetchExperiences(profileId: string | number): Promise<ExperienceResponse[]> {
  return get<ExperienceResponse[]>(`${API_ENDPOINTS.EXPERIENCES.LIST}?profileId=${profileId}`, {
    credentials: "include",
  });
}

/**
 * ✅ 경력 수정 (PUT /api/profile/experiences/{id}?profileId={profileId})
 * - 특정 경력 항목 수정
 */
export function updateExperience(
  profileId: string | number,
  id: number,
  body: ExperienceRequest
): Promise<ExperienceResponse> {
  return put<ExperienceResponse>(
    `${API_ENDPOINTS.EXPERIENCES.UPDATE(id)}?profileId=${profileId}`,
    body,
    {
      credentials: "include",
    }
  );
}

/**
 * ✅ 경력 삭제 (DELETE /api/profile/experiences/{id}?profileId={profileId})
 * - 특정 경력 항목 삭제
 */
export async function deleteExperience(profileId: string | number, id: number): Promise<void> {
  await del<void>(`${API_ENDPOINTS.EXPERIENCES.DELETE(id)}?profileId=${profileId}`, {
    credentials: "include",
  });
}

// ==================== 하위 호환성을 위한 기존 함수 유지 ====================

/**
 * ⚠️ Deprecated: 하위 호환성을 위해 유지
 */
export function createExperience(body: ExperienceRequest): Promise<ExperienceResponse> {
  return post<ExperienceResponse>(API_ENDPOINTS.EXPERIENCES.CREATE, body, {
    credentials: "include",
  });
}

/**
 * ⚠️ Deprecated: 하위 호환성을 위해 유지
 */
export function fetchMyExperiences(): Promise<ExperienceResponse[]> {
  return get<ExperienceResponse[]>(API_ENDPOINTS.EXPERIENCES.LIST, {
    credentials: "include",
  });
}
