// lib/api/educations.ts
import { post, get, put } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";

export type EducationRequest = {
  schoolName: string;
  major?: string;
  status?: string;
  startDate?: string; // "YYYY-MM-DD"
  endDate?: string; // "YYYY-MM-DD"
  description?: string;
};

/** ✅ 백엔드 예시에 degree가 포함될 수 있어 옵셔널로 확장 */
export type EducationListItem = EducationResponse & {
  degree?: string | null;
};

export type EducationResponse = {
  id: number;
  schoolName: string;
  major: string | null;
  status: string | null;
  startDate: string;
  endDate: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export function createEducation(body: EducationRequest): Promise<EducationResponse> {
  return post<EducationResponse>(API_ENDPOINTS.EDUCATIONS.CREATE, body, {
    // 세션/쿠키 쓰면 포함, 아니면 제거 가능
    credentials: "include",
  });
}

/** ✅ 내 학력 목록 조회 (GET /api/profile/educations) */
export function fetchMyEducations(): Promise<EducationListItem[]> {
  return get<EducationListItem[]>(API_ENDPOINTS.EDUCATIONS.LIST, {
    credentials: "include",
  });
}

/** ✅ 학력 수정 (PUT /api/profile/educations/{id}) */
export function updateEducation(id: number, body: EducationRequest): Promise<EducationResponse> {
  return put<EducationResponse>(API_ENDPOINTS.EDUCATIONS.UPDATE(id), body, {
    credentials: "include",
  });
}
