"use client";

import { useQueryParams } from "@/hooks/useQueryParams";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import type { InquiryStatus, InquiryPeriod } from "@/types/inquiry";

/**
 * 상태 필터 옵션
 */
const STATUS_OPTIONS: { value: InquiryStatus | "all"; label: string }[] = [
  { value: "all", label: "New/Done" },
  { value: "new", label: "New" },
  { value: "done", label: "Done" },
];

/**
 * 기간 필터 옵션
 */
const PERIOD_OPTIONS: { value: InquiryPeriod | "all"; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "12h", label: "12시간 이내" },
  { value: "24h", label: "24시간 이내" },
  { value: "2d", label: "이틀 이내" },
  { value: "3d", label: "3일 이내" },
  { value: "1w", label: "1주일 이내" },
  { value: "1m", label: "한달 이내" },
  { value: "over", label: "한달 이상" },
];

/**
 * 기업 문의 필터 컴포넌트
 *
 * - 상태 필터 (New, Done)
 * - 기간 필터 (12시간 이내 ~ 한달 이상)
 * - URL 쿼리 파라미터와 자동 동기화
 */
export default function InquiryFilters() {
  const { params, setParams } = useQueryParams();

  const handleStatusChange = (value: string) => {
    console.log("Status changed to:", value);
    // 페이지를 1로 리셋하면서 상태 업데이트 (한 번에 처리)
    setParams({
      status: value === "all" ? undefined : value,
      page: "1",
    });
  };

  const handlePeriodChange = (value: string) => {
    console.log("Period changed to:", value);
    // 페이지를 1로 리셋하면서 기간 업데이트 (한 번에 처리)
    setParams({
      period: value === "all" ? undefined : value,
      page: "1",
    });
  };

  // 현재 선택된 값 표시 로직
  const getStatusDisplay = () => {
    if (!params.status) return "New / Done";
    const option = STATUS_OPTIONS.find((opt) => opt.value === params.status);
    console.log("Status display:", params.status, "->", option?.label);
    return option?.label || "New / Done";
  };

  const getPeriodDisplay = () => {
    if (!params.period) return "기간별 검색";
    const option = PERIOD_OPTIONS.find((opt) => opt.value === params.period);
    console.log("Period display:", params.period, "->", option?.label);
    return option?.label || "기간별 검색";
  };

  console.log("Current params:", params);

  return (
    <div className="flex items-center gap-3">
      {/* 상태 필터 */}
      <Select value={params.status || "all"} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[140px] h-10 bg-bg-primary border-border-quaternary text-text-primary">
          <span className="text-sm">{getStatusDisplay()}</span>
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 기간 필터 */}
      <Select value={params.period || "all"} onValueChange={handlePeriodChange}>
        <SelectTrigger className="w-[160px] h-10 bg-bg-primary border-border-quaternary text-text-primary">
          <span className="text-sm">{getPeriodDisplay()}</span>
        </SelectTrigger>
        <SelectContent>
          {PERIOD_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
