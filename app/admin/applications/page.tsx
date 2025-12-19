"use client";

import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { AdminJobList } from "./_components/AdminJobList";
import { fetchAdminJobPostings } from "@/lib/api/jobPostings";

function ApplicationsContent() {
  const searchParams = useSearchParams();

  // URL 파라미터에서 값 가져오기
  const pageFromUrl = Number(searchParams.get("page")) || 1;

  // 관리자용 채용공고 목록 조회 (status는 빈 값)
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminJobPostings", pageFromUrl],
    queryFn: () =>
      fetchAdminJobPostings({
        page: pageFromUrl - 1, // API는 0-based, UI는 1-based
        size: 12,
      }),
  });

  return (
    <div className="container mx-auto pb-[90px]">
      <h1 className="sr-only">지원 현황 트래킹</h1>
      <div className="w-[1043px] mx-auto">
        <AdminJobList data={data} isLoading={isLoading} error={error} currentPage={pageFromUrl} />
      </div>
    </div>
  );
}

export default function AdminApplicationsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto pb-[90px] min-h-screen" />}>
      <ApplicationsContent />
    </Suspense>
  );
}
