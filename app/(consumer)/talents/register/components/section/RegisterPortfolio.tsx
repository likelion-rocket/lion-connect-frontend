//포트폴리오 등록하는 섹션
//포트 폴리오 컴포넌트(포트폴리와 직무 선택을 하는 컴포넌트)
//자신과 관련된 SNS 및 깃허브 링크를 등록하는 컴포넌트
"use client";

import Image from "next/image";
import Input from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";

export default function RegisterPorfolio() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileNames, setFileNames] = useState<string[]>([""]); // 첫 번째 인풋 1개 기본

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
      if (!name.toLowerCase().endsWith(".pdf")) {
        const baseName = name.replace(/\.[^/.]+$/, "");
        name = `${baseName}.pdf`;
      }
      const updated = [...fileNames];
      updated[index] = name;
      setFileNames(updated);
    }
  };

  // 🔥 링크 추가 버튼 클릭 시 새로운 Input 추가
  const handleAddInput = () => {
    setFileNames([...fileNames, ""]);
  };

  return (
    <section>
      {/* 실제 파일 input (hidden) */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf"
        onChange={handleFileChange}
      />

      {/* 첫 번째 줄: 아이콘 + 포트폴리오 첨부 */}
      <div className="grid grid-cols-[48px_auto] gap-x-4">
        {/* 왼쪽: 클립 아이콘 */}
        <div className="w-12 h-12 rounded-[6px] bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center">
          <Image src="/icons/outline-paper-clip.svg" alt="attachment" width={24} height={24} />
        </div>
        {/* 오른쪽: 라벨 + 버튼 (양쪽 끝 배치) */}
        <div className="flex items-center justify-between h-12 text-[16px] font-semibold text-text-primary">
          <span>포트폴리오 첨부</span>

          <button
            type="button"
            onClick={handleAddInput}
            className="flex items-center gap-2 text-[#FF6000] hover:opacity-80 font-bold text-[16px] leading-none"
          >
            <Plus size={20} className="text-[#FF6000]" />
            <span>링크 추가</span>
          </button>
        </div>
        {/* 아래 줄: Input */}
        <div /> {/* 빈칸으로 들여쓰기 유지 */}
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
    </section>
  );
}
