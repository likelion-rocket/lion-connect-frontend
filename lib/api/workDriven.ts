// lib/api/workDriven.ts
import { post, get } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import type { WorkDrivenTestSubmitRequest, WorkDrivenTestResultResponse } from "@/types/talent";

/**
 * ✅ Work Driven 테스트 제출 API (POST /api/profile/work-driven/submit?profileId={profileId})
 * - 16개 질문에 대한 답변 제출
 * - 수정 시에도 동일한 API 사용
 */
export function submitWorkDrivenTest(
  profileId: string | number,
  body: WorkDrivenTestSubmitRequest
): Promise<void> {
  return post<void>(`${API_ENDPOINTS.WORK_DRIVEN.SUBMIT}?profileId=${profileId}`, body, {
    credentials: "include",
  });
}

/**
 * ✅ Work Driven 테스트 결과 조회 API (GET /api/profile/work-driven/result?profileId={profileId})
 * - 특정 프로필의 테스트 결과 조회
 */
export function fetchWorkDrivenTestResult(
  profileId: string | number
): Promise<WorkDrivenTestResultResponse> {
  return get<WorkDrivenTestResultResponse>(
    `${API_ENDPOINTS.WORK_DRIVEN.RESULT}?profileId=${profileId}`,
    {
      credentials: "include",
    }
  );
}

// ==================== 하위 호환성을 위한 기존 함수 유지 ====================

/**
 * ⚠️ Deprecated: 하위 호환성을 위해 유지
 */
export function fetchMyWorkDrivenTestResult(): Promise<WorkDrivenTestResultResponse> {
  return get<WorkDrivenTestResultResponse>(API_ENDPOINTS.WORK_DRIVEN.RESULT, {
    credentials: "include",
  });
}
