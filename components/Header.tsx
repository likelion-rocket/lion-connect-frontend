"use client";

import Link from "next/link";
import LoginButton from "./buttons/LoginButton";
import Image from "next/image";
import { useNavigation, NavLink } from "@/hooks/useNavigation";

const navLinks: NavLink[] = [
  { label: "인재탐색", href: "/talents" },
  { label: "기업문의", href: "/#business-connect" },
  { label: "인재등록", href: "/talents/register" },
  { label: "참여기업", href: "/talents/partners" },
  { label: "어드민", href: "/admin" },
];

/**
 * 헤더 컴포넌트
 * - 로고, 네비게이션 링크, 로그인 버튼 포함
 * - 활성화된 링크에 대한 시각적 표시 (indicator)
 * - 해시 기반 스크롤 지원
 */
export default function Header() {
  const { navRefs, indicatorStyle, handleNavClick, isLinkActive } = useNavigation(navLinks);

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

        {/* Sign Up Button */}
        <LoginButton />
      </nav>
    </header>
  );
}
