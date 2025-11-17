// hooks/useUpdateSkills.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMySkills, type UpdateSkillsRequest } from "@/lib/api/skills";

export function useUpdateSkills() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateSkillsRequest) => updateMySkills(body),
    onSuccess: () => {
      // 저장 후 내 스킬 목록 다시 불러오도록 invalidate
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
  });
}
