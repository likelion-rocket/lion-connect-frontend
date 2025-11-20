"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { useQueryParams } from "@/hooks/common/useQueryParams";

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
    <form
      onSubmit={handleSubmit}
      className="w-full px-5 py-2 bg-bg-primary shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)] rounded-lg flex items-center gap-2.5"
    >
      <div className="flex-1 flex items-center gap-4">
        <Image src="/icons/outline-search-gray.svg" alt="검색" width={24} height={24} />
        <input
          type="text"
          placeholder="이름, 직무, 스킬로 검색하세요"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="flex-1 text-sm text-text-secondary placeholder:text-text-secondary bg-transparent border-none outline-none"
        />
      </div>
      <button
        type="submit"
        className="p-3 bg-bg-accent rounded-lg flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
        aria-label="검색"
      >
        <Image src="/icons/outline-search-white.svg" alt="검색" width={24} height={24} />
      </button>
    </form>
  );
}
