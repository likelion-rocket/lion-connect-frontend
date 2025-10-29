"use client";

import Image from "next/image";
import Input from "@/components/ui/input";
import Badge from "@/components/ui/badge";

export default function IntroComponent() {
  const badges = ["부트캠프 수료자", "자격증 보유자", "창업 경험자", "전공자"];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      {/* 섹션 타이틀 + 배지들 */}
      <div className="mb-8">
        <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
          <span>인적 사항</span>
          <span className="text-status-error">*</span>
        </div>

        <div className="flex flex-wrap gap-4">
          {badges.map((label) => (
            <Badge key={label} label={label} />
          ))}
        </div>
      </div>

      {/* 인풋 세트 */}
      <div className="flex flex-wrap items-start gap-8">
        {/* 전화번호 */}
        <div className="flex items-center gap-5">
          <Image src="/icons/outline-phone.svg" alt="phone" width={24} height={24} />
          <Input placeholder="+821012345678" type="text" />
        </div>

        {/* 이름 */}
        <div className="flex items-center gap-5">
          <Image src="/icons/outline-user.svg" alt="user" width={24} height={24} />
          <Input placeholder="이름" type="text" className="min-w-[140px]" />
        </div>

        {/* 이메일 */}
        <div className="flex items-center gap-5">
          <Image src="/icons/outline-mail.svg" alt="mail" width={24} height={24} />
          <Input placeholder="email@gmail.com" type="email" />
        </div>
      </div>
    </section>
  );
}
