"use client";

import * as React from "react";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

// nav wrapper
export function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("flex w-full items-center justify-center", className)}
      {...props}
    />
  );
}

// ul
export function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul className={cn("flex flex-row items-center gap-4", className)} {...props} />;
}

// li
export function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("list-none", className)} {...props} />;
}

/**
 * ArrowButton
 * - 좌/우 화살표 전용
 * - 배경/보더 없이 그냥 아이콘처럼 보이게
 * - disabled면 흐리게
 */
type ArrowButtonProps = {
  direction: "prev" | "next";
  disabled?: boolean;
  onClick?: () => void;
};

/**
 * ArrowButton (호버 효과 제거 버전)
 */
export function PaginationArrow({ direction, disabled, onClick }: ArrowButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        // 크기와 정렬
        "text-[20px] leading-none font-normal select-none",
        // 기본 색상
        "text-[#1c1c1c]",
        // 비활성화 스타일
        disabled && "opacity-30 cursor-not-allowed"
      )}
      aria-label={direction === "prev" ? "이전 페이지" : "다음 페이지"}
    >
      {direction === "prev" ? "‹" : "›"}
    </button>
  );
}

/**
 * PageButton
 * - 정사각형 24x24
 * - radius는 살짝 둥근 사각형
 * - variant에 따라 테두리/배경/글자색 바뀜
 *
 * variant "accentOutline": 주황 테두리 + 주황 텍스트 (배경 투명)
 * variant "accentFilled": 주황 배경 + 흰 텍스트
 * variant "default": 검정 테두리 + 검정 텍스트 (배경 투명)
 */
type PageButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant: "accentOutline" | "accentFilled" | "default";
  "aria-current"?: "page" | undefined;
};

export function PaginationPageButton({ children, onClick, variant, ...props }: PageButtonProps) {
  // base styling for shape/size/typography
  const baseClasses = [
    "flex items-center justify-center",
    "w-6 h-6", // 24x24 정사각형 유지
    "text-[14px] leading-none font-medium select-none",
    "border transition-colors duration-150",
    // radius를 마지막에 강제로 고정
    "rounded-[8px]",
  ].join(" ");

  const stylesByVariant: Record<typeof variant, string> = {
    accentOutline: "border-text-accent text-text-accent bg-transparent hover:bg-bg-primary/20",
    accentFilled: "border-text-accent bg-text-accent text-bg-primary hover:brightness-95",
    default:
      "border-[#1c1c1c] text-[#1c1c1c] bg-transparent hover:border-text-accent hover:text-text-accent",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(baseClasses, stylesByVariant[variant])}
      {...props}
    >
      {children}
    </button>
  );
}
