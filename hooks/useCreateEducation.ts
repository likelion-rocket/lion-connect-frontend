// hooks/useCreateEducation.ts
import { useMutation } from "@tanstack/react-query";
import { createEducation, EducationRequest, EducationResponse } from "@/lib/api/educations";

export function useCreateEducation(onSuccess?: (data: EducationResponse) => void) {
  return useMutation({
    mutationFn: (payload: EducationRequest) => createEducation(payload),
    onSuccess,
  });
}
