// app/(consumer)/talents/register/components/qualification/PremierSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "@/components/ui/input";
import { Plus } from "lucide-react";

type PremierItem = {
  title: string; // 활동/수상명
  period: string; // 수상/활동일 (YYYY.MM)
  dept: string; // 부서/직무
};

export default function PremierSection() {
  const [items, setItems] = useState<PremierItem[]>([{ title: "", period: "", dept: "" }]);

  const handleAdd = () => {
    setItems((prev) => [...prev, { title: "", period: "", dept: "" }]);
  };

  const handleChange =
    (index: number, field: keyof PremierItem) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setItems((prev) => {
        const copy = [...prev];
        copy[index] = { ...copy[index], [field]: value };
        return copy;
      });
    };

  const handleClear = (index: number) => {
    setItems((prev) => {
      const copy = [...prev];
      copy[index] = { title: "", period: "", dept: "" };
      return copy;
    });
  };

  const hasAnyValue = (it: PremierItem) =>
    !!it.title.trim() || !!it.period.trim() || !!it.dept.trim();

  return (
    <div>
      {items.map((item, index) => {
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

                  {/* 활동/수상명 */}
                  <div className="mt-1 mb-3">
                    <Input
                      sectionControlled
                      showClearWhenFilled={false}
                      placeholder="수상/활동명을 입력하세요"
                      type="text"
                      className="w-full"
                      value={item.title}
                      onChange={handleChange(index, "title")}
                    />
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
                      onChange={handleChange(index, "period")}
                    />
                  </div>

                  <div />

                  {/* 부서 / 직무 */}
                  <div className="mb-0">
                    <Input
                      sectionControlled
                      showClearWhenFilled={false}
                      placeholder="부서 / 직무"
                      type="text"
                      className="w-full"
                      value={item.dept}
                      onChange={handleChange(index, "dept")}
                    />
                  </div>
                </div>
              </div>

              {/* 하단 휴지통 버튼 */}
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

      {/* 활동 추가 버튼 — 기존 마진 유지 */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-2 text-[#FF6000] hover:opacity-80 font-bold text-[16px] leading-none"
        >
          <Plus size={20} className="text-[#FF6000]" />
          <span>활동 추가</span>
        </button>
      </div>
    </div>
  );
}
