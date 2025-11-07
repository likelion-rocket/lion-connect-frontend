/**
 * 역할 기반 접근 제어(RBAC) 유틸리티
 *
 * 보안 원칙:
 * - 프론트엔드의 역할 체크는 UX 개선용 (UI 표시/숨김)
 * - 실제 보안은 백엔드 API에서 JWT 토큰 검증 + 역할 체크로 처리
 * - 프론트엔드 체크를 우회하더라도 백엔드에서 403 Forbidden 반환
 */

/**
 * 사용자 역할 enum
 */
export enum UserRole {
  ADMIN = "ADMIN", // 관리자
  JOINEDCOMPANY = "JOINEDCOMPANY", // 참여기업
  COMPANY = "COMPANY", // 일반기업
  JOINEDUSER = "JOINEDUSER", // 교육생
  USER = "USER", // 일반유저
}

/**
 * 사용자가 특정 역할을 가지고 있는지 확인
 * @param userRoles - 사용자의 역할 배열
 * @param requiredRole - 필요한 역할
 * @returns 역할 보유 여부
 */
export function hasRole(userRoles: string[] | null | undefined, requiredRole: UserRole): boolean {
  if (!userRoles || userRoles.length === 0) {
    return false;
  }
  return userRoles.includes(requiredRole);
}

/**
 * 사용자가 여러 역할 중 하나라도 가지고 있는지 확인
 * @param userRoles - 사용자의 역할 배열
 * @param requiredRoles - 필요한 역할들 (OR 조건)
 * @returns 역할 보유 여부
 */
export function hasAnyRole(
  userRoles: string[] | null | undefined,
  requiredRoles: UserRole[]
): boolean {
  if (!userRoles || userRoles.length === 0) {
    return false;
  }
  return requiredRoles.some((role) => userRoles.includes(role));
}

/**
 * 사용자가 모든 역할을 가지고 있는지 확인
 * @param userRoles - 사용자의 역할 배열
 * @param requiredRoles - 필요한 역할들 (AND 조건)
 * @returns 역할 보유 여부
 */
export function hasAllRoles(
  userRoles: string[] | null | undefined,
  requiredRoles: UserRole[]
): boolean {
  if (!userRoles || userRoles.length === 0) {
    return false;
  }
  return requiredRoles.every((role) => userRoles.includes(role));
}

/**
 * 관리자 여부 확인
 */
export function isAdmin(userRoles: string[] | null | undefined): boolean {
  return hasRole(userRoles, UserRole.ADMIN);
}

/**
 * 참여기업 여부 확인
 */
export function isJoinedCompany(userRoles: string[] | null | undefined): boolean {
  return hasRole(userRoles, UserRole.JOINEDCOMPANY);
}

/**
 * 일반기업 여부 확인
 */
export function isCompany(userRoles: string[] | null | undefined): boolean {
  return hasRole(userRoles, UserRole.COMPANY);
}

/**
 * 교육생 여부 확인
 */
export function isJoinedUser(userRoles: string[] | null | undefined): boolean {
  return hasRole(userRoles, UserRole.JOINEDUSER);
}

/**
 * 일반유저 여부 확인
 */
export function isUser(userRoles: string[] | null | undefined): boolean {
  return hasRole(userRoles, UserRole.USER);
}
