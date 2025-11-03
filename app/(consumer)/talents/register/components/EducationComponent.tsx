"use client";

import Image from "next/image";
import Input from "@/components/ui/input";

export default function EducationComponent() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 섹션 타이틀 */}
      <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
        <span>학력</span>
      </div>

      {/* 아이콘 + 내용 그리드 (이전 컴포넌트들이랑 동일 패턴) */}
      <div className="grid grid-cols-[48px_auto] gap-x-4">
        {/* 왼쪽 아이콘 박스 */}
        <div className="w-12 h-12 rounded-md bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center">
          <Image src="/icons/outline-library.svg" alt="library" width={24} height={24} />
        </div>

        {/* 오른쪽 제목 줄 */}
        <div className="flex items-center justify-between h-12 text-[16px] font-semibold text-text-primary">
          <span>학교</span>
        </div>

        {/* 들여쓰기용 빈칸 */}
        <div />

        {/* 1) 학교명 */}
        <div className="mt-4 mb-3">
          <Input placeholder="학교명을 입력하세요" type="text" className="w-full" />
        </div>

        {/* 들여쓰기용 빈칸 */}
        <div />

        {/* 2) 재학 기간 */}
        <div className="mb-3">
          <Input placeholder="0000.mm - 0000.mm (0년 0개월)" type="text" className="w-full" />
        </div>

        {/* 들여쓰기용 빈칸 */}
        <div />

        {/* 3) 졸업 상태 + 전공학위 (2칸) */}
        <div className="mb-3 flex gap-4 w-full">
          <Input placeholder="졸업 상태" type="text" className="w-full" />
          <Input placeholder="전공학위" type="text" className="w-full" />
        </div>

        {/* 들여쓰기용 빈칸 */}
        <div />

        {/* 4) 학교 활동 */}
        <div className="mb-3">
          <Input
            placeholder="학교에서 무슨 활동을 했는지 적어주세요"
            type="text"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
