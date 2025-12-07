import { post, get, del, put } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import type { CertificationRequest, CertificationResponse } from "@/types/talent";

// Re-export types for backwards compatibility
export type { CertificationRequest, CertificationResponse };
export type CertificationListItem = CertificationResponse;

/**
 * ✅ 자격증 배치 생성 (POST /api/profile/certifications?profileId={profileId})
 * - 배열 전송으로 여러 자격증을 한번에 생성
 */
export function createCertifications(
  profileId: string | number,
  body: CertificationRequest[]
): Promise<CertificationResponse[]> {
  return post<CertificationResponse[]>(
    `${API_ENDPOINTS.CERTIFICATIONS.CREATE}?profileId=${profileId}`,
    body,
    {
      credentials: "include",
    }
  );
}

/**
 * ✅ 자격증 목록 조회 (GET /api/profile/certifications?profileId={profileId})
 * - 특정 프로필의 자격증 목록 조회
 */
export function fetchCertifications(profileId: string | number): Promise<CertificationResponse[]> {
  return get<CertificationResponse[]>(
    `${API_ENDPOINTS.CERTIFICATIONS.LIST}?profileId=${profileId}`,
    {
      credentials: "include",
    }
  );
}

/**
 * ✅ 자격증 수정 (PUT /api/profile/certifications/{id}?profileId={profileId})
 * - 특정 자격증 항목 수정
 */
export function updateCertification(
  profileId: string | number,
  id: number,
  body: CertificationRequest
): Promise<CertificationResponse> {
  return put<CertificationResponse>(
    `${API_ENDPOINTS.CERTIFICATIONS.UPDATE(id)}?profileId=${profileId}`,
    body,
    {
      credentials: "include",
    }
  );
}

/**
 * ✅ 자격증 삭제 (DELETE /api/profile/certifications/{id}?profileId={profileId})
 * - 특정 자격증 항목 삭제
 */
export async function deleteCertification(profileId: string | number, id: number): Promise<void> {
  await del<void>(`${API_ENDPOINTS.CERTIFICATIONS.DELETE(id)}?profileId=${profileId}`, {
    credentials: "include",
  });
}
