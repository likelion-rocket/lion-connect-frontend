"use client";

type BadgeProps = {
  label: string;
  className?: string;
};

export default function Badge({ label, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-block rounded-[4px] bg-[#FFE1CC] text-[#6B2B00] text-[12px] leading-[140%] font-medium px-2 py-1 ${className}`}
    >
      {label}
    </span>
  );
}
