"use server";

import { cookies } from "next/headers";

/**
 * 인증 쿠키 설정 Server Action
 * - 서버에서 Set-Cookie 헤더로 쿠키 설정
 * - HttpOnly, Secure 플래그 적용으로 보안 강화
 * - 클라이언트 쿠키 설정 타이밍 이슈 해결
 *
 * @param roles - 사용자 역할 배열
 */
export async function setAuthCookies(roles: string[]) {
  const cookieStore = await cookies();

  cookieStore.set("user-roles", JSON.stringify(roles), {
    httpOnly: true, // XSS 공격 방지
    secure: process.env.NODE_ENV === "production", // HTTPS에서만 전송
    sameSite: "lax", // CSRF 공격 방지
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7일
  });
}

/**
 * 인증 쿠키 삭제 Server Action
 * - 로그아웃 시 호출
 */
export async function clearAuthCookies() {
  const cookieStore = await cookies();

  cookieStore.delete("user-roles");
}
