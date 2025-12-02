/**
 * MonthRangePicker - 기간 선택용 Month Picker 컴포넌트
 *
 * 시작일 ~ 종료일 형태의 month picker UI 제공
 * - 커스텀 UI로 YYYY.MM ~ YYYY.MM 형태 표시
 * - 숨겨진 네이티브 input으로 실제 동작 처리
 * - React Hook Form 연동 지원
 */

"use client";

import { FormInput } from "@/components/form/FormInput";
import type { UseFormRegisterReturn } from "react-hook-form";

interface MonthRangePickerProps {
  startValue?: string;
  endValue?: string;
  startRegister: UseFormRegisterReturn;
  endRegister: UseFormRegisterReturn;
  startId?: string;
  endId?: string;
  className?: string;
}

// YYYY-MM 형식을 YYYY.MM 형식으로 변환
function formatMonthDisplay(value?: string): string {
  if (!value) return "YYYY.MM";
  return value.replace("-", ".");
}

export function MonthRangePicker({
  startValue,
  endValue,
  startRegister,
  endRegister,
  startId,
  endId,
  className,
}: MonthRangePickerProps) {
  return (
    <div className={className}>
      <div className="relative h-14 md:h-16 bg-bg-primary rounded-lg px-4 flex items-center gap-2">
        {/* 커스텀 UI 표시 레이어 */}
        <div className="flex items-center gap-2 pointer-events-none">
          <span className={startValue ? "text-text-primary" : "text-text-tertiary"}>
            {formatMonthDisplay(startValue)}
          </span>
          <span className="text-text-tertiary">~</span>
          <span className={endValue ? "text-text-primary" : "text-text-tertiary"}>
            {formatMonthDisplay(endValue)}
          </span>
        </div>

        {/* 숨겨진 실제 input들 */}
        <div className="absolute inset-0 flex items-center gap-1 opacity-0">
          <FormInput
            id={startId}
            type="month"
            placeholder=""
            className="border-0 focus:border-0 w-[85px] cursor-pointer"
            onClick={(e) => {
              const target = e.target as HTMLInputElement;
              try {
                target.showPicker?.();
              } catch (error) {
                // showPicker not supported, fallback to default behavior
              }
            }}
            {...startRegister}
          />
          <span className="text-text-tertiary">~</span>
          <FormInput
            id={endId}
            type="month"
            placeholder=""
            className="border-0 focus:border-0 w-[85px] cursor-pointer"
            onClick={(e) => {
              const target = e.target as HTMLInputElement;
              try {
                target.showPicker?.();
              } catch (error) {
                // showPicker not supported, fallback to default behavior
              }
            }}
            {...endRegister}
          />
        </div>
      </div>
    </div>
  );
}
