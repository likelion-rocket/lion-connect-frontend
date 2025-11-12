"use client";

import { useQueryParams } from "@/hooks/useQueryParams";
// import { useInquiries } from "@/hooks/useInquiries"; // ⚠️ 실제 API 연동 시 주석 해제
import InquirySearchBar from "./_components/InquirySearchBar";
import InquiryFilters from "./_components/InquiryFilters";
import InquiryListItem from "./_components/InquiryListItem";
import InquiryPagination from "./_components/InquiryPagination";
import type { InquiryListParams } from "@/types/inquiry";

// ⚠️ 목데이터 임포트 - 실제 API 연동 시 아래 줄 삭제
import { filterMockInquiries } from "./_mock/mockInquiries";
import { useMemo } from "react";

/**
 * 기업 문의 관리 페이지
 *
 * - 검색, 필터링, 페이지네이션 기능
 * - tanstack query를 사용한 서버 상태 관리
 * - URL 쿼리 파라미터 기반 상태 관리
 */
export default function InquiriesPage() {
  const { params } = useQueryParams();

  // URL 쿼리 파라미터를 API 파라미터로 변환
  const queryParams: InquiryListParams = {
    q: params.q,
    status: params.status as InquiryListParams["status"],
    period: params.period as InquiryListParams["period"],
    page: params.page ? parseInt(params.page) : 1,
    limit: 10, // 페이지당 10개
  };

  // ⚠️ 목데이터 사용 - 실제 API 연동 시 아래 블록 삭제하고 useInquiries 훅 사용
  const data = useMemo(
    () =>
      filterMockInquiries(
        queryParams.q,
        queryParams.status,
        queryParams.period,
        queryParams.page,
        queryParams.limit
      ),
    [queryParams.q, queryParams.status, queryParams.period, queryParams.page, queryParams.limit]
  );
  const isLoading = false;
  const error = null;
  // ⚠️ 실제 API 연동 시 위 블록을 삭제하고 아래 주석 해제
  // const { data, isLoading, error } = useInquiries(queryParams);

  return (
    <div className="w-full min-h-screen bg-bg-primary p-8">
      <div className="max-w-[1400px] mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">기업 문의 관리</h1>
          <p className="text-sm text-text-secondary">
            기업에서 문의한 내용을 확인하고 관리할 수 있습니다
          </p>
        </div>

        {/* 검색 및 필터 영역 */}
        <div className="flex items-center justify-between gap-4 mb-6 w-[1100px]">
          <InquirySearchBar />
          <InquiryFilters />
        </div>

        {/* 테이블 영역 */}
        <div className="bg-bg-primary border border-border-quaternary rounded-lg overflow-hidden w-[1100px] ">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-text-accent" />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-text-error mb-2">데이터를 불러오는데 실패했습니다</p>
                <p className="text-sm text-text-secondary">알 수 없는 오류가 발생했습니다</p>
              </div>
            </div>
          ) : !data || data.data.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-text-secondary">문의 내역이 없습니다</p>
            </div>
          ) : (
            <>
              <table className="w-full table-fixed">
                <colgroup>
                  <col className="w-[100px]" />
                  <col className="w-[140px]" />
                  <col className="w-[120px]" />
                  <col className="w-[180px]" />
                  <col className="w-[110px]" />
                  <col className="w-[350px]" />
                  <col className="w-[100px]" />
                </colgroup>
                <thead className="bg-bg-tertiary border-b border-border-quaternary">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      담당자명
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      회사명
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      전화번호
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      이메일(ID)
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      부서 / 직책
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      문의 내용
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      문의 상태
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((inquiry) => (
                    <InquiryListItem key={inquiry.id} inquiry={inquiry} />
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
        {/* 총 개수 표시 */}
        {data && (
          <div className="mt-4 text-sm text-text-secondary">총 {data.meta.total}개의 문의</div>
        )}
        {/* 페이지네이션 - 항상 표시 */}

        <InquiryPagination currentPage={data.meta.page} totalPages={data.meta.totalPages} />
      </div>
    </div>
  );
}
