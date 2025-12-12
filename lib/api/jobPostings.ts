// lib/api/jobPostings.ts
import { post, get, put, del } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  Job,
  JobFormData,
  JobPostingRequest,
  JobPostingResponse,
  PresignBulkRequest,
  PresignBulkResponse,
  JobImageMetadata,
  JobDetailResponse,
  ImageUploadCompleteRequest,
  ImageUploadCompleteResponse,
} from "@/types/job";

export type { Job, JobDetailResponse };

/**
 * 이미지 프리사인 URL 발급 → S3 업로드 → 업로드 완료 처리
 */
async function uploadJobImages(images: File[]): Promise<JobImageMetadata[]> {
  if (images.length === 0) {
    return [];
  }

  // 1. 프리사인 URL 발급 요청
  const presignRequest: PresignBulkRequest = {
    files: images.map((file) => ({
      originalFilename: file.name,
      contentType: file.type,
    })),
  };

  const presignResponse = await post<PresignBulkResponse>(
    API_ENDPOINTS.COMPANY_JOB_POSTINGS.IMAGES_PRESIGN_BULK,
    presignRequest
  );

  // 2. 각 이미지를 S3에 업로드 → 업로드 완료 처리
  const uploadPromises = presignResponse.uploads.map(async (uploadInfo, index) => {
    const file = images[index];

    // 2-1. S3에 파일 업로드 (presigned URL 사용)
    const uploadResponse = await fetch(uploadInfo.upload.uploadUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (!uploadResponse.ok) {
      throw new Error(`이미지 업로드 실패: ${file.name}`);
    }

    // 2-2. 업로드 완료 처리 (백엔드에 알림)
    const completeRequest: ImageUploadCompleteRequest = {
      objectKey: uploadInfo.objectKey,
      originalFilename: file.name,
      contentType: file.type,
      fileSize: file.size,
    };

    const completeResponse = await post<ImageUploadCompleteResponse>(
      API_ENDPOINTS.COMPANY_JOB_POSTINGS.IMAGES_UPLOAD_COMPLETE,
      completeRequest
    );

    // 3. 메타데이터 반환 (업로드 완료 응답에서 받은 objectKey와 fileUrl 사용)
    return {
      objectKey: completeResponse.objectKey,
      contentType: file.type,
      fileSize: file.size,
      originalFilename: file.name,
      sortOrder: index + 1,
    };
  });

  return Promise.all(uploadPromises);
}

/**
 * JobFormData를 JobPostingRequest로 변환
 */
function convertFormDataToRequest(
  formData: JobFormData,
  imageMetadata: JobImageMetadata[]
): JobPostingRequest {
  return {
    title: formData.title,
    employmentType: formData.employmentType,
    jobRoleId: formData.jobRoleId,
    jobDescription: formData.description,
    mainTasks: formData.responsibilities,
    requirements: formData.requirements,
    preferred: formData.preferredQualifications,
    benefits: formData.benefits,
    hiringProcess: formData.hiringProcess,
    workplace: formData.location,
    status: "DRAFT", // 기본값은 임시저장
    images: imageMetadata,
  };
}

/**
 * 채용 공고 생성 API
 */
export async function createJobPosting(data: JobFormData): Promise<JobPostingResponse> {
  // 1. 이미지 업로드 (프리사인 URL 발급 -> S3 업로드)
  const imageMetadata = await uploadJobImages(data.images);

  // 2. 채용 공고 등록 요청
  const requestData = convertFormDataToRequest(data, imageMetadata);

  return post<JobPostingResponse>(API_ENDPOINTS.COMPANY_JOB_POSTINGS.CREATE, requestData);
}

/**
 * 채용 공고 조회 API
 */
export function fetchJobPosting(jobId: string): Promise<JobDetailResponse> {
  return get<JobDetailResponse>(API_ENDPOINTS.COMPANY_JOB_POSTINGS.GET(jobId));
}

/**
 * 채용 공고 수정 API
 */
export async function updateJobPosting(
  jobId: string,
  data: JobFormData
): Promise<JobPostingResponse> {
  // 1. 이미지 업로드 (새로 추가된 이미지만)
  // TODO: 기존 이미지와 새 이미지 구분 로직 필요
  const imageMetadata = await uploadJobImages(data.images);

  // 2. 채용 공고 수정 요청
  const requestData = convertFormDataToRequest(data, imageMetadata);

  return put<JobPostingResponse>(API_ENDPOINTS.COMPANY_JOB_POSTINGS.UPDATE(jobId), requestData);
}

/**
 * 채용 공고 삭제 API
 */
export function deleteJobPosting(jobId: string): Promise<void> {
  return del<void>(API_ENDPOINTS.COMPANY_JOB_POSTINGS.UPDATE(jobId));
}

/**
 * 채용 공고 목록 조회 API
 */
export function fetchJobPostings(): Promise<Job[]> {
  return get<Job[]>(API_ENDPOINTS.COMPANY_JOB_POSTINGS.LIST);
}
