// lib/api/profileThumbnail.ts
import { get, post, put, del } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import type { ProfileResponse } from "./profiles";

/** presign 요청 바디 */
export type ThumbnailPresignRequest = {
  originalFilename: string;
  contentType: string;
};

/** presign 응답 */
export type ThumbnailPresignResponse = {
  uploadUrl: string;
  fileUrl: string;
};

/** 썸네일 업로드용 presign URL 발급 (POST /api/profile/me/thumbnail/presign) */
export function presignThumbnail(body: ThumbnailPresignRequest): Promise<ThumbnailPresignResponse> {
  // 👉 이건 백엔드라 credentials: "include" 그대로 써도 됨 (쿠키/세션용)
  return post<ThumbnailPresignResponse>(API_ENDPOINTS.PROFILE_THUMBNAIL.PRESIGN, body, {
    credentials: "include",
  });
}

/** 프로필 링크 한 건 타입 */
export type ProfileLink = {
  id: number;
  type: string;
  url: string;
  originalFilename: string | null;
  contentType: string | null;
  fileSize: number | null;
  createdAt: string;
  updatedAt: string;
};

/** 내 프로필 링크 목록 조회 (GET /api/profile/me/links) */
export function fetchMyProfileLinks(): Promise<ProfileLink[]> {
  return get<ProfileLink[]>(API_ENDPOINTS.PROFILE_LINKS.LIST, {
    credentials: "include",
  });
}

/** 링크 upsert 요청 DTO */
export type ProfileLinkUpsertRequest = {
  type: string; // "thumbnail"
  url: string;
  originalFilename: string;
  contentType: string;
  fileSize: number;
};

/** 내 썸네일 링크 upsert (PUT / POST 공용) */
export function upsertMyThumbnailLink(
  body: ProfileLinkUpsertRequest,
  method: "PUT" | "POST" = "PUT"
): Promise<ProfileResponse> {
  const endpoint = API_ENDPOINTS.PROFILE_LINKS.UPSERT("thumbnail");

  if (method === "POST") {
    return post<ProfileResponse>(endpoint, body, { credentials: "include" });
  }
  return put<ProfileResponse>(endpoint, body, { credentials: "include" });
}

/** 썸네일 링크 삭제 (DELETE /api/profile/me/links/thumbnail) */
export function deleteMyThumbnailLink(): Promise<void> {
  return del<void>(API_ENDPOINTS.PROFILE_LINKS.DELETE("thumbnail"), {
    credentials: "include",
  });
}

/** ✅ S3 로 실제 파일 업로드 (여기서 절대 apiClient 쓰지 말 것) */
export async function uploadThumbnailToS3(uploadUrl: string, file: File): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    // ✅ 여기 딱 이거 하나만. Authorization / credentials 등 아무것도 안 붙이기
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!res.ok) {
    throw new Error(`S3 썸네일 업로드 실패 (status: ${res.status})`);
  }
}
