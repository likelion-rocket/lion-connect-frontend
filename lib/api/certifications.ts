import { post, get, del, put } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import type { CertificationRequest, CertificationResponse } from "@/types/talent";

// Re-export types for backwards compatibility
export type { CertificationRequest, CertificationResponse };
export type CertificationListItem = CertificationResponse;

/** 자격증 생성 (POST /api/profile/certifications) - 단일 생성 (deprecated) */
export function createCertification(body: CertificationRequest): Promise<CertificationResponse> {
  return post<CertificationResponse>(API_ENDPOINTS.CERTIFICATIONS.CREATE, body, {
    credentials: "include",
  });
}

/** 자격증 배치 생성 (POST /api/profile/certifications) - 배열 전송 */
export function createCertifications(
  body: CertificationRequest[]
): Promise<CertificationResponse[]> {
  return post<CertificationResponse[]>(API_ENDPOINTS.CERTIFICATIONS.CREATE, body, {
    credentials: "include",
  });
}

/** 내 경력 목록 조회 (GET /api/profile/certifications) */
export function fetchMyCertifications(): Promise<CertificationResponse[]> {
  return get<CertificationResponse[]>(API_ENDPOINTS.CERTIFICATIONS.LIST, {
    credentials: "include",
  });
}

/** 경력 수정 (PUT /api/profile/certifications/{id}) */
export function updateCertification(
  id: number,
  body: CertificationRequest
): Promise<CertificationResponse> {
  return put<CertificationResponse>(API_ENDPOINTS.CERTIFICATIONS.UPDATE(id), body, {
    credentials: "include",
  });
}

/** 경력 삭제 (DELETE /api/profile/certifications/{id}) → 204 No Content */
export async function deleteCertification(id: number): Promise<void> {
  await del<void>(API_ENDPOINTS.CERTIFICATIONS.DELETE(id), {
    credentials: "include",
  });
}
