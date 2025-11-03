"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Input from "@/components/ui/input";
import { Plus } from "lucide-react";

export default function PhotoComponent() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");

  // 파일창 열기
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // 파일 선택했을 때
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase();
    const allowed = ["jpg", "jpeg", "png"];

    if (!ext || !allowed.includes(ext)) {
      alert("jpg 또는 png 파일만 업로드할 수 있습니다.");
      // 선택 취소
      e.target.value = "";
      return;
    }

    setFileName(file.name);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 섹션 타이틀 */}
      <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
        <span>프로필 사진</span>
      </div>

      {/* 숨겨진 input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".jpg,.jpeg,.png"
        onChange={handleFileChange}
      />

      {/* 본문 레이아웃 */}
      <div className="grid grid-cols-[48px_auto] gap-x-4">
        {/* 아이콘 */}
        <div className="w-12 h-12 rounded-md bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center">
          <Image src="/icons/outline-camera.svg" alt="camera" width={24} height={24} />
        </div>

        {/* 오른쪽 내용 */}
        <div className="flex items-center justify-between gap-6">
          {/* 입력창 영역 */}
          <div onClick={openFileDialog} className="flex-1 cursor-pointer">
            <Input
              readOnly
              type="text"
              value={fileName}
              placeholder="jpg / png 파일을 업로드 해주세요. (사진 파일 업로드하면 사진 제목이 여기 보입니다)"
              className="w-full bg-[#F6F6F6] text-[14px] text-[#6B7280] cursor-pointer"
            />
          </div>

          {/* 추가 버튼 */}

          <button
            type="button"
            onClick={openFileDialog}
            className="flex items-center gap-2 text-[#FF6000] hover:opacity-80 font-bold text-[16px] leading-none"
          >
            <Plus size={20} className="text-[#FF6000]" />
            <span>사진 추가</span>
          </button>
        </div>
      </div>
    </section>
  );
}
