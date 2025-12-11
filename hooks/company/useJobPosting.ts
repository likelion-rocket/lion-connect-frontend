// hooks/company/useJobPosting.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchJobPosting,
  createJobPosting,
  updateJobPosting,
  deleteJobPosting,
  type Job
} from "@/lib/api/jobPostings";
import type { JobFormData } from "@/types/job";
import { useAuthStore } from "@/store/authStore";

/**
 * 채용 공고 조회 훅
 */
export function useJobPosting(jobId: string) {
  const accessToken = useAuthStore((s) => s.accessToken);
  const enabled = !!accessToken && jobId !== "new";

  return useQuery<Job>({
    queryKey: ["jobPosting", jobId],
    queryFn: () => fetchJobPosting(jobId),
    enabled,
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

  return useMutation({
    mutationFn: (data: JobFormData) => createJobPosting(data),
    onSuccess: (newJob) => {
      // 생성 후 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["jobPostings"] });
      // 생성된 데이터를 캐시에 저장
      queryClient.setQueryData(["jobPosting", newJob.id], newJob);
    },
  });
}

/**
 * 채용 공고 수정 훅
 */
export function useUpdateJobPosting(jobId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: JobFormData) => updateJobPosting(jobId, data),
    onSuccess: (updatedJob) => {
      // 수정 후 해당 쿼리와 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["jobPosting", jobId] });
      queryClient.invalidateQueries({ queryKey: ["jobPostings"] });
      // 업데이트된 데이터를 캐시에 저장
      queryClient.setQueryData(["jobPosting", jobId], updatedJob);
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
