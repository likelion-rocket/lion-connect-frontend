"use client";

import { Suspense } from "react";
import InquiriesPageContent from "./_components/InquiriesPageContent";

/**
 * 기업 문의 관리 페이지
 *
 * - 검색, 필터링, 페이지네이션 기능
 * - tanstack query를 사용한 서버 상태 관리
 * - URL 쿼리 파라미터 기반 상태 관리
 */
export default function InquiriesPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-bg-primary p-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-text-primary mb-2">기업 문의 관리</h1>
              <p className="text-sm text-text-secondary">
                기업에서 문의한 내용을 확인하고 관리할 수 있습니다
              </p>
            </div>
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-text-accent" />
            </div>
          </div>
        </div>
      }
    >
      <InquiriesPageContent />
    </Suspense>
  );
}
