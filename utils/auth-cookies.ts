/**
 * 인증 관련 쿠키 유틸리티
 *
 * 목적:
 * - 미들웨어에서 역할 기반 접근 제어를 위한 쿠키 관리
 * - 로그인 시 설정, 로그아웃 시 삭제
 *
 * 보안 참고:
 * - 이 쿠키는 UX 개선용 (미들웨어에서 빠른 리다이렉트)
 * - 실제 보안은 백엔드 API에서 JWT 토큰 검증으로 처리
 * - 쿠키 조작해도 백엔드에서 403 Forbidden 반환
 */

/**
 * 역할 쿠키 이름 (middleware.ts와 동기화)
 */
export const USER_ROLES_COOKIE = "user-roles";

/**
 * 쿠키 설정 옵션
 */
const COOKIE_OPTIONS = {
  path: "/",
  sameSite: "lax" as const,
  // secure: process.env.NODE_ENV === "production", // HTTPS에서만
  maxAge: 60 * 60 * 24 * 7, // 7일 (refreshToken과 맞춤)
};

/**
 * 역할 쿠키 설정
 * - 로그인 성공 시 호출
 * @param roles - 사용자 역할 배열
 */
export function setUserRolesCookie(roles: string[]): void {
  if (typeof document === "undefined") return;

  const value = JSON.stringify(roles);
  const { path, sameSite, maxAge } = COOKIE_OPTIONS;

  document.cookie = `${USER_ROLES_COOKIE}=${encodeURIComponent(value)}; path=${path}; max-age=${maxAge}; SameSite=${sameSite}`;
}

/**
 * 역할 쿠키 삭제
 * - 로그아웃 시 호출
 */
export function clearUserRolesCookie(): void {
  if (typeof document === "undefined") return;

  // max-age=0으로 즉시 삭제
  document.cookie = `${USER_ROLES_COOKIE}=; path=/; max-age=0`;
}

/**
 * 역할 쿠키 읽기 (클라이언트용)
 * @returns 역할 배열 또는 빈 배열
 */
export function getUserRolesFromCookie(): string[] {
  if (typeof document === "undefined") return [];

  const cookies = document.cookie.split("; ");
  const rolesCookie = cookies.find((c) => c.startsWith(`${USER_ROLES_COOKIE}=`));

  if (!rolesCookie) return [];

  try {
    const value = decodeURIComponent(rolesCookie.split("=")[1]);
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
