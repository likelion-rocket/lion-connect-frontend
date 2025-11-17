import { get, put } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";

export type UpdateTendenciesRequest = { ids: number[] };

// Swagger 예시 기준
export type TendencyItem = {
  id: number;
  groupCode: string;
  name: string;
  displayValue: string;
};

// ✅ 내 성향 목록 조회 (GET /api/profile/tendencies)
export function fetchMyTendencies() {
  // backend에서 GET/PUT 같은 URL 쓰면 UPDATE 그대로 써도 되고,
  // 따로 MY 같은 상수 있으면 그걸로 바꿔주면 됨.
  return get<TendencyItem[]>(API_ENDPOINTS.TENDENCIES.UPDATE, {
    credentials: "include",
  });
}

// 내 성향 갱신(치환) (PUT /api/profile/tendencies)
export function updateMyTendencies(body: UpdateTendenciesRequest) {
  return put<TendencyItem[]>(API_ENDPOINTS.TENDENCIES.UPDATE, body, {
    credentials: "include",
  });
}
