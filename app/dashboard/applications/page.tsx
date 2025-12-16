"use client";

import { Suspense } from "react";
import ApplicationsTable from "./_components/ApplicationsTable";
import BackButton from "@/components/buttons/BackButton";
import Pager from "@/components/Pager";
import { useJobApplications } from "@/hooks/useJobApplications";
import { useSearchParams } from "next/navigation";

function ApplicationsContent() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("size") || "10", 10);

  const { data } = useJobApplications({ page: currentPage - 1, size: pageSize });

  return (
    <div className="w-full min-h-screen bg-white pb-[168px]">
      <div className="max-w-[1160px] mx-auto px-4 py-8 flex flex-col gap-12">
        <BackButton />
        <h1 className="text-2xl font-bold text-neutral-800">지원 현황</h1>
        <ApplicationsTable page={currentPage - 1} size={pageSize} />
        <Pager
          currentPage={currentPage}
          totalPages={data?.totalPages || 1}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
}

export default function ApplicationsPage() {
  return (
    <Suspense fallback={<div className="w-full min-h-screen bg-white" />}>
      <ApplicationsContent />
    </Suspense>
  );
}
