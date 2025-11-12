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
    <tr
      className="border-b border-border-quaternary hover:bg-bg-tertiary/50 transition-colors cursor-pointer h-[73px]"
      onClick={onClick}
    >
      {/* 담당자명 */}
      <td className="px-4 text-sm text-text-primary truncate h-[73px]">{inquiry.companyName}</td>

      {/* 회사명 */}
      <td className="px-4 text-sm text-text-primary truncate h-[73px]">{inquiry.position}</td>

      {/* 전화번호 */}
      <td className="px-4 text-sm text-text-secondary truncate h-[73px]">{inquiry.attribute}</td>

      {/* 이메일(ID) */}
      <td className="px-4 text-sm text-text-secondary truncate h-[73px]">{inquiry.description}</td>

      {/* 부서 / 직책 */}
      <td className="px-4 text-sm text-text-secondary truncate h-[73px]">{inquiry.category}</td>

      {/* 문의 내용 (말줄임표 처리) */}
      <td className="px-4 text-sm text-text-secondary h-[73px]">
        <p className="line-clamp-2">{inquiry.content}</p>
      </td>

      {/* 문의 상태 */}
      <td className="px-4 h-[73px]">
        <InquiryStatusBadge status={inquiry.status} />
      </td>
    </tr>
  );
}
