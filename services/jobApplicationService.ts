/**
 * 지원 현황 API 서비스
 */

import { get } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import type { JobApplicationsResponse, JobApplicationsRequest } from "@/types/jobApplication";

/**
 * 내 지원 현황 목록 조회
 */
export async function getMyJobApplications(
  params: JobApplicationsRequest
): Promise<JobApplicationsResponse> {
  const queryParams = new URLSearchParams({
    page: params.page.toString(),
    size: params.size.toString(),
  });

  // sort 파라미터가 있으면 추가
  if (params.sort && params.sort.length > 0) {
    params.sort.forEach((sortParam) => {
      queryParams.append("sort", sortParam);
    });
  }

  const endpoint = `${API_ENDPOINTS.JOB_APPLICATIONS.LIST}?${queryParams.toString()}`;

  return get<JobApplicationsResponse>(endpoint);
}
