// lib/api/tendencies.ts
import { put } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";

export type UpdateTendenciesRequest = { ids: number[] };
export type TendencyItem = { id: number; category: string; name: string };

// 내 성향 갱신(치환)
export function updateMyTendencies(body: UpdateTendenciesRequest) {
  return put<TendencyItem[]>(API_ENDPOINTS.TENDENCIES.UPDATE, body, {
    credentials: "include",
  });
}
