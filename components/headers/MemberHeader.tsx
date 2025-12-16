"use client";

import BaseHeader from "./BaseHeader";
import { NavLink } from "@/hooks/common/useNavigation";

/**
 * 인재용 헤더 컴포넌트
 * - 인재 사용자(USER, JOINEDUSER)를 위한 네비게이션
 * - 로고 클릭 시 "/dashboard" (인재 랜딩)으로 이동
 */
export default function MemberHeader() {
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

  return <BaseHeader visibleLinks={navLinks} logoHref="/dashboard" />;
}
