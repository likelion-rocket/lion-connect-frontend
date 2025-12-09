"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useNavigation, NavLink } from "@/hooks/common/useNavigation";
import { useAuthStore } from "@/store/authStore";
import { UserRole, RoleBasedItem, filterByRole } from "@/utils/rbac";

/**
 * 네비게이션 링크 타입 (역할 기반 접근 제어 적용)
 */
type RoleBasedNavLink = RoleBasedItem<NavLink>;

/**
 * 네비게이션 링크 정의 - 기본 링크(모든 사용자)와 역할별 링크 분리
 */
const defaultNavLinks: NavLink[] = [
  { label: "기업 문의", href: "/#business-connect" },
  { label: "이력서", href: "/profile" },
];

const roleBasedNavLinks: RoleBasedNavLink[] = [
  {
    label: "인재 탐색",
    href: "/talents",
    requiredRoles: [UserRole.ADMIN, UserRole.JOINEDCOMPANY, UserRole.COMPANY],
  },
  { label: "어드민", href: "/admin", requiredRoles: [UserRole.ADMIN] },
];

/**
 * 헤더 컴포넌트
 * - SSR: 기본 네비게이션 + 로그인 버튼 표시
 * - CSR: 역할 기반 추가 링크 + 실제 로그인 상태 반영
 */
export default function Header() {
  const { user } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR: 기본 링크만 / CSR: 역할 기반 링크 추가
  const additionalLinks = mounted ? filterByRole(roleBasedNavLinks, user?.roles) : [];
  const visibleLinks: NavLink[] = [...additionalLinks, ...defaultNavLinks];

  const { navRefs, handleNavClick, isLinkActive } = useNavigation(visibleLinks);

  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      useAuthStore.getState().clearAuth();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-bg-primary border-b border-border-accent">
      <div className="w-[1440px] h-20 mx-auto px-8 relative">
        {/* Logo */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <Image
            src="/icons/likelion-favicon-60.svg"
            alt="LikelionConnect Logo"
            width={32}
            height={32}
          />
          <Link href="/" className="text-text-accent text-2xl font-black font-ko-title">
            라이언 커넥트
          </Link>
        </div>

        {/* Navigation Links - SSR에서도 기본 링크 렌더링 */}
        <nav className="absolute left-[340px] top-1/2 -translate-y-1/2 flex items-center gap-10">
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
                className={`flex items-center gap-1 text-base font-semibold font-ko-title transition-colors ${
                  isActive ? "text-text-accent" : "text-text-primary hover:text-text-accent"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: SSR에서는 로그인 버튼, CSR에서는 실제 상태 반영 */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-5">
          {mounted && user ? (
            <>
              {/* Bell Icon */}
              <Image src="/icons/bell.svg" alt="Notifications" width={24} height={24} />

              {/* User Name Display */}
              <div className="px-3.5 py-1.5 rounded-lg">
                <span className="text-text-primary text-xs font-semibold font-ko-title">
                  {user.email}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 cursor-pointer rounded-lg border border-border-primary hover:bg-bg-secondary transition-colors"
              >
                <span className="text-text-primary text-xs font-semibold font-ko-title">
                  로그아웃
                </span>
              </button>
            </>
          ) : (
            /* Login Button - SSR과 비로그인 상태 모두 동일 */
            <Link
              href="/login"
              className="px-4 py-2 bg-accent rounded-lg text-text-inverse-primary text-sm font-semibold font-ko-title hover:opacity-90 transition-opacity"
            >
              로그인/회원가입
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
