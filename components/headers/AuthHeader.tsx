"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

/**
 * 인증(로그인/회원가입) 페이지용 헤더 내부 컴포넌트
 * - useSearchParams를 사용하므로 Suspense로 감싸야 함
 */
function AuthHeaderContent() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");

  // returnTo가 /dashboard로 시작하면 dashboard로, 아니면 홈으로
  const logoHref = returnTo?.startsWith("/dashboard") ? "/dashboard" : "/";

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
          <Link href={logoHref} className="text-text-accent text-2xl font-black font-ko-title">
            라이언 커넥트
          </Link>
        </div>

        {/* Right Section: 로그인 버튼 */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2">
          <Link
            href={`/login${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`}
            className="px-4 py-2 bg-accent rounded-lg text-text-inverse-primary text-sm font-semibold font-ko-title hover:opacity-90 transition-opacity"
          >
            로그인/회원가입
          </Link>
        </div>
      </div>
    </header>
  );
}

/**
 * 인증(로그인/회원가입) 페이지용 헤더
 * - 로고와 로그인 버튼만 표시
 * - returnTo 쿼리 파라미터로 이전 페이지로 복귀 지원
 */
export default function AuthHeader() {
  return (
    <Suspense fallback={
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-bg-primary border-b border-border-accent">
        <div className="w-[1440px] h-20 mx-auto px-8" />
      </header>
    }>
      <AuthHeaderContent />
    </Suspense>
  );
}
