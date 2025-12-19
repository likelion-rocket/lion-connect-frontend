"use client";

import { JobCard } from "@/app/dashboard/job-board/_components/JobCard";
import { JobCardSkeleton } from "@/app/dashboard/job-board/_components/JobCardSkeleton";
import Pager from "@/components/Pager";
import { cn } from "@/utils/utils";
import type { PublicJobPostingsResponse } from "@/types/company-job-posting";

interface AdminJobListProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: PublicJobPostingsResponse;
  isLoading?: boolean;
  error?: Error | null;
  currentPage: number;
}

const ITEMS_PER_PAGE = 12;

export function AdminJobList({
  data,
  isLoading,
  error,
  currentPage,
  className,
  ...props
}: AdminJobListProps) {
  const jobs = data?.content || [];
  const totalPages = data?.totalPages || 0;

  // 로딩 중이거나 데이터가 아직 없는 경우 스켈레톤 표시
  if (isLoading || !data) {
    return (
      <div className={cn("flex flex-col gap-[233px] pt-[52px]", className)} {...props}>
        <div className="w-[1043px] grid grid-cols-3 gap-5">
          {Array.from({ length: 12 }).map((_, index) => (
            <JobCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className={cn("flex flex-col gap-[233px] pt-[52px]", className)} {...props}>
        <div className="w-[1043px] inline-flex justify-center items-center h-[400px]">
          <p className="text-text-secondary">채용공고를 불러오는 중 오류가 발생했습니다.</p>
        </div>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (jobs.length === 0) {
    return (
      <div className={cn("flex flex-col gap-[233px] pt-[52px]", className)} {...props}>
        <div className="w-[1043px] inline-flex justify-center items-center h-[400px]">
          <p className="text-text-secondary">등록된 채용공고가 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-[233px] pt-[52px]", className)} {...props}>
      <div className="w-[1043px] grid grid-cols-3 gap-5">
        {jobs.map((job) => (
          <JobCard
            key={job.jobPostingId}
            jobPostingId={job.jobPostingId}
            title={job.title}
            company={job.companyName}
            location={job.workplaceShort}
            jobRoleName={job.jobRoleName}
            imageUrl={job.thumbnailImageUrl || undefined}
          />
        ))}
      </div>
      <Pager currentPage={currentPage} totalPages={totalPages} pageSize={ITEMS_PER_PAGE} />
    </div>
  );
}
