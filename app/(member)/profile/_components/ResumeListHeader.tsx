"use client";

import { cn } from "@/utils/utils";
import Image from "next/image";

interface ResumeListHeaderProps {
  onRegister?: () => void;
  disabled?: boolean;
  className?: string;
}

export function ResumeListHeader({
  onRegister,
  disabled = false,
  className,
}: ResumeListHeaderProps) {
  return (
    <div className={cn("w-full inline-flex justify-between items-center", className)}>
      <h2 className="text-text-primary text-xl font-bold font-ko-body leading-7">
        내 이력서 리스트
      </h2>
      <button
        data-state="default"
        onClick={onRegister}
        disabled={disabled}
        className={cn(
          "pl-4 pr-6 py-2 bg-accent rounded-lg flex justify-center items-center gap-2",
          "hover:bg-brand-06 transition-colors",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        )}
      >
        <Image src="/auth/outline-plus.svg" alt="Plus" width={20} height={20} />
        <span className="text-white text-sm font-bold font-ko-body leading-5">
          {disabled ? "생성 중..." : "이력서 등록"}
        </span>
      </button>
    </div>
  );
}
