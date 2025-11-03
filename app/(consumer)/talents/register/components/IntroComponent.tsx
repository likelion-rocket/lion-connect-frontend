"use client";

import Image from "next/image";
import Input from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const EXPERIENCES = [
  { id: "bootcamp", label: "부트캠프 경험자" },
  { id: "startup", label: "창업 경험자" },
  { id: "certificate", label: "자격증 보유자" },
  { id: "major", label: "전공자" },
];

export default function IntroComponent() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 섹션 타이틀 */}
      <div className="mb-8">
        <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
          <span>인적 사항</span>
        </div>
      </div>

      {/* 1️⃣ 인적 사항 블록 */}
      <div className="grid grid-cols-[48px_auto] gap-x-4">
        {/* 아이콘 */}
        <div className="w-12 h-12 rounded-[6px] bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center">
          <Image src="/icons/outline-user-circle.svg" alt="user-circle" width={24} height={24} />
        </div>

        {/* 타이틀 */}
        <div className="flex items-center justify-between h-12 text-[16px] font-semibold text-text-primary">
          <span>이름</span>
        </div>

        {/* 아이콘 자리 채움용 */}
        <div />

        {/* 인풋 세트 */}
        <div className="mt-4 mb-6">
          <div className="flex items-center justify-start gap-20">
            {/* 이름 */}
            <div className="flex items-center gap-4">
              <Image src="/icons/outline-user.svg" alt="user" width={20} height={20} />
              <Input
                type="text"
                placeholder="이름을 입력하세요"
                className="text-[14px] text-[#1c1c1c]"
              />
            </div>

            {/* 전화번호 */}
            <div className="flex items-center gap-4">
              <Image src="/icons/outline-phone.svg" alt="phone" width={20} height={20} />
              <span className="text-[14px] text-[#9CA3AF] font-normal">010 0000 0000</span>
            </div>

            {/* 이메일 */}
            <div className="flex items-center gap-4">
              <Image src="/icons/outline-mail.svg" alt="mail" width={20} height={20} />
              <span className="text-[14px] text-[#9CA3AF] font-normal">email@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2️⃣ 관련 경험 선택 블록 */}
      <div className="grid grid-cols-[48px_auto] gap-x-4">
        {/* 아이콘 */}
        <div className="w-12 h-12 rounded-[6px] bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center">
          <Image src="/icons/outline-pencil-alt.svg" alt="pencil-alt" width={24} height={24} />
        </div>

        {/* 타이틀 */}
        <div className="flex items-center justify-between h-12 text-[16px] font-semibold text-text-primary">
          <span>관련 경험 선택</span>
        </div>

        {/* 아이콘 자리 채움용 */}
        <div />

        {/* 체크박스 */}
        <div className="mt-4 mb-2 flex flex-wrap gap-[140px]">
          {EXPERIENCES.map((item) => (
            <label
              key={item.id}
              className="inline-flex items-center gap-3 cursor-pointer select-none"
            >
              <Checkbox />
              <span className="text-[14px] font-medium text-[#1c1c1c]">{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}
