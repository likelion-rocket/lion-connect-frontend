'use client';

import { cn } from "@/utils/utils";
import Image from "next/image";
import { useState } from "react";

interface ImageToggleButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'onToggle'> {
  /**
   * 초기 활성화 상태 (uncontrolled mode)
   * - true: 주황색 이미지 표시
   * - false: 회색 이미지 표시
   */
  defaultActive?: boolean;
  /**
   * 버튼 활성화 상태 (controlled mode)
   * - 이 prop이 제공되면 controlled component로 동작
   */
  isActive?: boolean;
  /**
   * 상태 변경 핸들러 (controlled mode)
   */
  onToggle?: (isActive: boolean) => void;
  /**
   * 회색 이미지 경로 (비활성화 상태)
   */
  grayImageSrc: string;
  /**
   * 주황색 이미지 경로 (활성화 상태)
   */
  orangeImageSrc: string;
  /**
   * 이미지 크기 (width, height)
   */
  size?: number;
  /**
   * 이미지 alt 텍스트
   */
  alt?: string;
}

/**
 * Image Toggle Button Component
 *
 * @description
 * 클릭 시 활성화/비활성화 상태를 토글하며, 상태에 따라 회색 또는 주황색 이미지를 표시하는 버튼입니다.
 * Controlled/Uncontrolled 모드를 모두 지원합니다.
 *
 * @example
 * // Uncontrolled mode (내부 상태 관리)
 * <ImageToggleButton
 *   defaultActive={false}
 *   grayImageSrc="/icons/icon-gray.svg"
 *   orangeImageSrc="/icons/icon-orange.svg"
 *   size={24}
 *   alt="토글 버튼"
 * />
 *
 * @example
 * // Controlled mode (외부 상태 관리)
 * const [isActive, setIsActive] = useState(false);
 * 
 * <ImageToggleButton
 *   isActive={isActive}
 *   onToggle={setIsActive}
 *   grayImageSrc="/icons/icon-gray.svg"
 *   orangeImageSrc="/icons/icon-orange.svg"
 *   size={24}
 *   alt="토글 버튼"
 * />
 */
export default function ImageToggleButton({
  defaultActive = false,
  isActive: controlledIsActive,
  onToggle,
  grayImageSrc,
  orangeImageSrc,
  size = 24,
  className,
  alt = "toggle button",
  disabled = false,
  ...props
}: ImageToggleButtonProps) {
  // Uncontrolled mode: 내부 상태 관리
  const [internalActive, setInternalActive] = useState(defaultActive);

  // Controlled mode인지 확인
  const isControlled = controlledIsActive !== undefined;
  const isActive = isControlled ? controlledIsActive : internalActive;

  const handleClick = () => {
    if (disabled) return;

    const newState = !isActive;

    if (isControlled) {
      // Controlled mode: 부모에게 상태 변경 알림
      onToggle?.(newState);
    } else {
      // Uncontrolled mode: 내부 상태 업데이트
      setInternalActive(newState);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      data-state={isActive ? "active" : "default"}
      className={cn(
        "w-10 p-2.5 rounded-lg inline-flex items-center justify-center transition-colors",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        isActive
          ? "bg-neutral-100 outline-[0.80px] outline-offset-[-0.80px] outline-orange-600"
          : "bg-white outline-1 -outline-offset-1 outline-neutral-200",
        className
      )}
      aria-pressed={isActive}
      aria-label={alt}
      aria-disabled={disabled}
      {...props}
    >
      <Image
        src={isActive ? orangeImageSrc : grayImageSrc}
        alt={alt}
        width={size}
        height={size}
        className="object-contain"
      />
    </button>
  );
}
