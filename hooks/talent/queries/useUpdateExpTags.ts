// hooks/useUpdateExpTags.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyExpTags, type UpdateExpTagsRequest } from "@/lib/api/expTags";

export function useUpdateExpTags() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateExpTagsRequest) => updateMyExpTags(body),
    onSuccess: () => {
      // 저장 후 내 태그 목록 다시 쓰도록 invalidate
      queryClient.invalidateQueries({ queryKey: ["expTags"] });
    },
  });
}
