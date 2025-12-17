"use client";

import { cn } from "@/utils/utils";

interface PublicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isPublic: boolean;
}
//disabled 상태일 때는 버튼 비활성화, 활성화 상태일 때는 버튼 활성화
//isPublic 상태일 때는 버튼 활성화디자인, 비활성화 상태일 때는 버튼 비활성화디자인

export function PublicButton({
  isPublic,
  className,
  children,
  disabled,
  ...props
}: PublicButtonProps) {
  return (
    <button
      data-type={disabled ? "disable" : isPublic ? "active" : "default"}
      disabled={disabled}
      className={cn(
        "w-28 px-6 py-2 cursor-pointer rounded-lg outline outline-[#d4d4d4] outline-offset-[-1px] text-[#737373]",
        "inline-flex justify-center items-center overflow-hidden",
        "text-xs font-bold font-ko-body leading-4 transition-colors",
        disabled && " cursor-not-allowed text-[#d4d4d4] outline-border-quaternary",
        !disabled &&
          isPublic &&
          "bg-accent text-white outline-border-quaternary hover:bg-accent/90",
        !disabled && !isPublic && "hover:bg-gray-50 hover:text-gray-900",
        className
      )}
      {...props}
    >
      {children || (isPublic ? "공개 중" : "공개하기")}
    </button>
  );
}
