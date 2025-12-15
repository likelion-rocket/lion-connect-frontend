/**
 * 지원 현황 관련 React Query 훅
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyJobApplications, applyToJob, cancelJobApplication } from "@/services/jobApplicationService";
import type { JobApplicationsRequest, ApplyJobRequest } from "@/types/jobApplication";

/**
 * 내 지원 현황 목록 조회 훅
 */
export function useJobApplications(params: JobApplicationsRequest) {
  return useQuery({
    queryKey: ["jobApplications", params],
    queryFn: () => getMyJobApplications(params),
    staleTime: 1000 * 60 * 5, // 5분
  });
}

/**
 * 채용공고 지원 훅
 */
export function useApplyToJob() {
  return useMutation({
    mutationFn: ({ jobId, data }: { jobId: number | string; data: ApplyJobRequest }) =>
      applyToJob(jobId, data),
  });
}

/**
 * 지원 취소 훅
 */
export function useCancelJobApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobApplicationId: number | string) => cancelJobApplication(jobApplicationId),
    onSuccess: () => {
      // 지원 현황 목록 쿼리 무효화하여 자동 새로고침
      queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
    },
  });
}
