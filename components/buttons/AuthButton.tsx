"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useLogout } from "@/hooks/auth/useLogout";

type AuthButtonProps = {
  className?: string;
};

/**
 * 인증 버튼 컴포넌트
 * - 로그인 전: "로그인/회원가입" 버튼
 * - 로그인 후: "로그아웃" 버튼
 */
export default function AuthButton({ className = "" }: AuthButtonProps) {
  const { isAuthenticated } = useAuthStore();
  const { logout, isLoading } = useLogout();

  const defaultClassName =
    "w-32 h-9 px-4 py-2 bg-accent rounded-lg inline-flex justify-center items-center gap-2 text-text-inverse-primary text-sm font-semibold hover:opacity-90 transition-opacity";

  const buttonClassName = className || defaultClassName;

  // 로그인된 경우 로그아웃 버튼
  if (isAuthenticated) {
    return (
      <button onClick={() => logout()} disabled={isLoading} className={buttonClassName}>
        {isLoading ? "로그아웃 중..." : "로그아웃"}
      </button>
    );
  }

  // 로그인되지 않은 경우 로그인 버튼
  return (
    <Link href="/login" className={buttonClassName}>
      로그인/회원가입
    </Link>
  );
}
