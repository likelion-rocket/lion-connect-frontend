// lib/api/experiences.ts
import { post, get, put, del } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";

/** ---------- Types ---------- */
export type ExperienceRequest = {
  companyName: string;
  department?: string;
  position?: string;
  startDate: string; // "YYYY-MM-DD"
  endDate?: string | null; // "YYYY-MM-DD" | 재직중이면 null/생략
  isCurrent: boolean;
  description?: string;
};

/** 스웨거 응답 스키마 기준 */
export type ExperienceResponse = {
  id: number;
  companyName: string;
  department: string | null;
  position: string | null;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

/** 필요 시 응답 확장 타입(옵셔널 필드 등) */
export type ExperienceListItem = ExperienceResponse;

/** ---------- APIs (호출부 없음) ---------- */

/** 경력 생성 (POST /api/profile/experiences) */
export function createExperience(body: ExperienceRequest): Promise<ExperienceResponse> {
  return post<ExperienceResponse>(API_ENDPOINTS.EXPERIENCES.CREATE, body, {
    credentials: "include",
  });
}

/** 내 경력 목록 조회 (GET /api/profile/experiences) */
export function fetchMyExperiences(): Promise<ExperienceListItem[]> {
  return get<ExperienceListItem[]>(API_ENDPOINTS.EXPERIENCES.LIST, {
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
