"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/buttons/BackButton";
import { JobForm } from "@/components/job/JobForm";
import { useJobPosting, useCreateJobPosting, useUpdateJobPosting } from "@/hooks/company/useJobPosting";
import type { JobFormData } from "@/types/job";

export default function JobEditPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);
  const router = useRouter();
  const isNew = jobId === "new";

  // 기존 데이터 조회 (수정 모드일 때만)
  const { data: jobData, isLoading } = useJobPosting(jobId);

  // 생성/수정 mutation
  const createMutation = useCreateJobPosting();
  const updateMutation = useUpdateJobPosting(jobId);

  const handleSubmit = async (data: JobFormData) => {
    try {
      if (isNew) {
        const newJob = await createMutation.mutateAsync(data);
        alert("채용 공고가 등록되었습니다.");
        router.push(`/jobs/${newJob.id}`);
      } else {
        await updateMutation.mutateAsync(data);
        alert("채용 공고가 수정되었습니다.");
        router.push(`/jobs/${jobId}`);
      }
    } catch (error) {
      console.error("Error submitting job:", error);
      alert(isNew ? "채용 공고 등록에 실패했습니다." : "채용 공고 수정에 실패했습니다.");
    }
  };

  if (!isNew && isLoading) {
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
          submitButtonText={isNew ? "채용 공고 등록하기" : "채용 공고 수정하기"}
        />
      </div>
    </div>
  );
}
