/**
 * FormSelect - 폼에서 사용하는 공통 Select 컴포넌트
 *
 * 디자인 시스템 기반 Select 컴포넌트
 * - 기본, 에러, 포커스 상태 지원
 * - React Hook Form 연동 가능
 * - 모든 네이티브 select 속성 지원
 */

import { cn } from "@/utils/utils";

interface FormSelectProps extends React.ComponentPropsWithoutRef<"select"> {
  /**
   * 에러 상태 여부
   */
  error?: boolean;
  /**
   * ref 전달 (React 19+ 방식)
   */
  ref?: React.Ref<HTMLSelectElement>;
}

export function FormSelect({ error, className, ref, children, ...props }: FormSelectProps) {
  return (
    <select
      ref={ref}
      className={cn(
        // 기본 레이아웃 (전체 너비, 높이, 패딩)
        "w-full h-14 px-4 py-3",
        // 배경 및 보더
        "bg-bg-primary rounded-lg border border-border-quaternary",
        // 텍스트 스타일
        "text-base text-text-primary",
        // Pretendard 폰트 적용
        "font-['Pretendard']",
        // 포커스 상태
        "focus:outline-none focus:border-border-accent",
        // 트랜지션
        "transition-colors",
        // lc-input 헬퍼 클래스
        "lc-input",
        // 에러 상태
        error && "border-border-error focus:border-border-error",
        // 외부에서 전달된 className (최우선 적용)
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
