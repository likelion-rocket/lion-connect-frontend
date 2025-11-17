import { get, put } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";

export type ProfileSkillItem = {
  id: number;
  name: string;
  category: string;
};

export type UpdateSkillsRequest = {
  ids: number[];
};

// ✅ 내 스킬 태그 선택 목록 조회 (GET /api/profile/skills)
export function fetchMySkills() {
  return get<ProfileSkillItem[]>(API_ENDPOINTS.SKILLS.GET, {
    credentials: "include",
  });
}

// ✅ 내 스킬 태그 선택 목록 치환 (PUT /api/profile/skills)
export function updateMySkills(body: UpdateSkillsRequest) {
  return put<ProfileSkillItem[]>(API_ENDPOINTS.SKILLS.UPDATE, body, {
    credentials: "include",
  });
}
