import { useMutation } from "@tanstack/react-query";
import {
  updateMyTendencies,
  type UpdateTendenciesRequest,
  type TendencyItem,
} from "@/lib/api/tendencies";

export function useUpdateTendencies(onSuccess?: (data: TendencyItem[]) => void) {
  return useMutation({
    mutationFn: (payload: UpdateTendenciesRequest) => updateMyTendencies(payload),
    onSuccess,
  });
}
