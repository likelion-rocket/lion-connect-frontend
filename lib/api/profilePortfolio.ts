// lib/api/profilePortfolio.ts
import { post } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";

export type PortfolioPresignRequest = {
  originalFilename: string;
  contentType: string;
};

export type PortfolioPresignResponse = {
  uploadUrl: string;
  fileUrl: string;
};

/** 포트폴리오(PDF) S3 presigned URL 발급 */
export function presignPortfolio(body: PortfolioPresignRequest): Promise<PortfolioPresignResponse> {
  return post<PortfolioPresignResponse>(API_ENDPOINTS.PROFILE_RESUME.PRESIGN, body, {
    credentials: "include",
  });
}

/** 포트폴리오(PDF) 실제 S3 업로드 (PUT) */
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
