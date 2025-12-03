// lib/api/profiles.ts
import { post, get, put, del } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import type { ProfileRequest, ProfileResponse, ProfileListResponse } from "@/types/talent";

// Re-export types for other modules
export type { ProfileResponse, ProfileListResponse };

/**
 * ✅ 빈 프로필 생성 API (POST /api/profile)
 * - 신규 프로필을 생성할 때 사용
 * - 생성 후 profileId를 반환받아 해당 프로필 편집 페이지로 이동
 */
export function createEmptyProfile(name: string): Promise<ProfileResponse> {
  return post<ProfileResponse>(
    API_ENDPOINTS.PROFILES.CREATE,
    {
      name,
      introduction: "",
      storageUrl: "",
      visibility: "PRIVATE",
    },
    {
      credentials: "include",
    }
  );
}

/**
 * ✅ 특정 프로필 조회 API (GET /api/profile/me?profileId={profileId})
 * - profileId로 특정 프로필 조회
 */
export function fetchProfile(profileId: string | number): Promise<ProfileResponse> {
  return get<ProfileResponse>(`${API_ENDPOINTS.PROFILES.GET}?profileId=${profileId}`, {
    credentials: "include",
  });
}

/**
 * ✅ 특정 프로필 수정 API (PUT /api/profile/me?profileId={profileId})
 * - profileId로 특정 프로필 업데이트
 * - likelionCode가 undefined인 경우 필드 자체를 제거
 */
export function updateProfile(
  profileId: string | number,
  body: ProfileRequest
): Promise<ProfileResponse> {
  const cleanBody = { ...body };
  if (!cleanBody.likelionCode) {
    delete cleanBody.likelionCode;
  }

  return put<ProfileResponse>(`${API_ENDPOINTS.PROFILES.GET}?profileId=${profileId}`, cleanBody, {
    credentials: "include",
  });
}

/**
 * ✅ 특정 프로필 삭제 API (DELETE /api/profile/me?profileId={profileId})
 * - profileId로 특정 프로필 삭제
 */
export function deleteProfile(profileId: string | number): Promise<void> {
  return del<void>(`${API_ENDPOINTS.PROFILES.DELETE}?profileId=${profileId}`, {
    credentials: "include",
  });
}

/**
 * ✅ 프로필 목록 조회 API (GET /api/profile)
 * - 현재 로그인한 사용자의 모든 프로필 목록 조회
 */
export function fetchMyProfiles(): Promise<ProfileListResponse[]> {
  return get<ProfileListResponse[]>(API_ENDPOINTS.PROFILES.LIST, {
    credentials: "include",
  });
}

// ==================== 하위 호환성을 위한 기존 함수 유지 ====================

/**
 * ⚠️ Deprecated: 하위 호환성을 위해 유지
 * 대신 createEmptyProfile() 사용 권장
 */
export function createProfile(body: ProfileRequest): Promise<ProfileResponse> {
  const cleanBody = { ...body };
  if (!cleanBody.likelionCode) {
    delete cleanBody.likelionCode;
  }

  return post<ProfileResponse>(API_ENDPOINTS.PROFILES.CREATE, cleanBody, {
    credentials: "include",
  });
}

/**
 * ⚠️ Deprecated: 하위 호환성을 위해 유지
 * 대신 fetchProfile(profileId) 사용 권장
 */
export function fetchMyProfile(): Promise<ProfileResponse> {
  return get<ProfileResponse>(API_ENDPOINTS.PROFILES.GET, {
    credentials: "include",
  });
}

/**
 * ⚠️ Deprecated: 하위 호환성을 위해 유지
 * 대신 updateProfile(profileId, body) 사용 권장
 */
export function updateMyProfile(body: ProfileRequest): Promise<ProfileResponse> {
  const cleanBody = { ...body };
  if (!cleanBody.likelionCode) {
    delete cleanBody.likelionCode;
  }

  return put<ProfileResponse>(API_ENDPOINTS.PROFILES.UPDATE, cleanBody, {
    credentials: "include",
  });
}
