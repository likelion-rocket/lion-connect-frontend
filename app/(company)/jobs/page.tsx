"use client";

import { JobListHeader } from "./_components/JobListHeader";
import { JobCard } from "./_components/JobCard";
import { useJobPostings } from "@/hooks/company/useJobPosting";

export default function JobsPage() {
  // API로부터 채용공고 데이터 가져오기
  const { data, isLoading, isError, error } = useJobPostings({
    page: 0,
    size: 10,
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
    <div className="container w-[1158px] mx-auto mb-[191px]">
      <JobListHeader />

      <div className="w-full inline-flex flex-col justify-start items-start gap-16">
        {jobs.length === 0 ? (
          <div className="w-full flex justify-center items-center py-20">
            <p className="text-gray-500">등록된 채용공고가 없습니다.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <JobCard
              key={job.jobPostingId}
              title={job.title}
              category={`${job.jobGroupName} · ${job.jobRoleName}`}
              isPublished={job.status === "PUBLISHED"}
              onPublishToggle={() => console.log("Toggle publish", job.jobPostingId)}
              onEdit={() => console.log("Edit", job.jobPostingId)}
              onDelete={() => console.log("Delete", job.jobPostingId)}
              onViewApplicants={() =>
                console.log("View applicants", job.jobPostingId)
              }
            />
          ))
        )}
      </div>
    </div>
  );
}
