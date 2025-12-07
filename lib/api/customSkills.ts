import { get, put } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import type { CustomSkillResponse, CustomSkillUpdateRequest } from "@/types/talent";

/**
 * ✅ 커스텀 스킬 조회 (GET /api/profile/custom-skills?profileId={profileId})
 * - 특정 프로필의 커스텀 스킬 목록 조회
 */
export function fetchCustomSkills(profileId: string | number) {
  return get<CustomSkillResponse[]>(`${API_ENDPOINTS.CUSTOM_SKILLS.GET}?profileId=${profileId}`, {
    credentials: "include",
  });
}

/**
 * ✅ 커스텀 스킬 업데이트 (PUT /api/profile/custom-skills?profileId={profileId})
 * - 특정 프로필의 커스텀 스킬 목록 업데이트
 */
export function updateCustomSkills(profileId: string | number, body: CustomSkillUpdateRequest) {
  return put<CustomSkillResponse[]>(
    `${API_ENDPOINTS.CUSTOM_SKILLS.UPDATE}?profileId=${profileId}`,
    body,
    {
      credentials: "include",
    }
  );
}
