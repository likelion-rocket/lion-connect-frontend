/**
 * 기업 문의 API 서비스
 */

import { get, patch, del } from "@/lib/apiClient";
import type { InquiryListParams, InquiryListResponse, InquiryStatus } from "@/types/inquiry";

/**
 * 문의 목록 조회
 */
export async function getInquiries(params: InquiryListParams): Promise<InquiryListResponse> {
  const searchParams = new URLSearchParams();

  if (params.q) searchParams.set("q", params.q);
  if (params.status) searchParams.set("status", params.status);
  if (params.period) searchParams.set("period", params.period);
  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));

  const query = searchParams.toString();
  const endpoint = `/inquiries${query ? `?${query}` : ""}`;

  return get<InquiryListResponse>(endpoint);
}

/**
 * 문의 상태 업데이트
 */
export async function updateInquiryStatus(inquiryId: string, status: InquiryStatus): Promise<void> {
  return patch<void>(`/inquiries/${inquiryId}/status`, { status });
}

/**
 * 문의 삭제
 */
export async function deleteInquiry(inquiryId: string): Promise<void> {
  return del<void>(`/inquiries/${inquiryId}`);
}
