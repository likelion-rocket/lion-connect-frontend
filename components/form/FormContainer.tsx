/**
 * FormContainer 컴포넌트
 *
 * 폼 입력 요소들을 감싸는 공용 컨테이너
 * - 기본 상태: border 없음, shadow 없음
 * - hover 상태: 주황색(accent) border 표시
 * - active 상태(내용 입력됨): shadow 표시
 * - pressed 상태: 강화된 shadow로 눌린 효과 표시
 */

"use client";

import Image from "next/image";
import { cn } from "@/utils/utils";

interface FormContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 컨테이너 내부에 값이 입력되었는지 여부 (active 상태) */
  hasValue?: boolean;
  /** 컨테이너가 눌린 상태 여부 (pressed 상태) */
  isPressed?: boolean;
  /** 삭제 버튼 표시 여부 */
  showDeleteButton?: boolean;
  /** 삭제 버튼 클릭 핸들러 */
  onDelete?: () => void;
  /** 삭제 중 또는 비활성화 상태 */
  disabled?: boolean;
}

export function FormContainer({
  hasValue = false,
  isPressed = false,
  onDelete,
  disabled = false,
  className,
  children,
  ref,
  ...props
}: FormContainerProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(
        "relative bg-bg-primary rounded-lg p-4 transition-all duration-200",
        "border border-transparent",
        "hover:border-border-accent",
        hasValue && "shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-2px_rgba(0,0,0,0.05)]",
        isPressed &&
          "shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.15),0px_10px_10px_-5px_rgba(0,0,0,0.08)]",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      {...props}
    >
      {hasValue && (
        <button
          onClick={() => {
            onDelete?.();
          }}
          disabled={disabled}
          className="absolute hover:cursor-pointer top-3 right-3 w-12 h-12 flex items-center justify-center rounded hover:bg-orange-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="삭제"
          type="button"
        >
          <Image src="/icons/outline-trash.svg" alt="삭제" width={24} height={24} />
        </button>
      )}
      {children}
    </div>
  );
}
