// /hooks/useUpdateJobs.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJobs, type UpdateJobsRequest } from "@/lib/api/jobs";

export function useUpdateJobs() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateJobsRequest) => updateJobs(body),
    onSuccess: () => {
      // 저장 후 내 직무 정보 다시 조회
      queryClient.invalidateQueries({ queryKey: ["myJobs"] });
    },
  });
}
