// components/ui/chip.tsx
import { cn } from "@/lib/utils";

type ChipVariant = "tendency" | "skill";

type ChipProps = {
  children: React.ReactNode;
  variant?: ChipVariant;
  className?: string;
};

export function Chip({ children, variant = "tendency", className }: ChipProps) {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-[12px] font-medium whitespace-nowrap";

  const styles =
    variant === "tendency"
      ? // 사진1 스타일: 옅은 회색 배경 + 테두리
        "bg-white border border-border-quaternary text-[#555]"
      : // 사진2 ‘연한 주황’ 스타일: 배경만 연한 주황, 테두리 없음
        "bg-[#FFEEE3] text-[#6B2B00]"; // 프로젝트 톤에 맞춰 필요시 색상 조절

  return <span className={cn(base, styles, className)}>{children}</span>;
}
