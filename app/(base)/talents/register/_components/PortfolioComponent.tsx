// app/(base)/talents/register/_components/PortfolioComponent.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import Input from "@/components/ui/input";

type PortfolioProps = {
  fileName: string; // ✅ 부모가 내려주는 값
  onFileSelect?: (value: string) => void;
};

export default function PortfolioComponent({ fileName, onFileSelect }: PortfolioProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      let name = file.name;
      if (!name.toLowerCase().endsWith(".pdf")) {
        const baseName = name.replace(/\.[^/.]+$/, "");
        name = `${baseName}.pdf`;
      }
      onFileSelect?.(name); // ✅ 부모로만 전달
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
        <span>포트폴리오</span>
        <span className="text-status-error">*</span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf"
        onChange={handleFileChange}
      />

      <div className="grid grid-cols-[48px_auto] gap-x-4">
        <div className="w-12 h-12 rounded-md bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center">
          <Image src="/icons/outline-paper-clip.svg" alt="attachment" width={24} height={24} />
        </div>
        <div className="flex items-center justify-between h-12 text-[16px] font-semibold text-text-primary">
          <span>포트폴리오 첨부</span>
        </div>
        <div />
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
