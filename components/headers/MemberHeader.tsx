"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useNavigation, NavLink } from "@/hooks/common/useNavigation";
import { useAuthStore } from "@/store/authStore";
import { useLogout } from "@/hooks/auth/useLogout";

/**
 * 인재용 헤더 컴포넌트
 * - 인재 사용자(USER, JOINEDUSER)를 위한 네비게이션
 * - 로고 클릭 시 "/dashboard" (인재 랜딩)으로 이동
 */
export default function MemberHeader() {
  const { user } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const { logout } = useLogout();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks: NavLink[] = [
    {
      label: "채용",
      href: "/dashboard/job-board",
    },
    {
      label: "이력서",
      href: "/dashboard/profile",
    },
    {
      label: "지원 현황",
      href: "/dashboard/applications",
    },
  ];

  const { navRefs, handleNavClick, isLinkActive } = useNavigation(navLinks);

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
          <Link href="/dashboard" className="text-text-accent text-2xl font-black font-ko-title">
            라이언 커넥트
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="absolute left-[340px] top-1/2 -translate-y-1/2 flex items-center gap-10">
          {navLinks.map((link, index) => {
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

        {/* Right Section */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-5">
          {mounted && user ? (
            <>
              {/* User Name Display */}
              <div className="px-3.5 py-1.5 rounded-lg">
                <span className="text-text-primary text-xs font-semibold font-ko-title">
                  {user.email}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => logout()}
                className="px-3.5 py-1.5 cursor-pointer rounded-lg border border-border-primary hover:bg-bg-secondary transition-colors"
              >
                <span className="text-text-primary text-xs font-semibold font-ko-title">
                  로그아웃
                </span>
              </button>
            </>
          ) : (
            <Link
              href={`/login?returnTo=${encodeURIComponent(pathname || "/")}`}
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
