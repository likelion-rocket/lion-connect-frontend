import { get, put } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import type { CustomSkillResponse, CustomSkillUpdateRequest } from "@/types/talent";

// ✅ 내 커스텀 스킬 조회 (GET /api/profile/custom-skills)
export function fetchMyCustomSkills() {
  return get<CustomSkillResponse[]>(API_ENDPOINTS.CUSTOM_SKILLS.GET, {
    credentials: "include",
  });
}

// ✅ 내 커스텀 스킬 업데이트 (PUT /api/profile/custom-skills)
export function updateMyCustomSkills(body: CustomSkillUpdateRequest) {
  return put<CustomSkillResponse[]>(API_ENDPOINTS.CUSTOM_SKILLS.UPDATE, body, {
    credentials: "include",
  });
}
