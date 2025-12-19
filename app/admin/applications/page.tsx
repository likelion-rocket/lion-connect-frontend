"use client";

import { Suspense, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { JobSelector } from "@/components/ui/job-selector";
import { AdminJobList } from "./_components/AdminJobList";
import { fetchAdminJobPostings } from "@/lib/api/jobPostings";
import { findJobGroupById, findJobRoleById } from "@/constants/jobMapping";

function ApplicationsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL 파라미터에서 값 가져오기
  const pageFromUrl = Number(searchParams.get("page")) || 1;

  const [selectedJobGroupId, setSelectedJobGroupId] = useState<string>("");
  const [selectedJobRoleId, setSelectedJobRoleId] = useState<string>("");

  // ID를 code로 변환
  const jobGroupCode = selectedJobGroupId
    ? findJobGroupById(Number(selectedJobGroupId))?.code
    : undefined;
  const jobRoleCode = selectedJobRoleId
    ? findJobRoleById(Number(selectedJobRoleId))?.role.code
    : undefined;

  // 관리자용 채용공고 목록 조회 (status는 빈 값)
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminJobPostings", jobGroupCode, jobRoleCode, pageFromUrl],
    queryFn: () =>
      fetchAdminJobPostings({
        jobGroupCode,
        jobRoleCode,
        page: pageFromUrl - 1, // API는 0-based, UI는 1-based
        size: 12,
      }),
  });

  const handleJobGroupChange = (jobGroupId: string) => {
    setSelectedJobGroupId(jobGroupId);
    setSelectedJobRoleId(""); // 직군 변경 시 직무 초기화
    router.push("/admin/applications"); // 페이지 초기화 (URL에서 page 제거)
  };

  const handleJobRoleChange = (jobRoleId: string) => {
    setSelectedJobRoleId(jobRoleId);
    router.push("/admin/applications"); // 페이지 초기화 (URL에서 page 제거)
  };

  return (
    <div className="container mx-auto pt-[80px] pb-[90px]">
      <h1 className="sr-only">지원 현황 트래킹</h1>
      <div className="w-[1043px] mx-auto">
        <JobSelector
          selectedJobGroupId={selectedJobGroupId}
          selectedJobRoleId={selectedJobRoleId}
          onJobGroupChange={handleJobGroupChange}
          onJobRoleChange={handleJobRoleChange}
        />
        <AdminJobList data={data} isLoading={isLoading} error={error} currentPage={pageFromUrl} />
      </div>
    </div>
  );
}

export default function AdminApplicationsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto pt-[80px] pb-[90px] min-h-screen" />}>
      <ApplicationsContent />
    </Suspense>
  );
}
