"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import Pager from "@/components/Pager";
import ApplicantTable from "./_components/ApplicantTable";
import BackButton from "../../../../../components/buttons/BackButton";
import { fetchJobApplicants } from "@/lib/api/jobPostings";

export default function ApplicantsPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const jobId = params.jobId as string;
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 10; // 페이지당 아이템 수

  const { data, isLoading, error } = useQuery({
    queryKey: ["jobApplicants", jobId, currentPage],
    queryFn: () =>
      fetchJobApplicants(jobId, {
        page: currentPage - 1, // API는 0-based index
        size: pageSize,
        sort: ["appliedAt,desc"], // 최신 지원자부터
      }),
    enabled: !!jobId,
  });

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-white pb-[168px]">
        <div className="max-w-[1160px] mx-auto px-4 py-8 flex flex-col gap-12">
          <BackButton />
          <h1 className="text-2xl font-bold text-neutral-800">지원자 현황</h1>
          <div className="w-full py-16 text-center">
            <p className="text-neutral-500 text-base font-normal">로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-white pb-[168px]">
        <div className="max-w-[1160px] mx-auto px-4 py-8 flex flex-col gap-12">
          <BackButton />
          <h1 className="text-2xl font-bold text-neutral-800">지원자 현황</h1>
          <div className="w-full py-16 text-center">
            <p className="text-red-500 text-base font-normal">데이터를 불러오는데 실패했습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  const applicants = data?.content || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="w-full min-h-screen bg-white pb-[168px]">
      <div className="max-w-[1160px] mx-auto px-4 py-8 flex flex-col gap-12">
        <BackButton />
        <h1 className="text-2xl font-bold text-neutral-800">지원자 현황</h1>
        <ApplicantTable applicants={applicants} />
        {totalPages > 1 && <Pager currentPage={currentPage} totalPages={totalPages} pageSize={pageSize} />}
      </div>
    </div>
  );
}
