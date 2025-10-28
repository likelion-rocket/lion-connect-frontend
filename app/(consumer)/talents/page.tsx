// app/(consumer)/talents/page.tsx (client 컴포넌트 예시)
"use client";

import { useState } from "react";
import Pager from "@/components/Pager";

export default function Page() {
  const [page, setPage] = useState(1);

  // totalPages는 서버에서 받아온 값으로 치환하면 됨
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-text-primary mb-6">인재탐색</h1>

      <section className="mb-8 space-y-4">
        <div className="border border-border-quaternary rounded-lg p-4">
          현재 {page} 페이지 데이터
        </div>
      </section>

      <Pager
        currentPage={page}
        totalPages={20}
        onPageChange={(next) => {
          setPage(next);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="mt-10"
      />
    </main>
  );
}
