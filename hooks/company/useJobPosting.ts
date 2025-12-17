// hooks/company/useJobPosting.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchJobPosting,
  fetchPublicJobPosting,
  createJobPosting,
  updateJobPosting,
  deleteJobPosting,
  type Job,
  type JobDetailResponse
} from "@/lib/api/jobPostings";
import type { JobFormData, JobPostingResponse } from "@/types/job";
import { useAuthStore } from "@/store/authStore";
import { get, patch } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import type { JobPostingsResponse, JobPostingsParams } from "@/types/company-job-posting";

/**
 * 채용 공고 목록 조회 훅
 */
export function useJobPostings(params: JobPostingsParams = {}) {
  const accessToken = useAuthStore((s) => s.accessToken);
  const enabled = !!accessToken;

  const { page = 0, size = 10, sort = ["createdAt,desc"], status } = params;

  return useQuery<JobPostingsResponse>({
    queryKey: ["jobPostings", { page, size, sort, status }],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      queryParams.append("page", page.toString());
      queryParams.append("size", size.toString());
      sort.forEach((s) => queryParams.append("sort", s));
      if (status) {
        queryParams.append("status", status);
      }

      return get<JobPostingsResponse>(
        `${API_ENDPOINTS.COMPANY_JOB_POSTINGS.LIST}?${queryParams.toString()}`
      );
    },
    enabled,
    retry: false,
    staleTime: 30 * 1000, // 30초
    gcTime: 5 * 60 * 1000, // 5분
  });
}

/**
 * 채용 공고 조회 훅 (기업용 - 인증 필요)
 */
export function useJobPosting(jobId: string) {
  const accessToken = useAuthStore((s) => s.accessToken);
  const enabled = !!accessToken && jobId !== "new";

  return useQuery<JobDetailResponse>({
    queryKey: ["jobPosting", jobId],
    queryFn: () => fetchJobPosting(jobId),
    enabled,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}

/**
 * 공개 채용 공고 상세 조회 훅 (인재용 - 인증 불필요)
 */
export function usePublicJobPosting(jobId: string) {
  return useQuery<JobDetailResponse>({
    queryKey: ["publicJobPosting", jobId],
    queryFn: () => fetchPublicJobPosting(jobId),
    enabled: jobId !== "new",
    retry: false,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}

/**
 * 채용 공고 생성 훅
 */
export function useCreateJobPosting() {
  const queryClient = useQueryClient();

  return useMutation<JobPostingResponse, Error, JobFormData>({
    mutationFn: (data: JobFormData) => createJobPosting(data),
    onSuccess: (newJob) => {
      // 생성 후 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["jobPostings"] });
      // 생성된 데이터를 캐시에 저장
      queryClient.setQueryData(["jobPosting", newJob.jobPostingId], newJob);
    },
  });
}

/**
 * 채용 공고 수정 훅
 */
export function useUpdateJobPosting(jobId: string) {
  const queryClient = useQueryClient();

  return useMutation<JobPostingResponse, Error, JobFormData>({
    mutationFn: (data: JobFormData) => updateJobPosting(jobId, data),
    onSuccess: (updatedJob) => {
      // 수정 후 해당 쿼리와 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["jobPosting", jobId] });
      queryClient.invalidateQueries({ queryKey: ["jobPostings"] });
      // 업데이트된 데이터를 캐시에 저장
      queryClient.setQueryData(["jobPosting", updatedJob.jobPostingId], updatedJob);
    },
  });
}

/**
 * 채용 공고 삭제 훅
 */
export function useDeleteJobPosting(jobId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteJobPosting(jobId),
    onSuccess: () => {
      // 삭제 후 해당 쿼리와 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["jobPosting", jobId] });
      queryClient.invalidateQueries({ queryKey: ["jobPostings"] });
      // 캐시에서 삭제
      queryClient.removeQueries({ queryKey: ["jobPosting", jobId] });
    },
  });
}

/**
 * 채용 공고 게시 훅
 */
export function usePublishJobPosting(jobId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => patch(API_ENDPOINTS.COMPANY_JOB_POSTINGS.PUBLISH(jobId)),
    onSuccess: () => {
      // 게시 후 해당 쿼리와 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["jobPosting", jobId.toString()] });
      queryClient.invalidateQueries({ queryKey: ["jobPostings"] });
    },
  });
}

/**
 * 채용 공고 게시 취소 훅
 */
export function useUnpublishJobPosting(jobId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => patch(API_ENDPOINTS.COMPANY_JOB_POSTINGS.UNPUBLISH(jobId)),
    onSuccess: () => {
      // 게시 취소 후 해당 쿼리와 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["jobPosting", jobId.toString()] });
      queryClient.invalidateQueries({ queryKey: ["jobPostings"] });
    },
  });
}
