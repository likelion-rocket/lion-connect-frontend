"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { JobListHeader } from "./_components/JobListHeader";
import { JobCardWithDelete } from "./_components/JobCardWithDelete";
import { useJobPostings } from "@/hooks/company/useJobPosting";
import Pager from "@/components/Pager";

export default function JobsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL 쿼리스트링에서 페이지 정보 가져오기 (1-based)
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("size")) || 10;

  // API로부터 채용공고 데이터 가져오기 (API는 0-based)
  const { data, isLoading, isError, error } = useJobPostings({
    page: currentPage - 1, // 0-based로 변환
    size: pageSize,
    sort: ["createdAt,desc"],
  });

  if (isLoading) {
    return (
      <div className="container w-[1158px] mx-auto mb-[191px]">
        <JobListHeader />
        <div className="w-full flex justify-center items-center py-20">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container w-[1158px] mx-auto mb-[191px]">
        <JobListHeader />
        <div className="w-full flex justify-center items-center py-20">
          <p className="text-red-500">
            채용공고를 불러오는 중 오류가 발생했습니다: {error?.message}
          </p>
        </div>
      </div>
    );
  }

  const jobs = data?.content || [];

  return (
    <div className="container flex flex-col gap-16 w-[1158px] mx-auto p-[72px]">
      <JobListHeader />

      <div className="w-full inline-flex flex-col justify-start items-start gap-16">
        {jobs.length === 0 ? (
          <div className="w-full flex justify-center items-center py-20">
            <p className="text-gray-500">등록된 채용공고가 없습니다.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <JobCardWithDelete
              key={job.jobPostingId}
              jobPostingId={job.jobPostingId}
              title={job.title}
              category={`${job.jobGroupName} · ${job.jobRoleName}`}
              isPublished={job.status === "PUBLISHED"}
              currentItemCount={jobs.length}
              onPublishToggle={() => console.log("Toggle publish", job.jobPostingId)}
              onEdit={() => router.push(`/jobs/${job.jobPostingId}`)}
              onViewApplicants={() => console.log("View applicants", job.jobPostingId)}
            />
          ))
        )}
      </div>
      <Pager
        currentPage={(data?.number ?? 0) + 1} // 0-based를 1-based로 변환
        totalPages={data?.totalPages ?? 0}
        pageSize={data?.size ?? 10}
      />
    </div>
  );
}
