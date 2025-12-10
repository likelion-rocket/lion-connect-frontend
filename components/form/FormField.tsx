/**
 * FormField - 폼 필드 래퍼 컴포넌트
 * 라벨, 입력 필드, 도움말 텍스트를 포함하는 공통 폼 필드 컴포넌트
 */

import { cn } from "@/utils/utils";

interface FormFieldProps {
  label: string; // 필드 라벨
  required?: boolean; // 필수 필드 여부
  error?: string; // 에러 메시지
  helperText?: string; // 도움말 텍스트
  children: React.ReactNode; // 입력 필드
  className?: string;
}

export function FormField({
  label,
  required,
  error,
  helperText,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("self-stretch flex flex-col justify-start items-start gap-3", className)}>
      {/* 라벨 */}
      <div className="self-stretch justify-start">
        <span className="text-neutral-800 text-base font-normal font-['Pretendard'] leading-6">
          {label}
        </span>
        {required && (
          <span className="text-red-500 text-base font-normal font-['Pretendard'] leading-6">
            *
          </span>
        )}
      </div>

      {/* 입력 필드 */}
      {children}

      {/* 에러 메시지 또는 도움말 텍스트 */}
      {error ? (
        <div className="self-stretch justify-start text-red-500 text-xs font-normal font-['Pretendard'] leading-4">
          {error}
        </div>
      ) : helperText ? (
        <div className="self-stretch justify-start text-neutral-800 text-xs font-normal font-['Pretendard'] leading-4">
          {helperText}
        </div>
      ) : null}
    </div>
  );
}
