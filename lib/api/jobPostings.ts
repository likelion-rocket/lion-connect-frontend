// lib/api/jobPostings.ts
import { post, get, put, del } from "@/lib/apiClient";
import { serverGet } from "@/lib/serverApiClient";
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
import type {
  PublicJobPostingsResponse,
  PublicJobPostingsParams,
} from "@/types/company-job-posting";
import type {
  CompanyApplicantsResponse,
  JobApplicationsRequest,
} from "@/types/jobApplication";

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
  // 백엔드로 전송할 때는 url, fileUrl 필드 제거
  const cleanImageMetadata = imageMetadata.map(({ url, fileUrl, ...metadata }) => metadata);

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
    images: cleanImageMetadata,
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
 * 채용 공고 조회 API (기업용 - 인증 필요)
 */
export function fetchJobPosting(jobId: string): Promise<JobDetailResponse> {
  return get<JobDetailResponse>(API_ENDPOINTS.COMPANY_JOB_POSTINGS.GET(jobId));
}

/**
 * 공개 채용 공고 상세 조회 API (인재용 - 인증 불필요)
 * Server-side에서 호출 시 serverGet 사용
 */
export function fetchPublicJobPosting(jobId: string): Promise<JobDetailResponse> {
  // Server-side인지 확인
  if (typeof window === "undefined") {
    return serverGet<JobDetailResponse>(API_ENDPOINTS.JOB_POSTINGS.GET(jobId));
  }
  return get<JobDetailResponse>(API_ENDPOINTS.JOB_POSTINGS.GET(jobId));
}

/**
 * 채용 공고 수정 API
 */
export async function updateJobPosting(
  jobId: string,
  data: JobFormData
): Promise<JobPostingResponse> {
  // 1. 새로 업로드된 이미지만 S3에 업로드
  const newImageMetadata = await uploadJobImages(data.images);

  // 2. 기존 이미지 + 새 이미지 결합
  const existingImages = data.existingImages || [];

  // 3. sortOrder 재정렬 (중복 방지 - DB 무결성 제약 조건 위반 해결)
  const allImageMetadata = [
    ...existingImages.map((img, index) => ({
      ...img,
      sortOrder: index + 1,
    })),
    ...newImageMetadata.map((img, index) => ({
      ...img,
      sortOrder: existingImages.length + index + 1,
    })),
  ];

  // 4. 채용 공고 수정 요청
  const requestData = convertFormDataToRequest(data, allImageMetadata);

  return put<JobPostingResponse>(API_ENDPOINTS.COMPANY_JOB_POSTINGS.UPDATE(jobId), requestData);
}

/**
 * 채용 공고 삭제 API
 */
export function deleteJobPosting(jobId: string): Promise<void> {
  return del<void>(API_ENDPOINTS.COMPANY_JOB_POSTINGS.DELETE(jobId));
}

/**
 * 채용 공고 목록 조회 API (기업용)
 */
export function fetchJobPostings(): Promise<Job[]> {
  return get<Job[]>(API_ENDPOINTS.COMPANY_JOB_POSTINGS.LIST);
}

/**
 * 공개 채용 공고 목록 조회 API (인재용)
 */
export function fetchPublicJobPostings(
  params: PublicJobPostingsParams
): Promise<PublicJobPostingsResponse> {
  const queryParams = new URLSearchParams();

  if (params.jobGroupCode) {
    queryParams.append("jobGroupCode", params.jobGroupCode);
  }
  if (params.jobRoleCode) {
    queryParams.append("jobRoleCode", params.jobRoleCode);
  }
  if (params.page !== undefined) {
    queryParams.append("page", params.page.toString());
  }
  if (params.size !== undefined) {
    queryParams.append("size", params.size.toString());
  }
  if (params.sort && params.sort.length > 0) {
    params.sort.forEach((s) => queryParams.append("sort", s));
  }

  const endpoint = `${API_ENDPOINTS.JOB_POSTINGS.LIST}?${queryParams.toString()}`;
  return get<PublicJobPostingsResponse>(endpoint);
}

/**
 * 채용 공고 지원자 목록 조회 API (기업용)
 */
export function fetchJobApplicants(
  jobId: string,
  params: JobApplicationsRequest
): Promise<CompanyApplicantsResponse> {
  const queryParams = new URLSearchParams();

  queryParams.append("page", params.page.toString());
  queryParams.append("size", params.size.toString());

  if (params.sort && params.sort.length > 0) {
    params.sort.forEach((s) => queryParams.append("sort", s));
  }

  const endpoint = `${API_ENDPOINTS.COMPANY_JOB_POSTINGS.APPLICATIONS(jobId)}?${queryParams.toString()}`;
  return get<CompanyApplicantsResponse>(endpoint);
}

/**
 * 관리자용 채용공고 목록 조회 API (status는 빈 값으로 전송)
 */
export function fetchAdminJobPostings(
  params: PublicJobPostingsParams
): Promise<PublicJobPostingsResponse> {
  const queryParams = new URLSearchParams();

  // status는 빈 값으로 설정
  queryParams.append("status", "");

  if (params.jobGroupCode) {
    queryParams.append("jobGroupCode", params.jobGroupCode);
  }
  if (params.jobRoleCode) {
    queryParams.append("jobRoleCode", params.jobRoleCode);
  }
  if (params.page !== undefined) {
    queryParams.append("page", params.page.toString());
  }
  if (params.size !== undefined) {
    queryParams.append("size", params.size.toString());
  }
  if (params.sort && params.sort.length > 0) {
    params.sort.forEach((s) => queryParams.append("sort", s));
  }

  const endpoint = `${API_ENDPOINTS.ADMIN.JOB_POSTINGS.LIST}?${queryParams.toString()}`;
  return get<PublicJobPostingsResponse>(endpoint);
}

/**
 * 관리자용 채용공고 지원자 목록 조회 API
 */
export function fetchAdminJobApplicants(
  jobId: string,
  params: JobApplicationsRequest
): Promise<CompanyApplicantsResponse> {
  const queryParams = new URLSearchParams();

  queryParams.append("page", params.page.toString());
  queryParams.append("size", params.size.toString());

  if (params.sort && params.sort.length > 0) {
    params.sort.forEach((s) => queryParams.append("sort", s));
  }

  const endpoint = `${API_ENDPOINTS.ADMIN.JOB_POSTINGS.APPLICATIONS(jobId)}?${queryParams.toString()}`;
  return get<CompanyApplicantsResponse>(endpoint);
}
