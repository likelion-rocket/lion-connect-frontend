import React from "react";
import Image from "next/image";
import { cn } from "@/utils/utils";

export type PorfolioCardProps = {
  fileName?: string; // 예: "portfolio.pdf"
  fileUrl?: string; // 예: "/files/portfolio.pdf" 또는 blob:
  height?: number; // 미리보기 높이
  className?: string;
  defaultOpen?: boolean; // 기본 접힘/펼침
};

// URL이 PDF인지 확인하는 함수
function isPdfUrl(url: string): boolean {
  const lowerUrl = url.toLowerCase();
  return lowerUrl.endsWith(".pdf") || lowerUrl.includes("application/pdf");
}

export default function PortfolioCard({
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
        {/* 포트폴리오 미리보기 */}
        <div className="w-full rounded-xl border border-border-quaternary bg-white overflow-hidden">
          {fileUrl &&
          (fileUrl.startsWith("/") ||
            fileUrl.startsWith("http://") ||
            fileUrl.startsWith("https://") ||
            fileUrl.startsWith("blob:")) ? (
            isPdfUrl(fileUrl) ? (
              // PDF인 경우 object 태그 사용
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
              // PDF가 아닌 경우 iframe으로 임베드
              <iframe
                src={fileUrl}
                className="w-full"
                style={{ height }}
                title="포트폴리오 미리보기"
                sandbox="allow-scripts allow-same-origin"
              />
            )
          ) : (
            <div
              className="w-full flex items-center justify-center text-sm text-[#999]"
              style={{ height }}
            >
              {fileUrl
                ? "포트폴리오가 없습니다."
                : "포트폴리오를 등록하면 이곳에 미리보기가 표시됩니다."}
            </div>
          )}
        </div>
      </div>
    </details>
  );
}
