"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Input from "@/components/ui/input";
import { Plus } from "lucide-react";

export default function PortfolioComponent() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileNames, setFileNames] = useState<string[]>([""]); // 기본 1줄

  // 파일 선택 열기
  const handleOpenFileDialog = (index: number) => {
    if (fileInputRef.current) {
      fileInputRef.current.dataset.index = String(index);
      fileInputRef.current.click();
    }
  };

  // 파일 선택 시 이름 반영
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const index = Number(e.target.dataset.index ?? 0);
    if (file) {
      let name = file.name;
      // 확장자 .pdf로 보이게 맞춤
      if (!name.toLowerCase().endsWith(".pdf")) {
        const baseName = name.replace(/\.[^/.]+$/, "");
        name = `${baseName}.pdf`;
      }
      const updated = [...fileNames];
      updated[index] = name;
      setFileNames(updated);
    }
  };

  // 링크(=행) 추가
  const handleAddInput = () => {
    setFileNames((prev) => [...prev, ""]);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 섹션 타이틀 */}
      <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
        <span>포트폴리오</span>
        <span className="text-status-error">*</span>
      </div>

      {/* 실제 파일 input (hidden) */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf"
        onChange={handleFileChange}
      />

      {/* 본문: 아이콘 + 내용 (예전 RegisterPortfolio 그대로) */}
      <div className="grid grid-cols-[48px_auto] gap-x-4">
        {/* 왼쪽 아이콘 */}
        <div className="w-12 h-12 rounded-[6px] bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center">
          <Image src="/icons/outline-paper-clip.svg" alt="attachment" width={24} height={24} />
        </div>
        {/* 오른쪽: 타이틀 + 버튼 */}
        <div className="flex items-center justify-between h-12 text-[16px] font-semibold text-text-primary">
          <span>포트폴리오 첨부</span>
        </div>
        {/* 아래 줄: 인풋들 */}
        <div /> {/* 아이콘 자리 비우기 */}
        <div className="mt-4 w-full">
          {fileNames.map((name, index) => (
            <div
              key={index}
              onClick={() => handleOpenFileDialog(index)}
              className="cursor-pointer mb-4 last:mb-0"
            >
              <Input
                placeholder="pdf."
                type="text"
                className="w-full cursor-pointer"
                readOnly
                value={name}
              />
            </div>
          ))}
        </div>
      </div>
      {/* 4. 파일 추가 버튼 */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleAddInput}
          className="flex items-center gap-2 text-[#FF6000] hover:opacity-80 font-bold text-[16px] leading-none"
        >
          <Plus size={20} className="text-[#FF6000]" />
          <span>파일 추가</span>
        </button>
      </div>
    </section>
  );
}
