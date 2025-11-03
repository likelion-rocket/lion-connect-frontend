"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export type NavLink = {
  label: string;
  href: string;
};

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

  // 클라이언트에서만 hash 값을 가져오기
  useEffect(() => {
    setCurrentHash(window.location.hash);

    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Indicator 위치 계산
  useEffect(() => {
    const activeIndex = navLinks.findIndex((link) => {
      if (link.href === "/#business-connect") {
        return pathname === "/" && currentHash === "#business-connect";
      }
      if (link.href === "/") {
        return false; // 루트 경로는 active 상태로 표시하지 않음
      }
      // 정확히 일치하는 경로를 우선 체크
      return pathname === link.href;
    });

    if (activeIndex !== -1 && navRefs.current[activeIndex]) {
      const element = navRefs.current[activeIndex];
      if (element) {
        setIndicatorStyle({
          left: element.offsetLeft,
          width: element.offsetWidth,
        });
      }
    } else {
      // active한 링크가 없으면 indicator를 숨김
      setIndicatorStyle({
        left: 0,
        width: 0,
      });
    }
  }, [pathname, currentHash, navLinks]);

  /**
   * 네비게이션 클릭 핸들러
   * - 해시 링크의 경우 스크롤 동작 처리
   * - 다른 페이지로 이동하는 경우 일반 동작
   */
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "/#business-connect") {
      e.preventDefault();

      if (pathname === "/") {
        // 같은 페이지에서는 부드럽게 스크롤
        const element = document.getElementById("business-connect");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        // 다른 페이지에서는 랜딩 페이지로 이동
        window.location.href = "/#business-connect";
      }
    }
  };

  /**
   * 링크의 active 상태 확인
   */
  const isLinkActive = (link: NavLink): boolean => {
    if (link.href === "/#business-connect") {
      return pathname === "/" && currentHash === "#business-connect";
    }
    if (link.href === "/") {
      return false; // 루트 경로는 active 상태로 표시하지 않음
    }
    return pathname === link.href; // 정확히 일치하는 경로만 active
  };

  return {
    navRefs,
    indicatorStyle,
    handleNavClick,
    isLinkActive,
  };
}
