// app/(base)/talents/register/_components/CodeRegisterComponent.tsx
"use client";

import Image from "next/image";
import Input from "@/components/ui/input";

type Props = {
  code: string; // ✅ 필수로 받도록
  onCodeChange?: (v: string) => void;
};

export default function CodeRegisterComponent({ code, onCodeChange }: Props) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-[18px] font-bold text-text-primary mb-8">
        멋사 수료생 인재 등록 코드 입력
      </div>

      <div className="flex flex-wrap items-start gap-8">
        <div className="flex items-center gap-5">
          <Image src="/icons/outline-qrcode.svg" alt="qrcode" width={24} height={24} />
          <Input
            placeholder="인재 코드를 입력해 주세요."
            type="text"
            className="min-w-[140px]"
            value={code}
            onChange={(e) => onCodeChange?.(e.target.value)}
            hideClear
          />
        </div>
      </div>
    </section>
  );
}
