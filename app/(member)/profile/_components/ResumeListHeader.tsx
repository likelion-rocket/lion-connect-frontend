"use client";

import { cn } from "@/utils/utils";
import { Plus } from "lucide-react";

interface ResumeListHeaderProps {
  onRegister?: () => void;
  className?: string;
}

export function ResumeListHeader({ onRegister, className }: ResumeListHeaderProps) {
  return (
    <div className={cn("w-full inline-flex justify-between items-center", className)}>
      <h2 className="text-text-primary text-xl font-bold font-ko-body leading-7">
        내 이력서 리스트
      </h2>
      <button
        data-state="default"
        onClick={onRegister}
        className="pl-4 pr-6 py-2 cursor-pointer bg-accent rounded-lg flex justify-center items-center gap-2 hover:bg-brand-06 transition-colors"
      >
        <Plus className="w-6 h-6 text-white stroke-[2.5]" />
        <span className="text-white text-sm font-bold font-ko-body leading-5">이력서 등록</span>
      </button>
    </div>
  );
}
