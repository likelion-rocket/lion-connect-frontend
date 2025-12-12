"use client";

import { cn } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";

interface JobListHeaderProps {
  disabled?: boolean;
  className?: string;
}

export function JobListHeader({ disabled = false, className }: JobListHeaderProps) {
  return (
    <div className={cn("w-full py-[72px] inline-flex justify-between items-center", className)}>
      <h2 className="text-text-primary text-2xl font-bold font-ko-body leading-8">
        채용 공고 관리
      </h2>
      <Link
        href="/jobs/new"
        data-state="default"
        aria-disabled={disabled}
        className={cn(
          "pl-4 pr-6 py-2 bg-accent rounded-lg flex justify-center items-center gap-4",
          "hover:bg-brand-06 transition-colors",
          disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer"
        )}
      >
        <Image src="/auth/outline-plus.svg" alt="Plus" width={24} height={24} />
        <span className="text-white text-sm font-bold font-ko-body leading-5">
          {disabled ? "생성 중..." : "공고 등록"}
        </span>
      </Link>
    </div>
  );
}
