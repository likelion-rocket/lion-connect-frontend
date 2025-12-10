"use client";

import { useState } from "react";
import { JobCard } from "./JobCard";
import Pager from "@/components/Pager";
import { cn } from "@/utils/utils";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  imageUrl?: string;
}

interface JobListProps extends React.HTMLAttributes<HTMLDivElement> {
  jobs?: Job[];
}

const ITEMS_PER_PAGE = 12;

const MOCK_JOBS: Job[] = [
  { id: 1, title: "게임 PM", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 2, title: "DevOps 엔지니어", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 3, title: "FA 매니저", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 4, title: "콘텐츠 마케터", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 5, title: "게임 PM", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 6, title: "게임 PM", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 7, title: "게임 PM", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 8, title: "게임 PM", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 9, title: "게임 PM", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 10, title: "게임 PM", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 11, title: "게임 PM", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 12, title: "게임 PM", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 13, title: "DevOps 엔지니어", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 14, title: "FA 매니저", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 15, title: "콘텐츠 마케터", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 16, title: "게임 PM", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 17, title: "DevOps 엔지니어", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 18, title: "FA 매니저", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 19, title: "콘텐츠 마케터", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 20, title: "게임 PM", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 21, title: "DevOps 엔지니어", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 22, title: "FA 매니저", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 23, title: "콘텐츠 마케터", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 24, title: "게임 PM", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 25, title: "DevOps 엔지니어", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
  { id: 26, title: "FA 매니저", company: "멋쟁이 사자처럼", location: "서울시 종로구" },
];

export function JobList({ jobs = MOCK_JOBS, className, ...props }: JobListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentJobs = jobs.slice(startIndex, endIndex);

  return (
    <div className={cn("flex flex-col gap-[233px] pt-[52px]", className)} {...props}>
      <div className="w-[1160px] inline-flex justify-start items-start gap-5 flex-wrap content-start">
        {currentJobs.map((job) => (
          <JobCard
            key={job.id}
            title={job.title}
            company={job.company}
            location={job.location}
            imageUrl={job.imageUrl}
          />
        ))}
      </div>
      <Pager currentPage={currentPage} totalPages={totalPages} pageSize={ITEMS_PER_PAGE} />
    </div>
  );
}
