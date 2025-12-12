"use client";

import { useDeleteJobPosting } from "@/hooks/company/useJobPosting";
import { useConfirm } from "@/contexts/ConfirmContext";
import { JobCard } from "./JobCard";

interface JobCardWithDeleteProps {
  jobPostingId: number;
  title: string;
  category: string;
  isPublished: boolean;
  onPublishToggle?: () => void;
  onEdit?: () => void;
  onViewApplicants?: () => void;
}

export function JobCardWithDelete({
  jobPostingId,
  title,
  category,
  isPublished,
  onPublishToggle,
  onEdit,
  onViewApplicants,
}: JobCardWithDeleteProps) {
  const confirm = useConfirm();
  const deleteMutation = useDeleteJobPosting(jobPostingId.toString());

  const handleDelete = async () => {
    const ok = await confirm({
      title: "해당 채용 공고를 삭제하시겠습니까?",
      description: "삭제를 누르면 해당 공고가 삭제됩니다.",
      confirmLabel: "삭제",
      cancelLabel: "취소",
    });

    if (ok) {
      deleteMutation.mutate();
    }
  };

  return (
    <JobCard
      jobPostingId={jobPostingId}
      title={title}
      category={category}
      isPublished={isPublished}
      onPublishToggle={onPublishToggle}
      onEdit={onEdit}
      onDelete={handleDelete}
      onViewApplicants={onViewApplicants}
    />
  );
}
