"use client";

import { cn } from "@/utils/utils";
import { useState } from "react";
import Image from "next/image";

/**
 * 휴지통 버튼이 있는 입력 컴포넌트
 * 호버 시 테두리와 삭제 버튼이 표시되는 범용 컴포넌트
 */

interface TrashButtonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onDelete?: () => void;
  containerClassName?: string;
  inputClassName?: string;
  width?: string;
}

export default function TrashButtonInput({
  value,
  onDelete,
  containerClassName,
  inputClassName,
  width = "w-80",
  className,
  onBlur,
  ...props
}: TrashButtonInputProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const hasValue = value.trim() !== "";

  return (
    <div
      className={cn(
        width,
        "px-4 bg-white rounded-lg flex justify-start items-center gap-2.5",
        isFocused && "shadow-[0px_4px_6px_-2px_rgba(0,0,0,0.05)]",
        hasValue && "shadow-lg",
        isHovered && hasValue
          ? "min-h-16 py-2 outline outline-1 outline-offset-[-1px] outline-orange-600"
          : "h-16 py-3",
        isHovered && !hasValue && "outline outline-1 outline-offset-[-1px] outline-orange-600",
        containerClassName
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input
        type="text"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          // Controller의 onBlur도 호출
          if (onBlur) {
            onBlur(e);
          }
        }}
        className={cn(
          "flex-1 text-neutral-800 text-base font-normal font-['Pretendard'] leading-6 bg-transparent outline-none placeholder:text-neutral-400",
          inputClassName,
          className
        )}
        {...props}
      />
      {isHovered && hasValue && onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="p-3 bg-orange-50 rounded-lg flex justify-start items-center gap-2.5 hover:bg-orange-100 transition-colors shrink-0"
        >
          <Image src="/icons/outline-trash.svg" alt="삭제" width={24} height={24} />
        </button>
      )}
    </div>
  );
}
