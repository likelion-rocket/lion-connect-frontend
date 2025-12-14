"use client";

import { useRouter } from "next/navigation";
import BackButton from "@/components/buttons/BackButton";
import { JobForm } from "@/components/job/JobForm";
import { useCreateJobPosting } from "@/hooks/company/useJobPosting";
import type { JobFormData } from "@/types/job";

export default function NewJobPage() {
  const router = useRouter();
  const createMutation = useCreateJobPosting();

  const handleSubmit = async (data: JobFormData) => {
    try {
      const newJob = await createMutation.mutateAsync(data);
      alert("채용 공고가 등록되었습니다.");
      router.push(`/jobs`);
    } catch (error) {
      console.error("Error creating job:", error);
      alert("채용 공고 등록에 실패했습니다.");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <BackButton />
      <div className="mt-8 flex justify-center">
        <JobForm onSubmit={handleSubmit} submitButtonText="채용 공고 등록하기" />
      </div>
    </div>
  );
}
