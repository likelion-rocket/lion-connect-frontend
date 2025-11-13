"use client";

import Image from "next/image";
import Input from "@/components/ui/input";
import type { CertForm, CertError } from "@/hooks/useCertificationSection";

type Props = {
  certs: CertForm[];
  errors?: CertError[];
  hasAnyValue: (c: CertForm) => boolean;
  onChange: (
    index: number,
    field: keyof CertForm
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  onClear: (index: number) => void; // 화면만 초기화
  onDelete: (index: number) => void; // 서버 삭제 포함
};

export default function CertificateSection({
  certs,
  errors = [],
  hasAnyValue,
  onChange,
  onAdd,
  onClear,
  onDelete,
}: Props) {
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

            {/* 입력 섹션 */}
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
                      onChange={onChange(index, "name")}
                    />
                    {errors?.[index]?.name && (
                      <p className="mt-1 text-red-500 text-xs">{errors[index]!.name}</p>
                    )}
                  </div>

                  <div />
                  {/* 취득월 */}
                  <div className="mb-0">
                    <Input
                      sectionControlled
                      showClearWhenFilled={false}
                      placeholder="취득월 (예: 2024.07)"
                      type="text"
                      className="w-full"
                      value={item.issueDate}
                      onChange={onChange(index, "issueDate")}
                    />
                    {errors?.[index]?.issueDate && (
                      <p className="mt-1 text-red-500 text-xs">{errors[index]!.issueDate}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* 휴지통: 클라 초기화 → 서버 삭제 */}
              <div className="flex justify-end p-3 pt-0">
                <button
                  type="button"
                  onClick={async () => {
                    onClear(index); // UI 먼저 비우기
                    await Promise.resolve(onDelete(index)); // 서버 삭제
                  }}
                  className="inline-flex items-center gap-2 rounded-sm border border-[#FF6000]/20 bg-[#FFF3EB] px-2 py-1 text-[#FF6000] hover:opacity-90"
                >
                  <Image src="/icons/outline-trash.svg" alt="삭제" width={24} height={24} />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* 추가 버튼 */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onAdd}
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
