"use client";

import { useEffect, useState, useCallback } from "react";
import { throttle } from "@/lib/throttle";
import {
  SCROLL_TO_TOP_THRESHOLD,
  SCROLL_THROTTLE_DELAY,
  SCROLL_BEHAVIOR,
} from "@/constants/scroll";

/**
 * ScrollToTop 기능을 관리하는 커스텀 훅
 * - 스크롤 위치에 따라 버튼 표시/숨김 상태 관리
 * - throttle을 적용하여 스크롤 이벤트 최적화
 * - 맨 위로 스크롤하는 기능 제공
 */
export function useScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 위치에 따라 버튼 표시/숨김 처리
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsVisible(scrollY > SCROLL_TO_TOP_THRESHOLD);
  }, []);

  // throttle 적용된 스크롤 핸들러
  const throttledHandleScroll = useCallback(throttle(handleScroll, SCROLL_THROTTLE_DELAY), [
    handleScroll,
  ]);

  // 맨 위로 스크롤
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: SCROLL_BEHAVIOR,
    });
  }, []);

  useEffect(() => {
    // 초기 스크롤 위치 확인
    handleScroll();

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [handleScroll, throttledHandleScroll]);

  return {
    isVisible,
    scrollToTop,
  };
}
