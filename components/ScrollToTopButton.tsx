"use client";

import { useScrollToTop } from "@/hooks/common/useScrollToTop";

/**
 * 맨 위로 스크롤 버튼 컴포넌트
 * - 일정 스크롤 이상 내려가면 우측 하단에 표시
 * - 클릭 시 페이지 최상단으로 부드럽게 스크롤
 * - 최적화: throttle 적용 및 passive 이벤트 리스너 사용
 */
export default function ScrollToTopButton() {
  const { isVisible, scrollToTop } = useScrollToTop();

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-text-accent text-white shadow-lg hover:bg-text-secondary transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 group"
      aria-label="맨 위로 이동"
    >
      {/* 위쪽 화살표 아이콘 */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform group-hover:-translate-y-1"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>

      {/* 툴팁 */}
      <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-[#162D3A] text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        맨 위로
      </span>
    </button>
  );
}
