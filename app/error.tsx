"use client";

import { useEffect } from "react";
import Link from "next/link";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러 로깅 (프로덕션에서는 에러 추적 서비스로 전송)
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-orange-50 px-4">
      <div className="text-center max-w-md">
        {/* 에러 아이콘 */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-red-600 mb-4">오류</h1>
          <p className="text-3xl font-bold text-gray-800 mb-2">문제가 발생했습니다</p>
          <p className="text-lg text-gray-600">죄송하지만, 예기치 않은 오류가 발생했습니다.</p>
        </div>

        {/* 에러 일러스트레이션 */}
        <div className="mb-8">
          <svg
            className="w-48 h-48 mx-auto text-red-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4v2m0 0v2m0-6v-2m0 0v-2m0 2h2m0 0h2m0 0h-2m0 0h-2m0 6h2m0 0h2m0 0h-2m0 0h-2M12 3a9 9 0 100 18 9 9 0 000-18z"
            />
          </svg>
        </div>

        {/* 에러 세부사항 (개발 환경용) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-6 p-4 bg-red-100 rounded-lg border border-red-300 text-left">
            <p className="text-sm font-mono text-red-900">{error.message}</p>
            {error.digest && <p className="text-xs text-red-700 mt-2">Error ID: {error.digest}</p>}
          </div>
        )}

        {/* 액션 버튼 */}
        <div className="space-y-4">
          <button
            onClick={reset}
            className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            다시 시도
          </button>
          <Link
            href="/"
            className="inline-block w-full px-6 py-3 bg-white text-red-600 font-semibold rounded-lg border-2 border-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            홈으로 돌아가기
          </Link>
        </div>

        {/* 추가 정보 */}
        <p className="mt-8 text-sm text-gray-500">
          이 문제가 계속되면{" "}
          <a href="mailto:support@lionconnect.com" className="text-red-600 hover:underline">
            고객지원
          </a>
          에 문의해주세요.
        </p>
      </div>
    </div>
  );
}
