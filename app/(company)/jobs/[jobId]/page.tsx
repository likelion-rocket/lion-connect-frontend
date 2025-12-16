"use client";

import { use, useMemo } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/buttons/BackButton";
import { JobForm } from "@/components/job/JobForm";
import { useJobPosting, useUpdateJobPosting } from "@/hooks/company/useJobPosting";
import type { JobFormData } from "@/types/job";
import { S3_BASE_URL } from "@/constants/api";

export default function EditJobPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);
  const router = useRouter();

  // 기존 데이터 조회
  const { data: jobData, isLoading } = useJobPosting(jobId);

  // 수정 mutation
  const updateMutation = useUpdateJobPosting(jobId);

  // API 응답을 폼 데이터로 변환
  const formData = useMemo(() => {
    if (!jobData) return undefined;

    return {
      images: [], // 새로 업로드할 이미지는 빈 배열로 시작
      title: jobData.title,
      employmentType: jobData.employmentType,
      jobRoleId: jobData.jobRoleId,
      description: jobData.jobDescription,
      responsibilities: jobData.mainTasks,
      requirements: jobData.requirements,
      preferredQualifications: jobData.preferred,
      benefits: jobData.benefits,
      hiringProcess: jobData.hiringProcess,
      location: jobData.workplace,
      // 기존 이미지 URL들 (ImageUpload에서 미리보기용)
      // API 응답의 url 또는 fileUrl 사용, 없으면 S3 URL 직접 구성 (fallback)
      imageUrls: jobData.images.map(
        (img) => img.url || img.fileUrl || `${S3_BASE_URL}/${img.objectKey}`
      ),
      // 기존 이미지 메타데이터 (수정 API 요청 시 전달용)
      existingImages: jobData.images,
    };
  }, [jobData]);

  const handleSubmit = async (data: JobFormData) => {
    try {
      await updateMutation.mutateAsync(data);
      alert("채용 공고가 수정되었습니다.");
      router.push("/jobs");
    } catch (error) {
      console.error("Error updating job:", error);
      alert("채용 공고 수정에 실패했습니다.");
    }
  };

  const handleBack = () => {
    router.push("/jobs");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <BackButton onBack={handleBack} />
        <div className="mt-8 flex justify-center">
          <div className="text-neutral-600">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <BackButton onBack={handleBack} />
      <div className="mt-8 flex justify-center">
        <JobForm
          initialData={formData}
          onSubmit={handleSubmit}
          submitButtonText="채용 공고 수정하기"
        />
      </div>
    </div>
  );
}
