/**
 * FormContainer 컴포넌트
 *
 * 폼 입력 요소들을 감싸는 공용 컨테이너
 * - 기본 상태: border 없음, shadow 없음
 * - hover 상태: 주황색(accent) border 표시
 * - active 상태(내용 입력됨): shadow 표시
 */

"use client";

import { cn } from "@/utils/utils";

interface FormContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 컨테이너 내부에 값이 입력되었는지 여부 (active 상태) */
  hasValue?: boolean;
}

export function FormContainer({
  hasValue = false,
  className,
  children,
  ref,
  ...props
}: FormContainerProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-bg-primary rounded-lg p-4 transition-all duration-200",
        "border border-transparent",
        "hover:border-border-accent",
        hasValue && "shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-2px_rgba(0,0,0,0.05)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
