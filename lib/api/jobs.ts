// /lib/api/jobs.ts
import { get, put } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";

/** GET/PUT 공통으로 쓰는 직무 아이템 타입 */
export type JobCategoryItem = {
  id: number;
  name: string;
};

/**
 * 직무 카테고리 선택 목록 치환 요청 바디
 * 직무(Job Role) ID만 전송 (직군은 직무에 포함되어 있으므로 불필요)
 */
export type UpdateJobsRequest = {
  ids: number[]; // 직무 ID 배열 (일반적으로 1개의 ID만 포함)
};

/**
 * ✅ 직무 카테고리 선택 목록 조회 (GET /profile/job-categories-with-groups?profileId={profileId})
 * - 응답 형식: [{ id: 직군ID, name: 직군명 }, { id: 직무ID, name: 직무명 }]
 * - 0번째 요소: 직군 (Job Group)
 * - 1번째 요소: 직무 (Job Role)
 */
export function fetchJobs(profileId: string | number): Promise<JobCategoryItem[]> {
  return get<JobCategoryItem[]>(`${API_ENDPOINTS.JOBS.GET}?profileId=${profileId}`, {
    credentials: "include",
  });
}

/**
 * ✅ 직무 카테고리 선택 목록 치환 (PUT /profile/job-categories?profileId={profileId})
 * - 직무 ID만 전송하면 서버에서 해당 직무와 연관된 직군을 자동으로 처리
 */
export function updateJobs(
  profileId: string | number,
  body: UpdateJobsRequest
): Promise<JobCategoryItem[]> {
  return put<JobCategoryItem[]>(`${API_ENDPOINTS.JOBS.UPDATE}?profileId=${profileId}`, body, {
    credentials: "include",
  });
}

// ==================== 하위 호환성을 위한 기존 함수 유지 ====================

/**
 * ⚠️ Deprecated: 하위 호환성을 위해 유지
 */
export function fetchMyJobs(): Promise<JobCategoryItem[]> {
  return get<JobCategoryItem[]>(API_ENDPOINTS.JOBS.GET, {
    credentials: "include",
  });
}
