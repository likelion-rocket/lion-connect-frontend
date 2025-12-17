"use client";

import BaseHeader from "./BaseHeader";
import { NavLink } from "@/hooks/common/useNavigation";

/**
 * 기업용 헤더 컴포넌트
 * - 기업 사용자(COMPANY, JOINEDCOMPANY)를 위한 네비게이션
 * - 로고 클릭 시 "/" (기업 랜딩)으로 이동
 */
export default function CompanyHeader() {
  const navLinks: NavLink[] = [
    {
      label: "인재 탐색",
      href: "/talents",
    },
    {
      label: "기업 문의",
      href: "/#business-connect",
    },
    {
      label: "채용 등록",
      href: "/jobs",
    },
  ];

  return <BaseHeader visibleLinks={navLinks} logoHref="/" />;
}
