// /lib/api/jobs.ts
import { get, put } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";

/** GET/PUT 공통으로 쓰는 직무 아이템 타입 */
export type JobCategoryItem = {
  id: number;
  name: string;
};

/** 내 직무 카테고리 선택 목록 조회 (GET /profile/job-categories) */
export function fetchMyJobs(): Promise<JobCategoryItem[]> {
  return get<JobCategoryItem[]>(API_ENDPOINTS.JOBS.GET, {
    credentials: "include",
  });
}

/** 직무 카테고리 선택 목록 치환 요청 바디 */
export type UpdateJobsRequest = {
  ids: number[];
};

/** 직무 카테고리 선택 목록 치환 (PUT /profile/job-categories) */
export function updateJobs(body: UpdateJobsRequest): Promise<JobCategoryItem[]> {
  return put<JobCategoryItem[]>(API_ENDPOINTS.JOBS.UPDATE, body, {
    credentials: "include",
  });
}
