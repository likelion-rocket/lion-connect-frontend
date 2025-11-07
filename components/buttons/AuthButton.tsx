"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useLogout } from "@/hooks/useLogout";

type AuthButtonProps = {
  className?: string;
};

/**
 * 인증 버튼 컴포넌트
 * - 로그인 전: "로그인/회원가입" 버튼
 * - 로그인 후: "로그아웃" 버튼
 */
export default function AuthButton({ className = "" }: AuthButtonProps) {
  const { isAuthenticated, user } = useAuth();
  const { logout, isLoading } = useLogout();

  const defaultClassName =
    "bg-brand-01 text-text-accent px-6 py-2 rounded-full border border-border-accent hover:bg-brand-02 transition-colors font-medium";

  const buttonClassName = className || defaultClassName;

  // 로그인된 경우 로그아웃 버튼
  if (isAuthenticated) {
    return (
      <>
        {/* 로그아웃 버튼 */}
        <button onClick={() => logout()} disabled={isLoading} className={buttonClassName}>
          {isLoading ? "로그아웃 중..." : "로그아웃"}
        </button>
      </>
    );
  }

  // 로그인되지 않은 경우 로그인 버튼
  return (
    <Link href="/login" className={buttonClassName}>
      로그인/회원가입
    </Link>
  );
}
