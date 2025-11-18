/**
 * 관리자 - 기업 문의 관리 API
 */

import { get, patch } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  InquiryListParams,
  InquiryListResponse,
  UpdateInquiryStatusRequest,
} from "@/types/inquiry";

/**
 * 기업 문의 목록 조회
 * GET /api/admin/inquiries
 *
 * @param params 조회 파라미터
 * @returns 페이지네이션된 문의 목록
 */
export async function getAdminInquiries(
  params: InquiryListParams = {}
): Promise<InquiryListResponse> {
  const searchParams = new URLSearchParams();

  // 파라미터 구성
  if (params.status) {
    searchParams.append("status", params.status);
  }
  if (params.profileId !== undefined) {
    searchParams.append("profileId", String(params.profileId));
  }
  if (params.profileName) {
    searchParams.append("profileName", params.profileName);
  }
  if (params.receivedFrom) {
    searchParams.append("receivedFrom", params.receivedFrom);
  }
  if (params.receivedTo) {
    searchParams.append("receivedTo", params.receivedTo);
  }
  if (params.page !== undefined) {
    searchParams.append("page", String(params.page));
  }
  if (params.size !== undefined) {
    searchParams.append("size", String(params.size));
  }
  if (params.sort && params.sort.length > 0) {
    params.sort.forEach((sortParam) => {
      searchParams.append("sort", sortParam);
    });
  }

  const queryString = searchParams.toString();
  const endpoint = `${API_ENDPOINTS.ADMIN.INQUIRIES.LIST}${queryString ? `?${queryString}` : ""}`;

  return get<InquiryListResponse>(endpoint);
}

/**
 * 문의 상태 업데이트
 * PATCH /api/admin/inquiries/{id}/status
 *
 * @param id 문의 ID
 * @param data 상태 업데이트 데이터
 */
export async function updateInquiryStatus(
  id: number,
  data: UpdateInquiryStatusRequest
): Promise<void> {
  return patch<void>(API_ENDPOINTS.ADMIN.INQUIRIES.UPDATE_STATUS(id), data);
}
