// lib/api/profileThumbnail.ts
import { get, post, put, del } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  ProfileResponse,
  ThumbnailPresignRequest,
  ThumbnailPresignResponse,
  ProfileLink,
  ProfileLinkUpsertRequest,
} from "@/types/talent";

/** 썸네일 업로드용 presign URL 발급 (POST /api/profile/me/thumbnail/presign) */
export function presignThumbnail(body: ThumbnailPresignRequest): Promise<ThumbnailPresignResponse> {
  // 👉 이건 백엔드라 credentials: "include" 그대로 써도 됨 (쿠키/세션용)
  return post<ThumbnailPresignResponse>(API_ENDPOINTS.PROFILE_THUMBNAIL.PRESIGN, body, {
    credentials: "include",
  });
}

/** 내 프로필 링크 목록 조회 (GET /api/profile/me/links) */
export function fetchMyProfileLinks(): Promise<ProfileLink[]> {
  return get<ProfileLink[]>(API_ENDPOINTS.PROFILE_LINKS.LIST, {
    credentials: "include",
  });
}

/* =========================================
 *  ✅ 공용 링크 upsert / delete
 * ========================================= */

/** 任의 type 에 대한 프로필 링크 upsert (PUT / POST 공용) */
export function upsertMyProfileLink(
  type: string,
  body: ProfileLinkUpsertRequest,
  method: "PUT" | "POST" = "PUT"
): Promise<ProfileResponse> {
  const endpoint = API_ENDPOINTS.PROFILE_LINKS.UPSERT(type);

  // API spec: 배열 형식으로 전송
  const payload = [
    {
      ...body,
      type,
      sortOrder: 0,
    },
  ];

  if (method === "POST") {
    return post<ProfileResponse>(endpoint, payload, { credentials: "include" });
  }
  return put<ProfileResponse>(endpoint, payload, { credentials: "include" });
}

/** 任의 type 에 대한 프로필 링크 삭제 (DELETE /api/profile/me/links/{type}) */
export function deleteMyProfileLink(type: string): Promise<void> {
  const endpoint = API_ENDPOINTS.PROFILE_LINKS.DELETE(type);
  return del<void>(endpoint, {
    credentials: "include",
  });
}

/* =========================================
 *  ✅ 썸네일 전용 helper (기존 코드 유지용)
 * ========================================= */

/** 내 썸네일 링크 upsert (PUT 전용 - 배열 형식) */
export function upsertMyThumbnailLink(body: {
  type: string;
  url: string;
  originalFilename: string;
  contentType: string;
  fileSize: number;
}): Promise<ProfileResponse> {
  const endpoint = API_ENDPOINTS.PROFILE_LINKS.UPSERT("THUMBNAIL");

  // API spec: 배열 형식으로 전송
  const payload = [
    {
      type: body.type,
      url: body.url,
      originalFilename: body.originalFilename,
      contentType: body.contentType,
      fileSize: body.fileSize,
      sortOrder: 0,
    },
  ];

  return put<ProfileResponse>(endpoint, payload, { credentials: "include" });
}

/** 썸네일 링크 삭제 (DELETE /api/profile/me/links/THUMBNAIL) */
export function deleteMyThumbnailLink(): Promise<void> {
  return deleteMyProfileLink("THUMBNAIL");
}

/** 프로필 링크 수정 (PUT /api/profile/me/links/{id}) */
export function updateProfileLink(
  id: number,
  body: {
    url: string;
    originalFilename?: string;
    contentType?: string;
    fileSize?: number;
  }
): Promise<ProfileLink> {
  return put<ProfileLink>(`/profile/me/links/${id}`, body, {
    credentials: "include",
  });
}

/** 프로필 링크 삭제 by id (DELETE /api/profile/me/links/{id}) */
export function deleteProfileLink(id: number): Promise<void> {
  return del<void>(`/profile/me/links/${id}`, {
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
