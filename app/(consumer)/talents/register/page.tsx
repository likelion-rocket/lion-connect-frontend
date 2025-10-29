"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterTalent() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="w-full text-black border-b border-border-quaternary">
      {/* Header와 동일한 마진/패딩 구조 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* 왼쪽 영역: 이전 페이지 */}
        <button
          onClick={handleGoBack}
          className="flex items-center gap-1 hover:opacity-80 transition"
        >
          <Image src="/icons/outline-cheveron-left.svg" alt="back" width={24} height={24} />
          <span className="text-lg font-bold text-black">이전 페이지</span>
        </button>

        {/* 오른쪽 영역: 임시 저장 + 작성 완료 */}
        <div className="flex items-center gap-3">
          {/* <Image src="/icons/outline-book-open.svg" alt="save" width={24} height={24} />
          <Image src="/icons/outline-inbox-in.svg" alt="complete" width={24} height={24} /> */}
          <button className="px-4 py-2 rounded-full bg-white text-black text-sm font-semibold border border-border-quaternary">
            임시 저장
          </button>
          <button className="px-4 py-2 rounded-full bg-[#FF6000] text-white text-sm font-semibold border border-border-quaternary">
            작성 완료
          </button>
        </div>
      </div>

      {/* 아래 실제 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-black">RegisterTalent 페이지 내용이 여기에 들어갑니다.</p>
      </div>
    </div>
  );
}
