"use client";

import Image from "next/image";

export function ScoutNotice() {
  return (
    <div className="self-stretch px-6 py-4 bg-neutral-100 rounded-lg inline-flex justify-start items-center gap-4">
      <div className="w-5 h-5 relative overflow-hidden">
        <Image src="/icons/solid-exclamation-circle-green.svg" alt="chat" width={20} height={20} />
      </div>
      <div className="justify-start text-green-500 text-sm font-medium font-['Pretendard'] leading-5">
        이력서를 공개하면 기업으로부터 스카우트 제안을 받을 수 있습니다.
      </div>
    </div>
  );
}
