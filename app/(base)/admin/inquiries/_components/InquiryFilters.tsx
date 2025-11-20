"use client";

import { useQueryParams } from "@/hooks/common/useQueryParams";
import type { InquiryStatus } from "@/types/inquiry";
import FilterSelect from "../../../../../components/FilterSelect";
import { useState } from "react";

/**
 * 상태 필터 옵션
 */
const STATUS_OPTIONS: { value: InquiryStatus | "all"; label: string }[] = [
  { value: "all", label: "전체 상태" },
  { value: "NEW", label: "New" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "DONE", label: "Done" },
];

/**
 * 기업 문의 필터 컴포넌트
 *
 * - 상태 필터 (NEW, IN_PROGRESS, DONE)
 * - 담당자 이름 검색
 * - 수신 날짜 범위 (receivedFrom ~ receivedTo)
 * - URL 쿼리 파라미터와 자동 동기화
 */
export default function InquiryFilters() {
  const { params, setParams } = useQueryParams();
  const [profileName, setProfileName] = useState(params.profileName || "");
  const [receivedFrom, setReceivedFrom] = useState(params.receivedFrom || "");
  const [receivedTo, setReceivedTo] = useState(params.receivedTo || "");

  const handleStatusChange = (value: string) => {
    // 페이지를 0으로 리셋하면서 상태 업데이트
    setParams({
      status: value === "all" ? undefined : value,
      page: "0",
    });
  };

  const handleProfileNameSearch = () => {
    setParams({
      profileName: profileName || undefined,
      page: "0",
    });
  };

  const handleDateRangeApply = () => {
    setParams({
      receivedFrom: receivedFrom || undefined,
      receivedTo: receivedTo || undefined,
      page: "0",
    });
  };

  const handleResetFilters = () => {
    setProfileName("");
    setReceivedFrom("");
    setReceivedTo("");
    setParams({
      status: undefined,
      profileName: undefined,
      receivedFrom: undefined,
      receivedTo: undefined,
      page: "0",
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        {/* 상태 필터 */}
        <FilterSelect
          value={params.status || "all"}
          onValueChange={handleStatusChange}
          options={STATUS_OPTIONS}
          placeholder="전체 상태"
          width="w-[160px]"
        />

        {/* 담당자 이름 검색 */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="담당자 이름 검색"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleProfileNameSearch()}
            className="w-[200px] px-3 py-2 text-sm border border-border-tertiary rounded-lg focus:outline-none focus:ring-2 focus:ring-text-accent"
          />
          <button
            onClick={handleProfileNameSearch}
            className="px-4 py-2 text-sm font-medium text-white bg-text-accent rounded-lg hover:bg-text-accent/90 transition-colors"
          >
            검색
          </button>
        </div>

        {/* 초기화 버튼 */}
        <button
          onClick={handleResetFilters}
          className="px-4 py-2 text-sm font-medium text-text-secondary border border-border-tertiary rounded-lg hover:bg-bg-secondary transition-colors"
        >
          초기화
        </button>
      </div>

      {/* 날짜 범위 필터 */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-text-secondary">수신 날짜:</span>
        <input
          type="date"
          value={receivedFrom}
          onChange={(e) => setReceivedFrom(e.target.value)}
          className="px-3 py-2 text-sm border border-border-tertiary rounded-lg focus:outline-none focus:ring-2 focus:ring-text-accent"
        />
        <span className="text-sm text-text-secondary">~</span>
        <input
          type="date"
          value={receivedTo}
          onChange={(e) => setReceivedTo(e.target.value)}
          className="px-3 py-2 text-sm border border-border-tertiary rounded-lg focus:outline-none focus:ring-2 focus:ring-text-accent"
        />
        <button
          onClick={handleDateRangeApply}
          className="px-4 py-2 text-sm font-medium text-white bg-text-accent rounded-lg hover:bg-text-accent/90 transition-colors"
        >
          적용
        </button>
      </div>
    </div>
  );
}
