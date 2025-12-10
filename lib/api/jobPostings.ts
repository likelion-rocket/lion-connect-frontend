// lib/api/jobPostings.ts
// TODO: API 엔드포인트는 백엔드 API 개발 후 수정 필요
import { post, get, put, del } from "@/lib/apiClient";
import type { Job, JobFormData } from "@/types/job";

export type { Job };

/**
 * 채용 공고 생성 API
 * TODO: 실제 엔드포인트로 변경 필요
 */
export function createJobPosting(data: JobFormData): Promise<Job> {
  return post<Job>("/api/job-postings", data, {
    credentials: "include",
  });
}

/**
 * 채용 공고 조회 API
 * TODO: 실제 엔드포인트로 변경 필요
 */
export function fetchJobPosting(jobId: string): Promise<Job> {
  return get<Job>(`/api/job-postings/${jobId}`, {
    credentials: "include",
  });
}

/**
 * 채용 공고 수정 API
 * TODO: 실제 엔드포인트로 변경 필요
 */
export function updateJobPosting(jobId: string, data: JobFormData): Promise<Job> {
  return put<Job>(`/api/job-postings/${jobId}`, data, {
    credentials: "include",
  });
}

/**
 * 채용 공고 삭제 API
 * TODO: 실제 엔드포인트로 변경 필요
 */
export function deleteJobPosting(jobId: string): Promise<void> {
  return del<void>(`/api/job-postings/${jobId}`, {
    credentials: "include",
  });
}

/**
 * 채용 공고 목록 조회 API
 * TODO: 실제 엔드포인트로 변경 필요
 */
export function fetchJobPostings(): Promise<Job[]> {
  return get<Job[]>("/api/job-postings", {
    credentials: "include",
  });
}
