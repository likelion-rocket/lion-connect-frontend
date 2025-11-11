// app/(consumer)/talents/register/components/qualification/CertificateSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "@/components/ui/input";
import { Plus } from "lucide-react";

type CertItem = {
  name: string;
  period: string;
};

export default function CertificateSection() {
  const [certs, setCerts] = useState<CertItem[]>([{ name: "", period: "" }]);

  const handleAdd = () => {
    setCerts((prev) => [...prev, { name: "", period: "" }]);
  };

  const handleChange =
    (index: number, field: keyof CertItem) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCerts((prev) => {
        const copy = [...prev];
        copy[index] = { ...copy[index], [field]: value };
        return copy;
      });
    };

  return (
    <div>
      {certs.map((item, index) => (
        <div key={index} className="mb-5 last:mb-0">
          <div className="grid grid-cols-[48px_auto] gap-x-4">
            {index === 0 ? (
              <>
                {/* 아이콘 */}
                <div className="w-12 h-12 rounded-md bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center">
                  <Image src="/icons/outline-star.svg" alt="certificate" width={24} height={24} />
                </div>
                {/* 타이틀 + 버튼 */}
                <div className="flex items-center justify-between h-12 text-[16px] font-semibold text-text-primary">
                  <span>자격증</span>
                </div>
              </>
            ) : (
              <>
                <div />
                <div />
              </>
            )}

            {/* 자격증명 */}
            <div />
            <div className="mt-4 mb-3">
              <Input
                placeholder="자격증명 추가"
                type="text"
                className="w-full"
                value={item.name}
                onChange={handleChange(index, "name")}
              />
            </div>

            {/* 취득/유효 기간 */}
            <div />
            <div>
              <Input
                placeholder="0000.mm"
                type="text"
                className="w-full"
                value={item.period}
                onChange={handleChange(index, "period")}
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
          <span>자격증 추가</span>
        </button>
      </div>
    </div>
  );
}
