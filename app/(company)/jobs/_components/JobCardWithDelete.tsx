"use client";

import { useDeleteJobPosting, usePublishJobPosting, useUnpublishJobPosting } from "@/hooks/company/useJobPosting";
import { useConfirm } from "@/contexts/ConfirmContext";
import { JobCard } from "./JobCard";
import { useRouter, useSearchParams } from "next/navigation";

interface JobCardWithDeleteProps {
  jobPostingId: number;
  title: string;
  category: string;
  isPublished: boolean;
  currentItemCount: number; // 현재 페이지의 항목 개수
  onPublishToggle?: () => void;
  onEdit?: () => void;
  onViewApplicants?: () => void;
}

export function JobCardWithDelete({
  jobPostingId,
  title,
  category,
  isPublished,
  currentItemCount,
  onEdit,
  onViewApplicants,
}: JobCardWithDeleteProps) {
  const confirm = useConfirm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const deleteMutation = useDeleteJobPosting(jobPostingId.toString());
  const publishMutation = usePublishJobPosting(jobPostingId);
  const unpublishMutation = useUnpublishJobPosting(jobPostingId);

  const handleDelete = async () => {
    const ok = await confirm({
      title: "해당 채용 공고를 삭제하시겠습니까?",
      description: "삭제를 누르면 해당 공고가 삭제됩니다.",
      confirmLabel: "삭제",
      cancelLabel: "취소",
    });

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          // 현재 페이지에 이 항목만 남아있었다면 (삭제 후 0개가 됨)
          // 그리고 현재 페이지가 1보다 크다면 → 이전 페이지로 이동
          const currentPage = Number(searchParams.get("page")) || 1;
          if (currentItemCount === 1 && currentPage > 1) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", String(currentPage - 1));
            router.push(`?${params.toString()}`);
          }
        },
      });
    }
  };

  const handlePublishToggle = async () => {
    if (isPublished) {
      // 게시 취소
      const ok = await confirm({
        title: "채용 공고를 내리시겠습니까?",
        description: "확인을 누르면 해당 채용 공고가 내려갑니다.",
        confirmLabel: "확인",
        cancelLabel: "취소",
      });

      if (ok) {
        unpublishMutation.mutate();
      }
    } else {
      // 게시
      const ok = await confirm({
        title: "채용 공고를 게시하시겠습니까?",
        description: "확인을 누르면 채용 공고가 게시됩니다.",
        confirmLabel: "확인",
        cancelLabel: "취소",
      });

      if (ok) {
        publishMutation.mutate();
      }
    }
  };

  return (
    <JobCard
      jobPostingId={jobPostingId}
      title={title}
      category={category}
      isPublished={isPublished}
      onPublishToggle={handlePublishToggle}
      onEdit={onEdit}
      onDelete={handleDelete}
      onViewApplicants={onViewApplicants}
    />
  );
}
