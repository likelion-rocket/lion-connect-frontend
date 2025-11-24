/**
 * 문의 상태 배지 컴포넌트
 */

import { cn } from "@/utils/utils";
import type { InquiryStatus } from "@/types/inquiry";

interface InquiryStatusBadgeProps {
  status: InquiryStatus;
  className?: string;
}

export default function InquiryStatusBadge({ status, className }: InquiryStatusBadgeProps) {
  const statusConfig = {
    NEW: {
      label: "New",
      className: "bg-orange-600/20 text-orange-600",
    },
    IN_PROGRESS: {
      label: "In Progress",
      className: "bg-blue-500/20 text-blue-500",
    },
    DONE: {
      label: "Done",
      className: "bg-green-500/20 text-green-500",
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={cn(
        "w-24 h-7 rounded-[50px] flex items-center justify-center text-xs font-bold font-['Nunito_Sans']",
        config.className,
        className
      )}
    >
      {config.label}
    </div>
  );
}
