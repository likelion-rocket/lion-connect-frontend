/**
 * 문의 리스트 아이템 컴포넌트
 */

import type { Inquiry } from "@/types/inquiry";
import InquiryStatusBadge from "./InquiryStatusBadge";

interface InquiryListItemProps {
  inquiry: Inquiry;
  onClick?: () => void;
}

export default function InquiryListItem({ inquiry, onClick }: InquiryListItemProps) {
  return (
    <div
      className="h-[79px] px-4 py-2 bg-bg-primary border-b-2 border-bg-quaternary flex items-center gap-4 transition-colors cursor-pointer hover:bg-brand-01 hover:shadow-[0px_4px_6px_-2px_rgba(0,0,0,0.05)]"
      onClick={onClick}
    >
      {/* 담당자명 */}
      <p className="w-20 text-text-primary text-sm leading-5 truncate">{inquiry.contactPerson}</p>

      {/* 회사명 */}
      <p className="w-20 text-text-primary text-sm leading-5 truncate">{inquiry.companyName}</p>

      {/* 전화번호 */}
      <p className="w-24 text-text-primary text-sm leading-5 truncate">{inquiry.phoneNumber}</p>

      {/* 이메일 */}
      <p className="w-24 text-text-primary text-sm leading-5 truncate">{inquiry.email}</p>

      {/* 부서 / 직책 */}
      <p className="w-36 text-text-primary text-sm leading-5 truncate">{inquiry.department}</p>

      {/* 문의 내용 (3줄까지 보이도록 말줄임) */}
      <p className="flex-1 max-w-80 max-h-16 text-text-primary text-sm leading-5 line-clamp-3">
        {inquiry.content}
      </p>

      {/* 문의 상태 */}
      <InquiryStatusBadge status={inquiry.status} />
    </div>
  );
}
