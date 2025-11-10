// lib/api/profiles.ts
import { post, get } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";

/** ✅ 요청 타입 */
export type ProfileRequest = {
  name: string; // 이름
  introduction: string; // 간단 소개
  storageUrl: string; // 포트폴리오 파일명
  likelionCode?: string; // 멋사 인재 등록 코드
};

/** ✅ 응답 타입 */
export type ProfileResponse = {
  id: number;
  name: string;
  introduction: string;
  storageUrl: string;
  likelionCode: string | null;
  createdAt: string;
  updatedAt: string;
};

/** ✅ 프로필 등록 API */
export function createProfile(body: ProfileRequest): Promise<ProfileResponse> {
  const cleanBody = { ...body };
  if (!cleanBody.likelionCode) delete cleanBody.likelionCode;

  return post<ProfileResponse>(API_ENDPOINTS.PROFILES.CREATE, body, {
    // 세션 기반 인증이라면 유지
    credentials: "include",
  });
}

// Swagger: GET /api/profile/me
export function fetchMyProfile(): Promise<ProfileResponse> {
  return get<ProfileResponse>(API_ENDPOINTS.PROFILES.GET, {
    credentials: "include", // 세션/쿠키로 인증한다면 유지
  });
}
