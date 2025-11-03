"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Input from "@/components/ui/input";

type PortfolioProps = {
  onFileSelect?: (value: string) => void;
};

export default function PortfolioComponent({ onFileSelect }: PortfolioProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");

  // 파일 선택 열기
  const handleOpenFileDialog = () => {
    fileInputRef.current?.click();
  };

  // 파일 선택 시 이름 반영
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      let name = file.name;
      if (!name.toLowerCase().endsWith(".pdf")) {
        const baseName = name.replace(/\.[^/.]+$/, "");
        name = `${baseName}.pdf`;
      }
      setFileName(name);
    }
  };

  // 값이 바뀔 때마다 부모에게 알려주기
  useEffect(() => {
    onFileSelect?.(fileName);
  }, [fileName, onFileSelect]);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 섹션 타이틀 */}
      <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
        <span>포트폴리오</span>
        <span className="text-status-error">*</span>
      </div>

      {/* 숨겨진 파일 input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf"
        onChange={handleFileChange}
      />

      {/* 아이콘 + 제목 라인 */}
      <div className="grid grid-cols-[48px_auto] gap-x-4">
        {/* 아이콘 */}
        <div className="w-12 h-12 rounded-md bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center">
          <Image src="/icons/outline-paper-clip.svg" alt="attachment" width={24} height={24} />
        </div>
        {/* 제목 */}
        <div className="flex items-center justify-between h-12 text-[16px] font-semibold text-text-primary">
          <span>포트폴리오 첨부</span>
        </div>
        {/* 아래 줄: 인풋 하나만 */}
        <div /> {/* 아이콘 자리 맞추기 */}
        <div className="mt-4 w-full">
          <div onClick={handleOpenFileDialog} className="cursor-pointer">
            <Input
              placeholder="pdf."
              type="text"
              className="w-full cursor-pointer"
              readOnly
              value={fileName}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
