/**
 * FormTextarea - 폼에서 사용하는 공통 Textarea 컴포넌트
 *
 * 디자인 시스템 기반 Textarea 컴포넌트
 * - 기본, 에러, 포커스 상태 지원
 * - React Hook Form 연동 가능
 * - 모든 네이티브 textarea 속성 지원
 */

import { cn } from "@/utils/utils";

interface FormTextareaProps extends React.ComponentPropsWithoutRef<"textarea"> {
  /**
   * 에러 상태 여부
   */
  error?: boolean;
  /**
   * ref 전달 (React 19+ 방식)
   */
  ref?: React.Ref<HTMLTextAreaElement>;
}

export function FormTextarea({ error, className, ref, ...props }: FormTextareaProps) {
  return (
    <textarea
      ref={ref}
      className={cn(
        // 기본 레이아웃 (전체 너비, 패딩)
        "w-full px-4 py-3",
        // 배경 및 보더
        "bg-bg-primary rounded-lg border border-border-quaternary",
        // 텍스트 스타일
        "text-base text-text-primary placeholder:text-text-tertiary",
        // Pretendard 폰트 적용
        "font-['Pretendard']",
        // 포커스 상태
        "focus:outline-none focus:border-border-accent",
        // 트랜지션
        "transition-colors",
        // resize 방지
        "resize-none",
        // lc-input 헬퍼 클래스
        "lc-input",
        // 에러 상태
        error && "border-border-error focus:border-border-error",
        // 외부에서 전달된 className (최우선 적용)
        className
      )}
      {...props}
    />
  );
}
