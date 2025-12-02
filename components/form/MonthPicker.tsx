/**
 * MonthPicker - 단일 Month Picker 컴포넌트
 *
 * 단일 날짜 선택용 month picker UI 제공
 * - 커스텀 UI로 YYYY.MM 형태 표시
 * - 숨겨진 네이티브 input으로 실제 동작 처리
 * - React Hook Form 연동 지원
 */

"use client";

import { FormInput } from "@/components/form/FormInput";
import type { UseFormRegisterReturn } from "react-hook-form";

interface MonthPickerProps {
  value?: string;
  register: UseFormRegisterReturn;
  id?: string;
  className?: string;
}

// YYYY-MM 형식을 YYYY.MM 형식으로 변환
function formatMonthDisplay(value?: string): string {
  if (!value) return "YYYY.MM";
  return value.replace("-", ".");
}

export function MonthPicker({ value, register, id, className }: MonthPickerProps) {
  return (
    <div className={className}>
      <div className="relative h-14 md:h-16 bg-bg-primary rounded-lg px-4 flex items-center">
        {/* 커스텀 UI 표시 레이어 */}
        <span className={value ? "text-text-primary" : "text-text-tertiary"}>
          {formatMonthDisplay(value)}
        </span>

        {/* 숨겨진 실제 input */}
        <div className="absolute inset-0 opacity-0">
          <FormInput
            id={id}
            type="month"
            placeholder=""
            className="border-0 focus:border-0 cursor-pointer"
            onClick={(e) => {
              const target = e.target as HTMLInputElement;
              try {
                target.showPicker?.();
              } catch (error) {
                // showPicker not supported, fallback to default behavior
              }
            }}
            {...register}
          />
        </div>
      </div>
    </div>
  );
}
