"use client";

import Input from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * 관리자 페이지 검색바 컴포넌트
 * - URL 쿼리스트링 기반 검색
 * - useTransition으로 부드러운 네비게이션
 */
export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // 현재 URL의 search 파라미터를 초기값으로 설정
  const [searchValue, setSearchValue] = useState(searchParams.get("search") ?? "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(() => {
      // 검색어가 있으면 쿼리스트링에 추가, 없으면 제거
      const params = new URLSearchParams(searchParams.toString());

      if (searchValue.trim()) {
        params.set("search", searchValue.trim());
        params.set("page", "1"); // 검색 시 첫 페이지로 리셋
      } else {
        params.delete("search");
        params.set("page", "1");
      }

      router.push(`/admin?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-10 pr-4"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
      </div>

      {/* 로딩 상태 표시 (선택사항) */}
      {isPending && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-text-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </form>
  );
}
