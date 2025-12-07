// lib/api/profilePortfolio.ts
import { post } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  PortfolioPresignRequest,
  PortfolioPresignResponse,
  PortfolioUploadCompleteResponse,
} from "@/types/talent";

/**
 * ✅ Step 1: 포트폴리오(PDF) presigned URL 발급 (POST /api/profile/{profileId}/portfolio/presign)
 */
export function presignPortfolio(
  profileId: number | string,
  body: PortfolioPresignRequest
): Promise<PortfolioPresignResponse> {
  return post<PortfolioPresignResponse>(API_ENDPOINTS.PROFILE_RESUME.PRESIGN(profileId), body, {
    credentials: "include",
  });
}

/**
 * ✅ Step 2: 포트폴리오 업로드 완료 처리 (POST /api/profile/{profileId}/portfolio)
 * S3 업로드 완료 후 백엔드에 알려서 프로필 링크 저장을 위한 메타데이터를 받아옴
 */
export function completePortfolioUpload(
  profileId: number | string,
  body: {
    objectKey: string;
    originalFilename: string;
    contentType: string;
    fileSize: number;
  }
): Promise<PortfolioUploadCompleteResponse> {
  return post<PortfolioUploadCompleteResponse>(
    API_ENDPOINTS.PROFILE_RESUME.UPLOAD_COMPLETE(profileId),
    body,
    {
      credentials: "include",
    }
  );
}

/**
 * ✅ 포트폴리오(PDF) 실제 S3 업로드 (PUT)
 * - profileId 불필요 (presigned URL에 이미 포함됨)
 */
export async function uploadPortfolioToS3(uploadUrl: string, file: File): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type || "application/pdf",
    },
    body: file,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`[포트폴리오 업로드 실패] status=${res.status}, body=${text}`);
  }
}
