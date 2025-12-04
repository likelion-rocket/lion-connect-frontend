import { cn } from "@/utils/utils";
import React from "react";

export interface SignupTypeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon: React.ReactNode;
  onSignup: () => void;
}

export function SignupTypeCard({
  title,
  icon,
  onSignup,
  className,
  ...props
}: SignupTypeCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-8 rounded-lg border border-border-quaternary bg-bg-primary px-12 py-8 w-[275px]",
        className
      )}
      {...props}
    >
      {/* 제목 */}
      <p className="text-text-primary text-3xl font-medium text-center">{title}</p>

      {/* 아이콘 */}
      <div className="size-[140px] flex items-center justify-center rounded-full bg-bg-tertiary">
        {icon}
      </div>

      {/* 가입 버튼 */}
      <button
        onClick={onSignup}
        className="w-full cursor-pointer h-12 rounded-lg bg-bg-accent hover:bg-brand-06 transition-colors font-bold text-lg text-text-inverse-primary"
      >
        가입하기
      </button>
    </div>
  );
}
