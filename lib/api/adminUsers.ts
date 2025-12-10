// lib/api/adminUsers.ts

import { API_ENDPOINTS } from "@/constants/api";
import { get } from "@/lib/apiClient";
import { AdminUsersResponse } from "@/types/admin";

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
