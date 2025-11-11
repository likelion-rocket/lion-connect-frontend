"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        // 레이어 정리용
        "group relative inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border overflow-visible",
        // 기본
        "border-[#D0D5DD] bg-white",
        // 포커스
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF6000]/40",
        // 체크됐을 때(최종 상태) → 동그란 배경 없이 주황 네모만
        "data-[state=checked]:border-[#FF6000] data-[state=checked]:bg-[#FF6000]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {/* 1) 호버 때만 보이는 연한 주황 원형 배경 */}
      <span
        className={cn(
          "absolute -inset-2 rounded-full bg-[#FFE6D6] z-0",
          "opacity-0 transition duration-150",
          // hover 시 보이게
          "group-hover:opacity-100",
          // 체크되면 안 보이게
          "data-[state=checked]:opacity-0"
        )}
      />

      {/* 2) 호버 때만 보이는 '가짜' 체크박스 + 아이콘 */}
      <span
        className={cn(
          // 안쪽 네모
          "absolute z-10 flex h-5 w-5 items-center justify-center rounded-sm bg-[#FF6000] text-white",
          // 기본은 안 보임
          "opacity-0 scale-90 transition duration-150",
          // hover하면 보임
          "group-hover:opacity-100 group-hover:scale-100",
          // 근데 실제로 체크되면 이건 숨김 (→ 진짜 체크박스만 남김)
          "data-[state=checked]:opacity-0"
        )}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>

      {/* 3) 실제 체크됐을 때 나오는 '진짜' Indicator */}
      <CheckboxPrimitive.Indicator
        className={cn(
          "relative z-20 flex items-center justify-center text-white",
          "transition duration-150"
        )}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
