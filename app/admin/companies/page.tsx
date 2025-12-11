"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Pager from "@/components/Pager";
import CompanyTable from "../_components/CompanyTable";
import { fetchAdminCompanies } from "@/lib/api/adminUsers";

function AdminCompaniesContent() {
  const searchParams = useSearchParams();

  // URL에서 page와 size 파라미터 읽기 (기본값: page=1, size=20)
  const page = searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : 1;
  const size = searchParams.get("size") ? parseInt(searchParams.get("size")!, 10) : 20;

  // API는 0-based 인덱싱을 사용하므로 page - 1
  const apiPage = Math.max(0, page - 1);

  // TanStack Query를 사용한 데이터 패칭
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["adminCompanies", apiPage, size],
    queryFn: () => fetchAdminCompanies({ page: apiPage, size }),
  });

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-neutral-500">로딩 중...</div>
      </div>
    );
  }

  // 에러 상태
  if (isError) {
    console.error("Failed to fetch admin companies:", error);
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500">
          기업 회원 목록을 불러오는데 실패했습니다.
        </div>
      </div>
    );
  }

  return (
    <>
      <CompanyTable companies={data?.content || []} />
      <div className="pt-16 pb-8">
        <Pager
          currentPage={page}
          totalPages={data?.totalPages || 1}
          pageSize={size}
        />
      </div>
    </>
  );
}

export default function AdminCompaniesPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-neutral-500">로딩 중...</div>
      </div>
    }>
      <AdminCompaniesContent />
    </Suspense>
  );
}