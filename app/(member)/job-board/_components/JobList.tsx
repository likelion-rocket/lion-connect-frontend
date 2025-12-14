"use client";

import { JobCard } from "./JobCard";
import Pager from "@/components/Pager";
import { cn } from "@/utils/utils";
import type { PublicJobPostingsResponse } from "@/types/company-job-posting";

interface JobListProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: PublicJobPostingsResponse;
  isLoading?: boolean;
  error?: Error | null;
  currentPage: number;
}

const ITEMS_PER_PAGE = 12;

export function JobList({
  data,
  isLoading,
  error,
  currentPage,
  className,
  ...props
}: JobListProps) {
  const jobs = data?.content || [];
  const totalPages = data?.totalPages || 0;

  // 로딩 상태
  if (isLoading) {
    return (
      <div className={cn("flex flex-col gap-[233px] pt-[52px]", className)} {...props}>
        <div className="w-[1160px] inline-flex justify-center items-center h-[400px]">
          <p className="text-text-secondary">채용공고를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className={cn("flex flex-col gap-[233px] pt-[52px]", className)} {...props}>
        <div className="w-[1160px] inline-flex justify-center items-center h-[400px]">
          <p className="text-text-secondary">채용공고를 불러오는 중 오류가 발생했습니다.</p>
        </div>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (jobs.length === 0) {
    return (
      <div className={cn("flex flex-col gap-[233px] pt-[52px]", className)} {...props}>
        <div className="w-[1160px] inline-flex justify-center items-center h-[400px]">
          <p className="text-text-secondary">등록된 채용공고가 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-[233px] pt-[52px]", className)} {...props}>
      <div className="w-[1160px] inline-flex justify-start items-start gap-5 flex-wrap content-start">
        {jobs.map((job) => (
          <JobCard
            key={job.jobPostingId}
            title={job.title}
            company={job.companyName}
            location={job.workplaceShort}
            imageUrl={job.thumbnailImageUrl || undefined}
          />
        ))}
      </div>
      <Pager currentPage={currentPage} totalPages={totalPages} pageSize={ITEMS_PER_PAGE} />
    </div>
  );
}
