"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

export type NavLink = {
  label: string;
  href: string;
};

// 상수 정의
const SCROLL_TOP_THRESHOLD = 100;
const BUSINESS_CONNECT_HASH = "#business-connect";
const BUSINESS_CONNECT_HREF = "/#business-connect";
const BUSINESS_CONNECT_ID = "business-connect";

/**
 * 네비게이션 로직을 관리하는 커스텀 훅
 * - 현재 활성화된 네비게이션 아이템 추적
 * - 해시 변경 감지
 * - Indicator 위치 계산
 * - 스크롤 동작 처리
 */
export function useNavigation(navLinks: NavLink[]) {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  /**
   * 해시 링크 여부 확인 헬퍼 함수
   */
  const isBusinessConnectLink = useCallback((href: string) => {
    return href === BUSINESS_CONNECT_HREF;
  }, []);

  /**
   * 링크 활성화 상태 체크 헬퍼 함수
   * - 중복 로직 제거를 위한 단일 책임 함수
   */
  const checkLinkActive = useCallback(
    (link: NavLink): boolean => {
      if (isBusinessConnectLink(link.href)) {
        // hydration mismatch 방지: 초기 렌더링 시 false 반환
        return currentHash !== "" && pathname === "/" && currentHash === BUSINESS_CONNECT_HASH;
      }
      if (link.href === "/") {
        return false; // 루트 경로는 active 상태로 표시하지 않음
      }
      return pathname === link.href;
    },
    [pathname, currentHash, isBusinessConnectLink]
  );

  // 클라이언트에서만 hash 값을 가져오기
  useEffect(() => {
    setCurrentHash(window.location.hash);

    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    // 스크롤 이벤트: 맨 위로 올라왔을 때 해시 제거 (throttle 적용)
    let throttleTimeout: NodeJS.Timeout | null = null;
    const handleScroll = () => {
      if (throttleTimeout) return;

      throttleTimeout = setTimeout(() => {
        // 페이지 맨 위에 있고 해시가 있으면 제거
        if (window.scrollY < SCROLL_TOP_THRESHOLD && window.location.hash) {
          window.history.replaceState(null, "", window.location.pathname);
          setCurrentHash("");
        }
        throttleTimeout = null;
      }, 100); // 100ms throttle
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, []);

  // Indicator 위치 계산
  useEffect(() => {
    const activeIndex = navLinks.findIndex((link) => {
      if (isBusinessConnectLink(link.href)) {
        return currentHash !== "" && pathname === "/" && currentHash === BUSINESS_CONNECT_HASH;
      }
      if (link.href === "/") {
        return false;
      }
      return pathname === link.href;
    });

    const element = navRefs.current[activeIndex];

    if (activeIndex !== -1 && element) {
      setIndicatorStyle({
        left: element.offsetLeft,
        width: element.offsetWidth,
      });
    } else {
      // active한 링크가 없으면 indicator를 숨김
      setIndicatorStyle({
        left: 0,
        width: 0,
      });
    }
  }, [pathname, currentHash, isBusinessConnectLink]);

  /**
   * 네비게이션 클릭 핸들러
   * - 해시 링크의 경우 스크롤 동작 처리
   * - 다른 페이지로 이동하는 경우 일반 동작
   */
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!isBusinessConnectLink(href)) return;

      e.preventDefault();

      if (pathname === "/") {
        // 같은 페이지에서는 부드럽게 스크롤
        const element = document.getElementById(BUSINESS_CONNECT_ID);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        // 다른 페이지에서는 랜딩 페이지로 이동
        window.location.href = BUSINESS_CONNECT_HREF;
      }
    },
    [pathname, isBusinessConnectLink]
  );

  return {
    navRefs,
    indicatorStyle,
    handleNavClick,
    isLinkActive: checkLinkActive,
  };
}
