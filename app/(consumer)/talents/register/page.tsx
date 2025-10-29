"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import IntroComponent from "@/app/(consumer)/talents/register/components/IntroComponent";
import CodeRegisterComponent from "@/app/(consumer)/talents/register/components/CodeRegisterComponent";
import ProfileComponent from "./components/ProfileComponent";

export default function RegisterTalent() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="w-full text-black border-b border-border-quaternary mt-8">
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

      <main className="py-8 flex flex-col gap-10 mx-40">
        {/* 인적 사항 섹션 */}
        <IntroComponent />
        <CodeRegisterComponent />
        <ProfileComponent />

        {/* 이후 다른 섹션들... */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-text-secondary text-sm">
            {/* placeholder for next section */}
            여기에 다음 섹션이 들어갑니다...
          </div>
        </section>
      </main>
    </div>
  );
}
