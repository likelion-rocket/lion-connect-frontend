// lib/api/adminUsers.ts

import { API_ENDPOINTS } from "@/constants/api";
import { get, post, del } from "@/lib/apiClient";
import { AdminUsersResponse, ProfileLockResponse } from "@/types/admin";

/**
 * 관리자 사용자 목록 조회 파라미터
 */
export type FetchAdminUsersParams = {
  page?: number;
  size?: number;
};

/**
 * 관리자 사용자 목록 조회 API (클라이언트 컴포넌트용)
 * GET /api/admin/users?page={page}&size={size}
 */
export async function fetchAdminUsers({
  page = 0,
  size = 20,
}: FetchAdminUsersParams = {}): Promise<AdminUsersResponse> {
  const params = new URLSearchParams();

  params.set("page", String(page));
  params.set("size", String(size));

  const url = `${API_ENDPOINTS.ADMIN.USERS.LIST}?${params.toString()}`;

  return get<AdminUsersResponse>(url);
}

/**
 * 프로필 잠금 API
 * POST /api/admin/profiles/{profileId}/lock
 */
export async function lockProfile(profileId: number): Promise<ProfileLockResponse> {
  return post<ProfileLockResponse>(`/admin/profiles/${profileId}/lock`);
}

/**
 * 프로필 잠금 해제 API
 * POST /api/admin/profiles/{profileId}/unlock
 */
export async function unlockProfile(profileId: number): Promise<ProfileLockResponse> {
  return post<ProfileLockResponse>(`/admin/profiles/${profileId}/unlock`);
}

/**
 * 관리자 권한 부여 API
 * POST /api/users/{userId}/roles?role=ADMIN
 */
export async function grantAdminRole(userId: number): Promise<void> {
  return post<void>(`/users/${userId}/roles?role=ADMIN`);
}

/**
 * 관리자 권한 제거 API
 * DELETE /api/users/{userId}/roles?role=ADMIN
 */
export async function revokeAdminRole(userId: number): Promise<void> {
  return del<void>(`/users/${userId}/roles?role=ADMIN`);
}
