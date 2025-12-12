"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/buttons/BackButton";
import { JobForm } from "@/components/job/JobForm";
import { useJobPosting, useUpdateJobPosting } from "@/hooks/company/useJobPosting";
import type { JobFormData } from "@/types/job";

export default function EditJobPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);
  const router = useRouter();

  // 기존 데이터 조회
  const { data: jobData, isLoading } = useJobPosting(jobId);

  // 수정 mutation
  const updateMutation = useUpdateJobPosting(jobId);

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
          initialData={jobData}
          onSubmit={handleSubmit}
          submitButtonText="채용 공고 수정하기"
        />
      </div>
    </div>
  );
}
