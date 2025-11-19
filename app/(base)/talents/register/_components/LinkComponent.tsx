// app/(base)/talents/register/_components/LinkComponent.tsx
"use client";

import Image from "next/image";
import Input from "@/components/ui/input";
import { Plus } from "lucide-react";

type LinkRow = {
  type: string;
  url: string;
};

type RegisterLinkProps = {
  links: LinkRow[];
  onChangeLink: (index: number, value: string) => void;
  onAddLink: () => void;
  onDeleteLink: (index: number) => void;
};

export default function RegisterLink({
  links,
  onChangeLink,
  onAddLink,
  onDeleteLink,
}: RegisterLinkProps) {
  // 🔥 휴지통 클릭 로직
  const handleClickDelete = (index: number) => {
    if (links.length > 1) {
      // 인풋 여러 개면 해당 행 삭제
      onDeleteLink(index);
    } else {
      // 인풋이 하나뿐이면 값만 비우기
      onChangeLink(index, "");
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. 제목 */}
      <div className="text-[18px] font-bold text-text-primary mb-8">링크</div>

      {/* 2. 아이콘 + 소제목 */}
      <div className="grid grid-cols-[48px_auto] gap-x-4">
        {/* 왼쪽 아이콘 */}
        <div className="w-12 h-12 rounded-md bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center">
          <Image src="/icons/outline-paper-clip.svg" alt="link" width={24} height={24} />
        </div>
        {/* 오른쪽 소제목 */}
        <div className="flex items-center h-12 text-[16px] font-semibold text-text-primary">
          링크
        </div>
        {/* 3. 인풋 리스트 */}
        <div /> {/* 들여쓰기용 빈칸 */}
        <div className="mt-4 w-full">
          {links.map((link, idx) => (
            <div
              key={link.type || `link-${idx}`}
              className={`flex items-center gap-3 ${idx > 0 ? "mt-4" : ""}`}
            >
              {/* 인풋 */}
              <div className="flex-1">
                <Input
                  value={link.url}
                  onChange={(e) => onChangeLink(idx, e.target.value)}
                  placeholder="https:// 또는 포트폴리오, 깃허브, 노션 링크를 입력하세요"
                  className="w-full h-12 bg-[#F5F5F5] border-border-quaternary rounded-md text-[14px]"
                  // ✅ 내부 휴지통/클리어 아이콘은 끔
                  showClearWhenFilled={false}
                />
              </div>

              {/* ✅ Input 안에 있던 그 디자인의 휴지통을 밖으로 뺀 버튼 */}
              <button
                type="button"
                onClick={() => handleClickDelete(idx)}
                className="inline-flex items-center gap-2 rounded-sm border border-[#FF6000]/20 bg-[#FFF3EB] px-2 py-1 text-[#FF6000] hover:opacity-90"
              >
                <Image
                  src="/icons/outline-trash.svg" // ⬅️ Input 안에서 쓰던 휴지통 아이콘 경로로 맞춰줘
                  alt="링크 삭제"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. 링크 추가 버튼 */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={onAddLink}
          className="flex items-center gap-2 text-[#FF6000] hover:opacity-80 font-bold text-[16px] leading-none"
        >
          <Plus size={20} className="text-[#FF6000]" />
          <span>링크 추가</span>
        </button>
      </div>
    </section>
  );
}
