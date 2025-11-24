// lib/api/experiences.ts
import { post, get, put, del } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import type { ExperienceRequest, ExperienceResponse } from "@/types/talent";

// Re-export types for backwards compatibility
export type { ExperienceRequest, ExperienceResponse };
export type ExperienceListItem = ExperienceResponse;

/** ---------- APIs (호출부 없음) ---------- */

/** 경력 생성 (POST /api/profile/experiences) */
export function createExperience(body: ExperienceRequest): Promise<ExperienceResponse> {
  return post<ExperienceResponse>(API_ENDPOINTS.EXPERIENCES.CREATE, body, {
    credentials: "include",
  });
}

/** 내 경력 목록 조회 (GET /api/profile/experiences) */
export function fetchMyExperiences(): Promise<ExperienceResponse[]> {
  return get<ExperienceResponse[]>(API_ENDPOINTS.EXPERIENCES.LIST, {
    credentials: "include",
  });
}

/** 경력 수정 (PUT /api/profile/experiences/{id}) */
export function updateExperience(id: number, body: ExperienceRequest): Promise<ExperienceResponse> {
  return put<ExperienceResponse>(API_ENDPOINTS.EXPERIENCES.UPDATE(id), body, {
    credentials: "include",
  });
}

/** 경력 삭제 (DELETE /api/profile/experiences/{id}) → 204 No Content */
export async function deleteExperience(id: number): Promise<void> {
  await del<void>(API_ENDPOINTS.EXPERIENCES.DELETE(id), {
    credentials: "include",
  });
}
