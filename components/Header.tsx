"use client";

import Link from "next/link";
import AuthButton from "./buttons/AuthButton";
import Image from "next/image";
import { useNavigation, NavLink } from "@/hooks/useNavigation";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/lib/rbac";

/**
 * 네비게이션 링크 타입 확장 (역할 기반 접근 제어)
 */
interface RoleBasedNavLink extends NavLink {
  requiredRoles?: UserRole[]; // 이 링크를 볼 수 있는 역할들 (없으면 모두 볼 수 있음)
}

/**
 * 네비게이션 링크 정의
 * - requiredRoles가 없으면 모든 사용자에게 표시
 * - requiredRoles가 있으면 해당 역할을 가진 사용자만 표시
 */
const navLinks: RoleBasedNavLink[] = [
  { label: "인재탐색", href: "/talents" },
  { label: "기업문의", href: "/#business-connect" },
  { label: "인재등록", href: "/talents/register" },
  { label: "참여기업", href: "/talents/partners", requiredRoles: [UserRole.JOINEDCOMPANY] },
  { label: "어드민", href: "/admin", requiredRoles: [UserRole.ADMIN] },
];

/**
 * 헤더 컴포넌트
 * - 로고, 네비게이션 링크, 로그인 버튼 포함
 * - 활성화된 링크에 대한 시각적 표시 (indicator)
 * - 해시 기반 스크롤 지원
 * - 역할 기반 네비게이션 표시/숨김
 */
export default function Header() {
  const { user } = useAuth();
  const userRoles = user?.roles;

  // 사용자 역할에 따라 표시할 링크 필터링
  const visibleLinks = navLinks.filter((link) => {
    // requiredRoles가 없으면 모두에게 표시
    if (!link.requiredRoles || link.requiredRoles.length === 0) {
      return true;
    }
    // requiredRoles가 있으면 사용자가 해당 역할 중 하나를 가지고 있는지 확인
    if (!userRoles) {
      return false;
    }
    return link.requiredRoles.some((role) => userRoles.includes(role));
  });

  const { navRefs, indicatorStyle, handleNavClick, isLinkActive } = useNavigation(visibleLinks);

  return (
    <header className="w-full bg-bg-primary py-3">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-2">
          <Image
            src="/icons/likelion-favicon-60.svg"
            alt="LikelionConnect Logo"
            width={60}
            height={60}
          />
          <span className="text-text-accent font-bold text-[24px] leading-[138%] tracking-[0]">
            라이언 커넥트
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 relative">
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
                className={`text-text-secondary hover:text-text-accent transition-colors font-medium py-1 ${
                  isActive ? "text-text-accent" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {/* Animated Indicator */}
          <span
            className="absolute bottom-0 h-[2px] bg-text-accent transition-all duration-300 ease-in-out"
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
