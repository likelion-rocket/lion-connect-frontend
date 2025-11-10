// lib/api/educations.ts
import { post } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";

export type EducationRequest = {
  schoolName: string;
  major?: string;
  status?: string;
  startDate?: string; // "YYYY-MM-DD"
  endDate?: string; // "YYYY-MM-DD"
  description?: string;
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
