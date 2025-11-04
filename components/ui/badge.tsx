"use client";

import Image from "next/image";

export type BadgeType = "bootcamp" | "startup" | "certified" | "major";

type BadgeProps = {
  label: string;
  type: BadgeType;
  className?: string;
};

const BADGE_STYLE: Record<BadgeType, string> = {
  bootcamp: "bg-[#FFEEE3] text-[#6B2B00]",
  startup: "bg-[#FFD7B3] text-[#5A1D00]",
  certified: "bg-[#FFAF70] text-[#5A1D00]",
  major: "bg-[#FF6000] text-[#5A1D00]",
};

export default function Badge({ label, type, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm text-[12px] leading-[140%] font-medium px-2 py-1 ${BADGE_STYLE[type]} ${className}`}
    >
      <Image src="/icons/solid-badge-check.svg" alt="check" width={12} height={12} />
      {label}
    </span>
  );
}
