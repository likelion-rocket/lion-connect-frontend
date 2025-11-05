import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type PorfolioCardProps = {
  fileName?: string; // 예: "portfolio.pdf"
  fileUrl?: string; // 예: "/files/portfolio.pdf" 또는 blob:
  height?: number; // 미리보기 높이
  className?: string;
  defaultOpen?: boolean; // 기본 접힘/펼침
};

export default function PorfolioCard({
  fileName,
  fileUrl,
  height = 520,
  className = "",
  defaultOpen = false,
}: PorfolioCardProps) {
  return (
    <details
      className={cn(
        "group w-[910px] mx-auto rounded-2xl border border-border-quaternary bg-white open:bg-white mb-30",
        className
      )}
      {...(defaultOpen ? { open: true } : {})}
    >
      {/* 헤더 */}
      <summary className="list-none cursor-pointer">
        <div className="flex items-center justify-between px-6 py-4">
          <h3 className="text-[16px] font-bold text-black">포트폴리오</h3>

          {/* ▼ 아이콘 전환 */}
          <div className="relative w-5 h-5">
            {/* 닫힘(기본) 아이콘 */}
            <Image
              src="/icons/outline-cheveron-down.svg"
              alt="펼치기"
              fill
              className="absolute inset-0 transition-opacity duration-150 opacity-100 group-open:opacity-0"
            />
            {/* 열림 아이콘 */}
            <Image
              src="/icons/outline-cheveron-up.svg"
              alt="접기"
              fill
              className="absolute inset-0 transition-opacity duration-150 opacity-0 group-open:opacity-100"
            />
          </div>
        </div>
      </summary>

      {/* 본문 */}
      <div className="px-6 pb-6">
        {/* 파일명 */}
        <p
          className={cn(
            "text-[14px] leading-[1.7] break-all mb-3",
            fileName ? "text-[#333]" : "text-[#999]"
          )}
          title={fileName}
        >
          {fileName || "선택된 파일이 없습니다."}
        </p>

        {/* PDF 미리보기 */}
        <div className="w-full rounded-xl border border-border-quaternary bg-white overflow-hidden">
          {fileUrl ? (
            <object
              data={fileUrl}
              type="application/pdf"
              className="w-full"
              style={{ height }}
              aria-label="포트폴리오 PDF 미리보기"
            >
              <div className="p-4 text-sm text-[#666]">
                브라우저에서 PDF 미리보기를 지원하지 않습니다.{" "}
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[#0b5fff]"
                >
                  새 창에서 열기
                </a>
              </div>
            </object>
          ) : (
            <div
              className="w-full flex items-center justify-center text-sm text-[#999]"
              style={{ height }}
            >
              포트폴리오 PDF를 선택하면 이곳에 미리보기가 표시됩니다.
            </div>
          )}
        </div>
      </div>
    </details>
  );
}
