"use client";

import { useQueryParams } from "@/hooks/useQueryParams";
// import { useInquiries } from "@/hooks/useInquiries"; // ⚠️ 실제 API 연동 시 주석 해제
import InquirySearchBar from "./InquirySearchBar";
import InquiryFilters from "./InquiryFilters";
import InquiryListItem from "./InquiryListItem";
import InquiryPagination from "./InquiryPagination";
import type { InquiryListParams } from "@/types/inquiry";

// ⚠️ 목데이터 임포트 - 실제 API 연동 시 아래 줄 삭제
import { filterMockInquiries } from "../_mock/mockInquiries";
import { useMemo } from "react";

/**
 * 문의 관리 페이지 컨텐츠
 * useSearchParams를 사용하므로 Suspense boundary 내부에서 렌더링되어야 함
 */
export default function InquiriesPageContent() {
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
    <div className="w-full min-h-screen bg-bg-primary mt-5">
      <div className="max-w-[1440px] mx-auto px-8">
        {/* 검색 및 필터 영역 */}
        <div className="w-[1043px] bg-bg-primary border-b border-border-quaternary py-6 pr-6 flex flex-col gap-4">
          <InquirySearchBar />
          <InquiryFilters />
        </div>

        {/* 테이블 영역 */}
        <div className="w-[1043px] bg-bg-primary px-6 py-8 rounded-lg shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-2px_rgba(0,0,0,0.05)] flex flex-col gap-3">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-text-accent" />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64 text-center">
              <div>
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
              {/* 헤더 행 */}
              <div className="w-full border-b-2 border-bg-quaternary px-4 py-2 flex gap-4">
                <p className="w-20 h-[21px] text-sm font-medium leading-[1.5] text-text-secondary">
                  담당자명
                </p>
                <p className="w-20 h-[21px] text-sm font-medium leading-[1.5] text-text-secondary">
                  회사명
                </p>
                <p className="w-24 h-[21px] text-sm font-medium leading-[1.5] text-text-secondary">
                  전화번호
                </p>
                <p className="w-24 h-[21px] text-sm font-medium leading-[1.5] text-text-secondary">
                  이메일
                </p>
                <p className="w-36 h-[21px] text-sm font-medium leading-[1.5] text-text-secondary">
                  부서 / 직책
                </p>
                <p className="w-[266px] h-[21px] text-sm font-medium leading-[1.5] text-text-secondary">
                  문의 사항
                </p>
                <p className="w-24 h-[21px] text-sm font-medium leading-[1.5] text-center text-text-secondary">
                  상태
                </p>
              </div>

              {/* 데이터 행들 */}
              {data.data.map((inquiry) => (
                <InquiryListItem key={inquiry.id} inquiry={inquiry} />
              ))}
            </>
          )}
        </div>

        {/* 페이지네이션 */}
        {data && (
          <div className="w-[1043px] mt-8 mb-16">
            <InquiryPagination currentPage={data.meta.page} totalPages={data.meta.totalPages} />
          </div>
        )}
      </div>
    </div>
  );
}
