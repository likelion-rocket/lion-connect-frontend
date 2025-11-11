// app/(consumer)/talents/register/components/section/CertificateSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "@/components/ui/input";

type CertItem = {
  name: string;
  issueDate: string;
};

export default function CertificateSection() {
  const [certs, setCerts] = useState<CertItem[]>([{ name: "", issueDate: "" }]);

  const handleAdd = () => setCerts((prev) => [...prev, { name: "", issueDate: "" }]);

  const handleChange =
    (index: number, field: keyof CertItem) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCerts((prev) => {
        const copy = [...prev];
        copy[index] = { ...copy[index], [field]: value };
        return copy;
      });
    };

  const handleClear = (index: number) => {
    setCerts((prev) => {
      const copy = [...prev];
      copy[index] = { name: "", issueDate: "" };
      return copy;
    });
  };

  const hasAnyValue = (c: CertItem) => !!c.name.trim() || !!c.issueDate.trim();

  return (
    <div>
      {certs.map((item, index) => {
        const sectionClasses =
          "relative w-full rounded-xl bg-white transition-all " +
          (hasAnyValue(item)
            ? "border border-[#FF6000] active:border-transparent "
            : "hover:border hover:border-[#FF6000]/50 active:border-transparent ") +
          "focus-within:shadow-[0_4px_6px_-2px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.10)] " +
          "active:shadow-[0_4px_6px_-2px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.10)]";

        return (
          <div key={index} className="mb-8 last:mb-0">
            {/* 아이콘 + 소제목 (이 컴포넌트는 그리드 셀에 들어가므로 여기서만 출력) */}
            {index === 0 && (
              <div className="grid grid-cols-[48px_auto] gap-x-4 mb-4">
                <div className="w-12 h-12 rounded-md bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center">
                  <Image src="/icons/outline-star.svg" alt="certificate" width={24} height={24} />
                </div>
                <div className="flex items-center h-12 text-[16px] font-semibold text-text-primary">
                  자격증
                </div>
              </div>
            )}

            {/* 입력 섹션(테두리/그림자 적용 영역) */}
            <div className={sectionClasses}>
              <div className="p-4">
                <div className="grid grid-cols-[48px_auto] gap-x-4">
                  <div />
                  {/* 자격증명 */}
                  <div className="mt-1 mb-3">
                    <Input
                      sectionControlled
                      showClearWhenFilled={false}
                      placeholder="자격증명을 입력하세요"
                      type="text"
                      className="w-full"
                      value={item.name}
                      onChange={handleChange(index, "name")}
                    />
                  </div>

                  <div />
                  {/* 취득일 */}
                  <div className="mb-0">
                    <Input
                      sectionControlled
                      showClearWhenFilled={false}
                      placeholder="취득월 (예: 2024.07)"
                      type="text"
                      className="w-full"
                      value={item.issueDate}
                      onChange={handleChange(index, "issueDate")}
                    />
                  </div>
                </div>
              </div>

              {/* 하단 휴지통(해당 블록 초기화) */}
              <div className="flex justify-end p-3 pt-0">
                <button
                  type="button"
                  onClick={() => handleClear(index)}
                  className="inline-flex items-center gap-2 rounded-sm border border-[#FF6000]/20 bg-[#FFF3EB] px-2 py-1 text-[#FF6000] hover:opacity-90"
                >
                  <Image src="/icons/outline-trash.svg" alt="삭제" width={24} height={24} />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* 추가 버튼 (그리드 셀 내부 정렬) */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-2 text-[#FF6000] hover:opacity-80 font-bold text-[16px] leading-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF6000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          <span>자격증 추가</span>
        </button>
      </div>
    </div>
  );
}
