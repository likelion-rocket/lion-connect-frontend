// app/(consumer)/talents/register/components/qualification/PremierSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "@/components/ui/input";
import { Plus } from "lucide-react";

type PremierItem = {
  title: string;
  period: string;
  dept: string;
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

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className="mb-6 last:mb-0">
          <div className="grid grid-cols-[48px_auto] gap-x-4">
            {/* 첫 줄: 아이콘 + 타이틀 */}
            {index === 0 ? (
              <>
                <div className="w-12 h-12 rounded-md bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center">
                  <Image src="/icons/outline-star.svg" alt="award" width={24} height={24} />
                </div>
                <div className="flex items-center justify-between h-12 text-[16px] font-semibold text-text-primary">
                  <span>활동</span>
                </div>
              </>
            ) : (
              <>
                <div />
                <div />
              </>
            )}

            {/* 활동명 */}
            <div />
            <div className="mt-4 mb-3">
              <Input
                placeholder="활동명을 입력하세요"
                type="text"
                className="w-full"
                value={item.title}
                onChange={handleChange(index, "title")}
              />
            </div>

            {/* 기간 */}
            <div />
            <div className="mb-3">
              <Input
                placeholder="0000.mm"
                type="text"
                className="w-full"
                value={item.period}
                onChange={handleChange(index, "period")}
              />
            </div>

            {/* 부서 / 직무 */}
            <div />
            <div className="mb-1">
              <Input
                placeholder="부서 / 직무"
                type="text"
                className="w-full"
                value={item.dept}
                onChange={handleChange(index, "dept")}
              />
            </div>
          </div>
        </div>
      ))}
      {/* 4. 활동 추가 버튼 */}
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
