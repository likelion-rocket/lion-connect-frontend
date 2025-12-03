// lib/api/educations.ts
import { post, get, put, del } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import type { EducationRequest, EducationResponse } from "@/types/talent";

// Re-export types for backwards compatibility
export type { EducationRequest, EducationResponse };
export type EducationListItem = EducationResponse;

/**
 * ✅ 학력 배치 생성 (POST /api/profile/educations?profileId={profileId})
 * - 배열 전송으로 여러 학력을 한번에 생성
 */
export function createEducations(
  profileId: string | number,
  body: EducationRequest[]
): Promise<EducationResponse[]> {
  return post<EducationResponse[]>(
    `${API_ENDPOINTS.EDUCATIONS.CREATE}?profileId=${profileId}`,
    body,
    {
      credentials: "include",
    }
  );
}

/**
 * ✅ 학력 목록 조회 (GET /api/profile/educations?profileId={profileId})
 * - 특정 프로필의 학력 목록 조회
 */
export function fetchEducations(profileId: string | number): Promise<EducationResponse[]> {
  return get<EducationResponse[]>(`${API_ENDPOINTS.EDUCATIONS.LIST}?profileId=${profileId}`, {
    credentials: "include",
  });
}

/**
 * ✅ 학력 수정 (PUT /api/profile/educations/{id}?profileId={profileId})
 * - 특정 학력 항목 수정
 */
export function updateEducation(
  profileId: string | number,
  id: number,
  body: EducationRequest
): Promise<EducationResponse> {
  return put<EducationResponse>(
    `${API_ENDPOINTS.EDUCATIONS.UPDATE(id)}?profileId=${profileId}`,
    body,
    {
      credentials: "include",
    }
  );
}

/**
 * ✅ 학력 삭제 (DELETE /api/profile/educations/{id}?profileId={profileId})
 * - 특정 학력 항목 삭제
 */
export async function deleteEducation(profileId: string | number, id: number): Promise<void> {
  await del<void>(`${API_ENDPOINTS.EDUCATIONS.DELETE(id)}?profileId=${profileId}`, {
    credentials: "include",
  });
}

// ==================== 하위 호환성을 위한 기존 함수 유지 ====================

/**
 * ⚠️ Deprecated: 하위 호환성을 위해 유지
 * 대신 createEducations(profileId, body) 사용 권장
 */
export function createEducation(body: EducationRequest): Promise<EducationResponse> {
  return post<EducationResponse>(API_ENDPOINTS.EDUCATIONS.CREATE, body, {
    credentials: "include",
  });
}

/**
 * ⚠️ Deprecated: 하위 호환성을 위해 유지
 * 대신 fetchEducations(profileId) 사용 권장
 */
export function fetchMyEducations(): Promise<EducationResponse[]> {
  return get<EducationResponse[]>(API_ENDPOINTS.EDUCATIONS.LIST, {
    credentials: "include",
  });
}
