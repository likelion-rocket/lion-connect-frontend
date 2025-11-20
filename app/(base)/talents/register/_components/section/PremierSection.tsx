// app/(base)/talents/register/_components/section/PremierSection.tsx
"use client";

import Image from "next/image";
import Input from "@/components/ui/input";
import { Plus } from "lucide-react";
import type { AwardForm, AwardError } from "@/hooks/talent/register/sections/useAwardSection";

type Props = {
  awards: AwardForm[];
  errors?: AwardError[];
  hasAnyValue: (item: AwardForm) => boolean;
  onChange: (
    index: number,
    field: keyof AwardForm
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  onClear: (index: number) => void; // 화면만 초기화
  onDelete: (index: number) => void; // 서버 삭제까지 (id가 있으면)
};

export default function PremierSection({
  awards,
  errors = [],
  hasAnyValue,
  onChange,
  onAdd,
  onClear,
  onDelete,
}: Props) {
  return (
    <div>
      {awards.map((item, index) => {
        const sectionClasses =
          "relative w-full rounded-xl bg-white transition-all " +
          (hasAnyValue(item)
            ? "border border-[#FF6000] active:border-transparent "
            : "hover:border hover:border-[#FF6000]/50 active:border-transparent ") +
          "focus-within:shadow-[0_4px_6px_-2px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.10)] " +
          "active:shadow-[0_4px_6px_-2px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.10)]";

        return (
          <div key={index} className="mb-6 last:mb-0">
            {/* 아이콘 + 타이틀 (첫 블록만 표시) — 섹션 바깥 */}
            {index === 0 && (
              <div className="grid grid-cols-[48px_auto] gap-x-4 mb-4">
                <div className="w-12 h-12 rounded-md bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center">
                  <Image src="/icons/outline-star.svg" alt="award" width={24} height={24} />
                </div>
                <div className="flex items-center h-12 text-[16px] font-semibold text-text-primary">
                  수상 / 활동
                </div>
              </div>
            )}

            {/* 입력 섹션 */}
            <div className={sectionClasses}>
              <div className="p-4">
                <div className="grid grid-cols-[48px_auto] gap-x-4">
                  <div />

                  {/* 수상/활동명 */}
                  <div className="mt-1 mb-3">
                    <Input
                      sectionControlled
                      showClearWhenFilled={false}
                      placeholder="수상/활동명을 입력하세요"
                      type="text"
                      className="w-full"
                      value={item.title}
                      onChange={onChange(index, "title")}
                    />
                    {errors?.[index]?.title && (
                      <p className="mt-1 text-red-500 text-xs">{errors[index]!.title}</p>
                    )}
                  </div>

                  <div />

                  {/* 수상/활동일 (YYYY.MM) */}
                  <div className="mb-3">
                    <Input
                      sectionControlled
                      showClearWhenFilled={false}
                      placeholder="수상/활동일 (예: 2024.07)"
                      type="text"
                      className="w-full"
                      value={item.period}
                      onChange={onChange(index, "period")}
                    />
                    {errors?.[index]?.period && (
                      <p className="mt-1 text-red-500 text-xs">{errors[index]!.period}</p>
                    )}
                  </div>

                  <div />

                  {/* 설명(desc) — 예전 dept 자리 */}
                  <div className="mb-0">
                    <Input
                      sectionControlled
                      showClearWhenFilled={false}
                      placeholder="설명 (예: 대회 내용 / 역할 등)"
                      type="text"
                      className="w-full"
                      value={item.desc}
                      onChange={onChange(index, "desc")}
                    />
                    {errors?.[index]?.desc && (
                      <p className="mt-1 text-red-500 text-xs">{errors[index]!.desc}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* 하단 휴지통 버튼 */}
              <div className="flex justify-end p-3 pt-0">
                <button
                  type="button"
                  onClick={() => (onDelete ? onDelete(index) : onClear(index))}
                  className="inline-flex items-center gap-2 rounded-sm border border-[#FF6000]/20 bg-[#FFF3EB] px-2 py-1 text-[#FF6000] hover:opacity-90"
                >
                  <Image src="/icons/outline-trash.svg" alt="삭제" width={24} height={24} />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* 활동 추가 버튼 — 기존 마진 유지 */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-2 text-[#FF6000] hover:opacity-80 font-bold text-[16px] leading-none"
        >
          <Plus size={20} className="text-[#FF6000]" />
          <span>활동 추가</span>
        </button>
      </div>
    </div>
  );
}
