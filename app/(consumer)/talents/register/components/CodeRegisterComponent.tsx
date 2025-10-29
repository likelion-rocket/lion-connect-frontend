//코드 등록하는 컴포넌트
"use client";

import Image from "next/image";
import Input from "@/components/ui/input";

export default function CodeRegisterComponent() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      {/* 섹션 타이틀 */}
      <div className="text-[18px] font-bold text-text-primary mb-8">
        멋사 수료생 인재 등록 코드 입력
      </div>

      {/* 인풋 행 */}
      <div className="flex flex-wrap items-start gap-8">
        {/* 이름 */}
        <div className="flex items-center gap-5">
          <Image src="/icons/outline-user.svg" alt="user" width={20} height={20} />
          <Input placeholder="이름" type="text" className="min-w-[140px]" />
        </div>

        {/* 인재 코드 */}
        <div className="flex items-center gap-5">
          <Image src="/icons/outline-qrcode.svg" alt="qrcode" width={20} height={20} />
          <Input placeholder="인재 코드를 입력해 주세요." type="text" className="min-w-[140px]" />
        </div>
      </div>
    </section>
  );
}
