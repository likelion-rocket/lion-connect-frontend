// lib/api/profiles.ts
import { post, get, put } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import type { ProfileRequest, ProfileResponse } from "@/types/talent";

// Re-export ProfileResponse for other modules
export type { ProfileResponse };

/**
 * ✅ 프로필 생성 API (POST /api/profile/me)
 * - 처음 프로필을 생성할 때 사용
 * - likelionCode가 undefined인 경우 필드 자체를 제거
 */
export function createProfile(body: ProfileRequest): Promise<ProfileResponse> {
  // undefined 필드 제거 (백엔드가 undefined를 허용하지 않을 수 있음)
  const cleanBody = { ...body };
  if (!cleanBody.likelionCode) {
    delete cleanBody.likelionCode;
  }

  return post<ProfileResponse>(API_ENDPOINTS.PROFILES.CREATE, cleanBody, {
    credentials: "include",
  });
}

/**
 * ✅ 내 프로필 조회 API (GET /api/profile/me)
 * - 현재 로그인한 사용자의 프로필 조회
 */
export function fetchMyProfile(): Promise<ProfileResponse> {
  return get<ProfileResponse>(API_ENDPOINTS.PROFILES.GET, {
    credentials: "include",
  });
}

/**
 * ✅ 내 프로필 수정 API (PUT /api/profile/me)
 * - 기존 프로필을 업데이트할 때 사용
 * - likelionCode가 undefined인 경우 필드 자체를 제거
 */
export function updateMyProfile(body: ProfileRequest): Promise<ProfileResponse> {
  // undefined 필드 제거 (백엔드가 undefined를 허용하지 않을 수 있음)
  const cleanBody = { ...body };
  if (!cleanBody.likelionCode) {
    delete cleanBody.likelionCode;
  }

  return put<ProfileResponse>(API_ENDPOINTS.PROFILES.UPDATE, cleanBody, {
    credentials: "include",
  });
}
