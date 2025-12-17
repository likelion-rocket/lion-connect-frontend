"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  onBack?: () => void;
}

export default function BackButton({ onBack }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleBack}
      className="h-14 pr-8 w-full cursor-pointer inline-flex justify-start items-center gap-1"
    >
      <div className="w-36 flex justify-start items-center gap-4">
        <div className="w-6 h-6 relative overflow-hidden">
          <Image src="/icons/outline-cheveron-left.svg" alt="이전" width={24} height={24} />
        </div>
        <div className="flex-1 h-5 relative">
          <div className="left-0 top-[-3.20px] absolute justify-center text-neutral-500 text-base font-normal font-['Pretendard'] leading-6">
            이전 페이지
          </div>
        </div>
      </div>
    </button>
  );
}
