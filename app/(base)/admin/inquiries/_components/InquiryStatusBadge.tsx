/**
 * 문의 상태 배지 컴포넌트
 */

import type { InquiryStatus } from "@/types/inquiry";

interface InquiryStatusBadgeProps {
  status: InquiryStatus;
  className?: string;
}

const STATUS_CONFIG: Record<InquiryStatus, { label: string; className: string }> = {
  new: {
    label: "New",
    className: "bg-[#FFF3EB] text-text-accent border border-border-accent",
  },
  done: {
    label: "Done",
    className: "bg-[#E8F5E9] text-[#2E7D32] border border-[#4CAF50]",
  },
};

export default function InquiryStatusBadge({ status, className = "" }: InquiryStatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-medium ${config.className} ${className}`}
    >
      {config.label}
    </span>
  );
}
