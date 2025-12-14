"use client";

import { cn } from "@/utils/utils";

interface JobActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 상태
   * - "active": 활성화 상태 (주황색 배경)
   * - "default": 기본 상태 (회색 배경)
   */
  variant?: "active" | "default";
  /**
   * 버튼 타입 (data-type attribute)
   */
  dataType?: string;
}

/**
 * Job Action Button Component
 *
 * @description
 * 채용 공고 카드에서 사용하는 액션 버튼 (게시 중, 게시 하기 등)
 * OrangeBgButton과 동일한 디자인이지만, 비활성 상태에서도 클릭 가능
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
  className,
  children,
  ...props
}: JobActionButtonProps) {
  const isActive = variant === "active";

  return (
    <button
      data-state={isActive ? "active" : "default"}
      data-type={dataType}
      className={cn(
        // 기본 스타일
        "w-28 px-6 py-2 rounded-lg inline-flex justify-center items-center transition-colors cursor-pointer",
        "text-xs font-bold font-ko-body leading-4",
        "outline outline-1 outline-offset-[-1px]",
        // 활성화 상태 (주황색)
        isActive && "bg-bg-accent text-white active:bg-brand-06 outline-neutral-300",
        // 기본 상태 (EditDeleteButton과 동일)
        !isActive && "outline-border-quaternary text-[#737373] hover:bg-gray-50 hover:text-gray-900",
        className
      )}
      {...props}
    >
      <span className="justify-start">{children}</span>
    </button>
  );
}
