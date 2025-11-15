/**
 * 문의 상태 배지 컴포넌트
 */

import { cn } from "@/lib/utils";
import type { InquiryStatus } from "@/types/inquiry";

interface InquiryStatusBadgeProps {
  status: InquiryStatus;
  className?: string;
}

export default function InquiryStatusBadge({ status, className }: InquiryStatusBadgeProps) {
  if (status === "new") {
    return (
      <div
        className={cn(
          "w-24 h-7 rounded-[50px] flex items-center justify-center bg-orange-600/20 text-orange-600 text-xs font-bold font-['Nunito_Sans']",
          className
        )}
      >
        New
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-24 h-7 rounded-[50px] flex items-center justify-center bg-green-500/20 text-green-500 text-xs font-bold font-['Nunito_Sans']",
        className
      )}
    >
      Done
    </div>
  );
}
