/**
 * 지원 현황 관련 React Query 훅
 */

import { useQuery, useMutation } from "@tanstack/react-query";
import { getMyJobApplications, applyToJob } from "@/services/jobApplicationService";
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
