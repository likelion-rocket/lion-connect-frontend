"use client";

import { useState, useEffect, FormEvent } from "react";
import { Search } from "lucide-react";
import { useQueryParams } from "@/hooks/useQueryParams";

/**
 * 기업 문의 검색바 컴포넌트
 *
 * - 엔터키를 누르면 검색 실행 (URL 쿼리 파라미터 업데이트)
 * - 검색 버튼 클릭으로도 검색 가능
 */
export default function InquirySearchBar() {
  const { params, setParam } = useQueryParams();
  const [searchValue, setSearchValue] = useState(params.q || "");

  // URL 쿼리 파라미터가 외부에서 변경되면 input 값 동기화
  useEffect(() => {
    setSearchValue(params.q || "");
  }, [params.q]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setParam("q", searchValue);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-[600px]">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-icon-tertiary pointer-events-none"
        size={20}
      />
      <input
        type="text"
        placeholder="이름, 직급, 스킬을 검색하세요"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="w-full h-12 pl-12 pr-4 bg-bg-tertiary border border-border-quaternary rounded-lg text-sm text-text-primary placeholder:text-text-tertiary outline-none focus:border-text-accent transition-colors"
      />
    </form>
  );
}
