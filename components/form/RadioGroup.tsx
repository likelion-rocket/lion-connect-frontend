/**
 * RadioGroup - 라디오 버튼 그룹 컴포넌트
 * React Hook Form과 연동 가능한 라디오 버튼 그룹
 */

"use client";

import { cn } from "@/utils/utils";

export interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
}

export function RadioGroup({ options, value, onChange, error }: RadioGroupProps) {
  return (
    <div className="self-stretch inline-flex justify-start items-start gap-3">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange?.(option.value)}
          className={cn(
            "flex-1 p-3 bg-white rounded-lg outline outline-[0.80px] outline-offset-[-0.80px]",
            "flex justify-start items-center gap-4 overflow-hidden",
            "transition-colors hover:bg-neutral-50",
            value === option.value
              ? "outline-neutral-800"
              : "outline-neutral-200",
            error && "outline-red-500"
          )}
        >
          {/* 라디오 버튼 아이콘 */}
          <div
            data-selection={value === option.value ? "on" : "off"}
            data-states="enabled"
            className="w-6 h-6 relative flex items-center justify-center"
          >
            {value === option.value ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="5"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            )}
          </div>

          {/* 라벨 */}
          <div className="px-1 flex justify-start items-center">
            <div className="justify-start text-neutral-800 text-sm font-normal font-['Pretendard'] leading-5">
              {option.label}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
