// lib/api/profileThumbnail.ts
import { get, post, put, del } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  ProfileResponse,
  ThumbnailPresignRequest,
  ThumbnailPresignResponse,
  ThumbnailUploadCompleteResponse,
  ProfileLink,
  ProfileLinkUpsertRequest,
} from "@/types/talent";

/**
 * ✅ Step 1: 썸네일 업로드용 presign URL 발급 (POST /api/profile/{profileId}/thumbnail/presign)
 */
export function presignThumbnail(
  profileId: number | string,
  body: ThumbnailPresignRequest
): Promise<ThumbnailPresignResponse> {
  return post<ThumbnailPresignResponse>(API_ENDPOINTS.PROFILE_THUMBNAIL.PRESIGN(profileId), body, {
    credentials: "include",
  });
}

/**
 * ✅ Step 2: 썸네일 업로드 완료 처리 (POST /api/profile/{profileId}/thumbnail)
 * S3 업로드 완료 후 백엔드에 알려서 프로필 링크 저장을 위한 메타데이터를 받아옴
 */
export function completeThumbnailUpload(
  profileId: number | string,
  body: {
    objectKey: string;
    originalFilename: string;
    contentType: string;
    fileSize: number;
  }
): Promise<ThumbnailUploadCompleteResponse> {
  return post<ThumbnailUploadCompleteResponse>(
    API_ENDPOINTS.PROFILE_THUMBNAIL.UPLOAD_COMPLETE(profileId),
    body,
    {
      credentials: "include",
    }
  );
}

/**
 * ✅ 프로필 링크 목록 조회 (GET /api/profile/{profileId}/links)
 */
export function fetchProfileLinks(profileId: string | number): Promise<ProfileLink[]> {
  return get<ProfileLink[]>(API_ENDPOINTS.PROFILE_LINKS.LIST(profileId), {
    credentials: "include",
  });
}

/* =========================================
 *  ✅ 공용 링크 upsert / delete (profileId 추가)
 * ========================================= */

/**
 * ✅ 任의 type 에 대한 프로필 링크 upsert (PUT / POST 공용)
 */
export function upsertProfileLink(
  profileId: string | number,
  type: string,
  body: ProfileLinkUpsertRequest,
  method: "PUT" | "POST" = "PUT"
): Promise<ProfileResponse> {
  const endpoint = API_ENDPOINTS.PROFILE_LINKS.UPSERT(profileId, type);

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

/**
 * ✅ 任意 type 에 대한 프로필 링크 삭제 (DELETE /api/profile/{profileId}/links/{type})
 */
export function deleteProfileLinkByType(profileId: string | number, type: string): Promise<void> {
  const endpoint = API_ENDPOINTS.PROFILE_LINKS.DELETE(profileId, type);
  return del<void>(endpoint, {
    credentials: "include",
  });
}

/* =========================================
 *  ✅ 썸네일 전용 helper (profileId 추가)
 * ========================================= */

/**
 * ✅ 썸네일 링크 upsert (PUT 전용 - 배열 형식)
 */
export function upsertThumbnailLink(
  profileId: string | number,
  body: {
    type: string;
    url: string;
    originalFilename: string;
    contentType: string;
    fileSize: number;
  }
): Promise<ProfileResponse> {
  const endpoint = API_ENDPOINTS.PROFILE_LINKS.UPSERT(profileId, "THUMBNAIL");

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

/**
 * ✅ 썸네일 링크 삭제 (DELETE /api/profile/{profileId}/links/THUMBNAIL)
 */
export function deleteThumbnailLink(profileId: string | number): Promise<void> {
  return deleteProfileLinkByType(profileId, "THUMBNAIL");
}

/**
 * ✅ S3 로 실제 파일 업로드 (profileId 불필요 - presigned URL에 이미 포함됨)
 */
export async function uploadThumbnailToS3(uploadUrl: string, file: File): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!res.ok) {
    throw new Error(`S3 썸네일 업로드 실패 (status: ${res.status})`);
  }
}

// ==================== 하위 호환성을 위한 기존 함수 유지 ====================

/**
 * ⚠️ Deprecated: 하위 호환성을 위해 유지
 */
export function fetchMyProfileLinks(): Promise<ProfileLink[]> {
  return get<ProfileLink[]>(API_ENDPOINTS.PROFILE_LINKS.LIST, {
    credentials: "include",
  });
}

/**
 * ⚠️ Deprecated: 하위 호환성을 위해 유지
 */
export function upsertMyProfileLink(
  type: string,
  body: ProfileLinkUpsertRequest,
  method: "PUT" | "POST" = "PUT"
): Promise<ProfileResponse> {
  const endpoint = API_ENDPOINTS.PROFILE_LINKS.UPSERT(type);

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

/**
 * ⚠️ Deprecated: 하위 호환성을 위해 유지
 */
export function deleteMyProfileLink(type: string): Promise<void> {
  const endpoint = API_ENDPOINTS.PROFILE_LINKS.DELETE(type);
  return del<void>(endpoint, {
    credentials: "include",
  });
}

/**
 * ⚠️ Deprecated: 하위 호환성을 위해 유지
 */
export function upsertMyThumbnailLink(body: {
  type: string;
  url: string;
  originalFilename: string;
  contentType: string;
  fileSize: number;
}): Promise<ProfileResponse> {
  const endpoint = API_ENDPOINTS.PROFILE_LINKS.UPSERT("THUMBNAIL");

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

/**
 * ⚠️ Deprecated: 하위 호환성을 위해 유지
 */
export function deleteMyThumbnailLink(): Promise<void> {
  return deleteMyProfileLink("THUMBNAIL");
}
