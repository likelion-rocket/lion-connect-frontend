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
      jobRoleId: 0, // TODO: jobRoleId 매핑 필요
      description: jobData.jobDescription,
      responsibilities: jobData.mainTasks,
      requirements: jobData.requirements,
      preferredQualifications: jobData.preferred,
      benefits: jobData.benefits,
      hiringProcess: jobData.hiringProcess,
      location: jobData.workplace,
      // 기존 이미지 URL들 (ImageUpload에서 사용)
      imageUrls: jobData.images.map((img) => `${S3_BASE_URL}/${img.objectKey}`),
    };
  }, [jobData]);

  const handleSubmit = async (data: JobFormData) => {
    try {
      await updateMutation.mutateAsync(data);
      alert("채용 공고가 수정되었습니다.");
      router.push(`/jobs/${jobId}`);
    } catch (error) {
      console.error("Error updating job:", error);
      alert("채용 공고 수정에 실패했습니다.");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <BackButton />
        <div className="mt-8 flex justify-center">
          <div className="text-neutral-600">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <BackButton />
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
