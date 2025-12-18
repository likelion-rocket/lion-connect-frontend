import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * 사용자 역할 (utils/rbac.ts와 동기화)
 */
enum UserRole {
  ADMIN = "ADMIN",
  JOINEDCOMPANY = "JOINEDCOMPANY",
  COMPANY = "COMPANY",
  JOINEDUSER = "JOINEDUSER",
  USER = "USER",
}

/**
 * 역할 쿠키 이름 상수
 * - 로그인 시 설정, 로그아웃 시 삭제
 * - 미들웨어에서 역할 체크에 사용
 */
export const USER_ROLES_COOKIE = "user-roles";

/**
 * 보호된 경로 설정
 * - path: 보호할 경로 패턴 (startsWith 매칭)
 * - roles: 접근 가능한 역할들 (OR 조건)
 * - redirectTo: 권한 없을 때 리다이렉트 경로
 */
type ProtectedRoute = {
  path: string;
  roles: UserRole[];
  redirectTo: string;
};

const PROTECTED_ROUTES: ProtectedRoute[] = [
  // 인재탐색 - 기업 전용
  {
    path: "/talents",
    roles: [UserRole.ADMIN, UserRole.COMPANY, UserRole.JOINEDCOMPANY],
    redirectTo: "/dashboard",
  },
  // 채용 등록 - 기업 전용
  {
    path: "/jobs",
    roles: [UserRole.ADMIN, UserRole.COMPANY, UserRole.JOINEDCOMPANY],
    redirectTo: "/dashboard",
  },
  // 관리자 페이지
  {
    path: "/admin",
    roles: [UserRole.ADMIN],
    redirectTo: "/",
  },
];

/**
 * 로그인이 필요한 경로 (역할 무관)
 */
const AUTH_REQUIRED_PATHS = [
  "/dashboard/profile",
  "/dashboard/applications",
  "/talents",
  "/jobs",
  "/admin",
];

/**
 * 로그인한 사용자가 접근하면 안 되는 경로
 */
const GUEST_ONLY_PATHS = ["/login", "/signup"];

/**
 * 사용자가 특정 역할 중 하나라도 가지고 있는지 확인
 */
function hasAnyRole(userRoles: string[], requiredRoles: UserRole[]): boolean {
  return requiredRoles.some((role) => userRoles.includes(role));
}

/**
 * 쿠키에서 역할 배열 파싱
 */
function parseRolesFromCookie(cookieValue: string | undefined): string[] {
  if (!cookieValue) return [];
  try {
    const parsed = JSON.parse(cookieValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // RSC/prefetch 요청은 건너뛰기 (Next.js 내부 요청)
  if (searchParams.has("_rsc")) {
    return NextResponse.next();
  }

  // 역할 쿠키 읽기
  const rolesCookie = request.cookies.get(USER_ROLES_COOKIE);
  const userRoles = parseRolesFromCookie(rolesCookie?.value);
  const isLoggedIn = userRoles.length > 0;

  // 0. 레거시 URL 리다이렉션 (기존 멤버 경로 → dashboard)
  const LEGACY_MEMBER_ROUTES = ["/job-board", "/profile", "/applications"];
  for (const route of LEGACY_MEMBER_ROUTES) {
    if (pathname.startsWith(route)) {
      return NextResponse.redirect(new URL(`/dashboard${pathname}`, request.url));
    }
  }

  // 1. 게스트 전용 경로 체크 (로그인한 사용자는 접근 불가)
  if (isLoggedIn && GUEST_ONLY_PATHS.some((path) => pathname.startsWith(path))) {
    // 로그인한 사용자 역할에 따라 적절한 홈으로 리다이렉트
    const isMemberUser = hasAnyRole(userRoles, [UserRole.USER, UserRole.JOINEDUSER]);
    const homeUrl = isMemberUser ? "/dashboard" : "/";
    return NextResponse.redirect(new URL(homeUrl, request.url));
  }

  // 1.5. 루트 하위 경로는 기업 사용자 전용
  // - 루트 경로 자체(/)는 모두 접근 가능
  // - 하위 경로(예: /about, /services 등)는 기업 사용자만 접근 가능
  // - ADMIN은 모든 경로 접근 가능
  // - 정적 파일(이미지, svg 등)은 제외
  const isStaticFile = /\.(svg|png|jpg|jpeg|gif|webp|ico|pdf)$/i.test(pathname);

  if (
    pathname !== "/" &&
    pathname.startsWith("/") &&
    !pathname.startsWith("/dashboard") &&
    !isStaticFile
  ) {
    // 이미 보호된 경로(/talents, /jobs, /admin 등)는 PROTECTED_ROUTES에서 처리
    // /login, /signup은 GUEST_ONLY_PATHS에서 처리
    const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route.path));
    const isGuestOnlyPath = GUEST_ONLY_PATHS.some((path) => pathname.startsWith(path));

    // 보호된 경로나 게스트 전용 경로가 아닌 루트 하위 경로 체크
    if (!isProtectedRoute && !isGuestOnlyPath && isLoggedIn) {
      const isMemberUser = hasAnyRole(userRoles, [UserRole.USER, UserRole.JOINEDUSER]);
      const isAdmin = hasAnyRole(userRoles, [UserRole.ADMIN]);

      // 회원 사용자는 dashboard로 리다이렉트, ADMIN은 접근 허용
      if (isMemberUser && !isAdmin) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  }

  // 2. 인증 필요 경로 체크
  if (!isLoggedIn && AUTH_REQUIRED_PATHS.some((path) => pathname.startsWith(path))) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("returnTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. 역할 기반 접근 제어
  for (const route of PROTECTED_ROUTES) {
    if (pathname.startsWith(route.path)) {
      // 로그인하지 않은 경우
      if (!isLoggedIn) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("returnTo", pathname);
        return NextResponse.redirect(loginUrl);
      }

      // 역할 체크
      if (!hasAnyRole(userRoles, route.roles)) {
        return NextResponse.redirect(new URL(route.redirectTo, request.url));
      }
    }
  }

  return NextResponse.next();
}

/**
 * 미들웨어가 실행될 경로 설정
 * - 정적 파일, API 라우트 등은 제외
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, robots.txt, sitemap.xml
     * - public files (images, etc.)
     * - api routes
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images|api).*)",
  ],
};
