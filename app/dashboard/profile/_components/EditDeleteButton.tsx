"use client";

import { cn } from "@/utils/utils";

interface EditDeleteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "edit" | "delete";
}

export function EditDeleteButton({
  variant = "edit",
  className,
  children,
  ...props
}: EditDeleteButtonProps) {
  return (
    <button
      data-state="default"
      data-type={variant}
      className={cn(
        "w-28 px-6 py-2 cursor-pointer rounded-lg outline outline-1 outline-offset-[-1px] outline-border-quaternary text-[#737373]",
        "inline-flex justify-center items-center overflow-hidden",
        "text-xs font-bold font-ko-body leading-4 transition-colors",
        "hover:bg-gray-50 hover:text-gray-900",
        className
      )}
      {...props}
    >
      {children || (variant === "edit" ? "수정하기" : "삭제하기")}
    </button>
  );
}
