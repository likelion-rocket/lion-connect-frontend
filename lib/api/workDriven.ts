// lib/api/workDriven.ts
import { post, get } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import type { WorkDrivenTestSubmitRequest, WorkDrivenTestResultResponse } from "@/types/talent";

/**
 * Work Driven 테스트 제출 API (POST /api/profile/work-driven/submit)
 * - 16개 질문에 대한 답변 제출
 * - 수정 시에도 동일한 API 사용
 */
export function submitWorkDrivenTest(body: WorkDrivenTestSubmitRequest): Promise<void> {
  return post<void>(API_ENDPOINTS.WORK_DRIVEN.SUBMIT, body, {
    credentials: "include",
  });
}

/**
 * Work Driven 테스트 결과 조회 API (GET /api/profile/work-driven/result)
 * - 현재 사용자의 테스트 결과 조회
 */
export function fetchWorkDrivenTestResult(): Promise<WorkDrivenTestResultResponse> {
  return get<WorkDrivenTestResultResponse>(API_ENDPOINTS.WORK_DRIVEN.RESULT, {
    credentials: "include",
  });
}
