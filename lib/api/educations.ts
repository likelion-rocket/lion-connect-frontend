// lib/api/educations.ts
import { post, get, put, del } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import type { EducationRequest, EducationResponse } from "@/types/talent";

// Re-export types for backwards compatibility
export type { EducationRequest, EducationResponse };
export type EducationListItem = EducationResponse;

export function createEducation(body: EducationRequest): Promise<EducationResponse> {
  return post<EducationResponse>(API_ENDPOINTS.EDUCATIONS.CREATE, body, {
    // 세션/쿠키 쓰면 포함, 아니면 제거 가능
    credentials: "include",
  });
}

/** ✅ 내 학력 목록 조회 (GET /api/profile/educations) */
export function fetchMyEducations(): Promise<EducationResponse[]> {
  return get<EducationResponse[]>(API_ENDPOINTS.EDUCATIONS.LIST, {
    credentials: "include",
  });
}

/** ✅ 학력 수정 (PUT /api/profile/educations/{id}) */
export function updateEducation(id: number, body: EducationRequest): Promise<EducationResponse> {
  return put<EducationResponse>(API_ENDPOINTS.EDUCATIONS.UPDATE(id), body, {
    credentials: "include",
  });
}

/** ✅ 학력 삭제 (DELETE /api/profile/educations/{id}) → 204 No Content */
export async function deleteEducation(id: number): Promise<void> {
  await del<void>(API_ENDPOINTS.EDUCATIONS.DELETE(id), {
    credentials: "include",
  });
}
