"use client";

import OrangeBgButton from "./OrangeBgButton";

interface JobActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 상태
   * - "active": 활성화 상태 (주황색 배경)
   * - "default": 기본 상태 (흰색 배경, hover 시 주황색)
   * - "disabled": 비활성화 상태
   */
  variant?: "active" | "default" | "disabled";
  /**
   * 버튼 타입 (data-type attribute)
   */
  dataType?: string;
}

/**
 * Job Action Button Component
 *
 * @description
 * 채용 공고 카드에서 사용하는 액션 버튼 (게시 중, 수정하기, 삭제하기 등)
 * OrangeBgButton의 small size wrapper
 *
 * @example
 * // 활성화 상태 (게시 중)
 * <JobActionButton variant="active">게시 중</JobActionButton>
 *
 * // 기본 상태 (게시 하기)
 * <JobActionButton variant="default">게시 하기</JobActionButton>
 */
export function JobActionButton({
  variant = "default",
  dataType,
  ...props
}: JobActionButtonProps) {
  const isActive = variant === "active";

  return (
    <OrangeBgButton
      isActive={isActive}
      size="small"
      dataType={dataType}
      {...props}
    />
  );
}
