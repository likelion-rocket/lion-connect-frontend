"use client";

import { JobListHeader } from "./_components/JobListHeader";
import { JobCard } from "./_components/JobCard";

export default function JobsPage() {
  // Mock data - 실제로는 API에서 가져올 데이터
  const mockJobs = [
    {
      id: 1,
      title: "채용 공고 제목",
      category: "개발 · 프론트엔드",
      isPublished: true,
    },
    {
      id: 2,
      title: "게임 PM",
      category: "개발 · 프론트엔드",
      isPublished: true,
    },
    {
      id: 3,
      title: "게임 PM",
      category: "개발 · 프론트엔드",
      isPublished: false,
    },
  ];

  return (
    <div className="container w-[1158px] mx-auto mb-[191px]">
      <JobListHeader />

      <div className="w-full inline-flex flex-col justify-start items-start gap-16">
        {mockJobs.map((job) => (
          <JobCard
            key={job.id}
            title={job.title}
            category={job.category}
            isPublished={job.isPublished}
            onPublishToggle={() => console.log("Toggle publish", job.id)}
            onEdit={() => console.log("Edit", job.id)}
            onDelete={() => console.log("Delete", job.id)}
            onViewApplicants={() => console.log("View applicants", job.id)}
          />
        ))}
      </div>
    </div>
  );
}
