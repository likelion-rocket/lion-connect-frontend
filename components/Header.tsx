"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AuthButton from "./buttons/AuthButton";
import Image from "next/image";
import { useNavigation, NavLink } from "@/hooks/useNavigation";
import { useAuthStore } from "@/store/authStore";
import { UserRole } from "@/lib/rbac";

/**
 * 네비게이션 링크 타입 확장 (역할 기반 접근 제어)
 */
type RoleBasedNavLink = NavLink & {
  requiredRoles?: UserRole[]; // 이 링크를 볼 수 있는 역할들 (없으면 모두 볼 수 있음)
};

/**
 * 네비게이션 링크 정의
 * 권한별 표시 규칙:
 * - ADMIN: 모든 링크 표시 (5개)
 * - JOINEDCOMPANY: 인재탐색, 기업문의, 인재등록, 참여기업 (4개)
 * - 일반 유저: 인재탐색, 기업문의, 참여기업 (3개)
 */
const navLinks: RoleBasedNavLink[] = [
  { label: "인재탐색", href: "/talents" },
  { label: "기업문의", href: "/#business-connect" },
  { label: "인재등록", href: "/talents/register" },
  // { label: "참여기업", href: "/talents/partners" },
  { label: "어드민", href: "/admin", requiredRoles: [UserRole.ADMIN] },
];

/**
 * 역할 기반 링크 필터링 함수
 * - ADMIN: 모든 링크 표시
 * - requiredRoles가 없으면 모두에게 표시
 * - requiredRoles가 있으면 사용자가 해당 역할 중 하나를 가지고 있는지 확인
 */
function filterLinksByRole(links: RoleBasedNavLink[], userRoles?: string[]): RoleBasedNavLink[] {
  // ADMIN은 모든 링크를 볼 수 있음
  if (userRoles?.includes(UserRole.ADMIN)) {
    return links;
  }

  return links.filter((link) => {
    // 역할 요구사항이 없으면 모두에게 표시
    if (!link.requiredRoles?.length) return true;

    // 사용자 역할이 없으면 숨김
    if (!userRoles?.length) return false;

    // 필요한 역할 중 하나라도 있으면 표시
    return link.requiredRoles.some((role) => userRoles.includes(role));
  });
}

/**
 * 헤더 컴포넌트
 * - 로고, 네비게이션 링크, 로그인 버튼 포함
 * - 활성화된 링크에 대한 시각적 표시 (indicator)
 * - 해시 기반 스크롤 지원
 * - 역할 기반 네비게이션 표시/숨김
 */
export default function Header() {
  const { user } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  // Hydration 불일치 방지: 클라이언트에서만 역할 기반 링크 필터링
  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR 시점에는 기본 링크만 표시 (requiredRoles가 없는 링크들)
  const defaultLinks = navLinks.filter((link) => !link.requiredRoles?.length);
  const visibleLinks = mounted ? filterLinksByRole(navLinks, user?.roles) : defaultLinks;

  const { navRefs, indicatorStyle, handleNavClick, isLinkActive } = useNavigation(visibleLinks);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-bg-primary ">
      <nav className="max-w-7xl min-w-[1444px] mx-auto px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-2">
          <Image
            src="/icons/likelion-favicon-60.svg"
            alt="LikelionConnect Logo"
            width={32}
            height={32}
          />
          <span className="text-text-accent font-bold text-[24px] leading-[138%] tracking-[0]">
            라이언 커넥트
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-36 relative">
          {visibleLinks.map((link, index) => {
            const isActive = isLinkActive(link);

            return (
              <Link
                key={link.href}
                href={link.href}
                ref={(el) => {
                  navRefs.current[index] = el;
                }}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-medium py-1 transition-colors ${
                  isActive ? "text-text-accent" : "text-black hover:text-text-accent"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {/* Animated Indicator */}
          <span
            className="absolute bottom-0 h-0.5 bg-text-accent transition-all duration-300 ease-in-out"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
            }}
          />
        </div>

        {/* Auth Button (Login/Logout) */}
        <AuthButton />
      </nav>
    </header>
  );
}
