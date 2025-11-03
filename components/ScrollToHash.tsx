"use client";

import { useEffect } from "react";
import { SCROLL_DELAY_MS, SCROLL_BEHAVIOR, SCROLL_BLOCK } from "@/constants/scroll";

/**
 * 해시 기반 스크롤 처리 컴포넌트
 * - 페이지 로드 시 URL의 해시를 감지하여 자동 스크롤
 * - DOM 렌더링 완료를 위한 지연 시간 적용
 */
export default function ScrollToHash() {
  useEffect(() => {
    // 페이지 로드 시 해시가 있으면 해당 섹션으로 스크롤
    const hash = window.location.hash;
    if (hash) {
      // 약간의 지연을 주어 페이지가 완전히 로드된 후 스크롤
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({
            behavior: SCROLL_BEHAVIOR,
            block: SCROLL_BLOCK,
          });
        }
      }, SCROLL_DELAY_MS);
    }
  }, []);

  return null;
}
