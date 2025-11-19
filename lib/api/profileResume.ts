// lib/api/profileResume.ts
import { post } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";

export type ResumePresignRequest = {
  originalFilename: string;
  contentType: string;
};

export type ResumePresignResponse = {
  uploadUrl: string;
  fileUrl: string;
};

/** 이력서(PDF) S3 presigned URL 발급 */
export function presignResume(body: ResumePresignRequest): Promise<ResumePresignResponse> {
  return post<ResumePresignResponse>(API_ENDPOINTS.PROFILE_RESUME.PRESIGN, body, {
    credentials: "include",
  });
}

/** 이력서(PDF) 실제 S3 업로드 (PUT) */
export async function uploadResumeToS3(uploadUrl: string, file: File): Promise<void> {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type || "application/pdf",
    },
    body: file,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`[이력서 업로드 실패] status=${res.status}, body=${text}`);
  }
}
