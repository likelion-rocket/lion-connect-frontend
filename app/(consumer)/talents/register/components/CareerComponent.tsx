"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "@/components/ui/input";
import { Plus } from "lucide-react";

type CompanyForm = {
  company: string;
  period: string;
  dept: string;
  position: string;
  rank: string;
  desc: string;
};

export default function CareerComponent() {
  const [companies, setCompanies] = useState<CompanyForm[]>([
    { company: "", period: "", dept: "", position: "", rank: "", desc: "" },
  ]);

  const handleAddCompany = () => {
    setCompanies((prev) => [
      ...prev,
      { company: "", period: "", dept: "", position: "", rank: "", desc: "" },
    ]);
  };

  const handleChange =
    (index: number, field: keyof CompanyForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCompanies((prev) => {
        const copy = [...prev];
        copy[index] = { ...copy[index], [field]: value };
        return copy;
      });
    };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 섹션 타이틀 */}
      <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
        <span>경력</span>
      </div>

      {companies.map((item, index) => (
        <div key={index} className="mb-8 last:mb-0">
          {/* 첫 번째 블록일 때만 아이콘 + 제목 표시 */}
          <div className="grid grid-cols-[48px_auto] gap-x-4">
            {index === 0 ? (
              <>
                {/* 왼쪽 아이콘 */}
                <div className="w-12 h-12 rounded-[6px] bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center">
                  <Image
                    src="/icons/outline-office-building.svg"
                    alt="office-building"
                    width={24}
                    height={24}
                  />
                </div>

                {/* 오른쪽 제목 */}
                <div className="flex items-center justify-between h-12 text-[16px] font-semibold text-text-primary">
                  <span>회사</span>
                </div>
              </>
            ) : (
              <>
                {/* 두 번째 이후 블록은 아이콘 대신 빈칸 유지 */}
                <div />
                <div />
              </>
            )}

            {/* 1) 회사명 */}
            <div />
            <div className="mt-4 mb-3">
              <Input
                placeholder="회사명을 입력하세요"
                type="text"
                className="w-full"
                value={item.company}
                onChange={handleChange(index, "company")}
              />
            </div>

            {/* 2) 근무 기간 */}
            <div />
            <div className="mb-3">
              <Input
                placeholder="0000.mm - 0000.mm(0년 0개월)"
                type="text"
                className="w-full"
                value={item.period}
                onChange={handleChange(index, "period")}
              />
            </div>

            {/* 3) 부서/직무 + 직급 + 직책 */}
            <div />
            <div className="mb-3 flex gap-4 w-full">
              <Input
                placeholder="부서 / 직무"
                type="text"
                className="w-full"
                value={item.dept}
                onChange={handleChange(index, "dept")}
              />
              <Input
                placeholder="직급"
                type="text"
                className="w-full"
                value={item.position}
                onChange={handleChange(index, "position")}
              />
              <Input
                placeholder="직책"
                type="text"
                className="w-full"
                value={item.rank}
                onChange={handleChange(index, "rank")}
              />
            </div>

            {/* 4) 담당 업무 */}
            <div />
            <div className="mb-1">
              <Input
                placeholder="담당 업무를 상세 기준으로 작성해주세요."
                type="text"
                className="w-full"
                value={item.desc}
                onChange={handleChange(index, "desc")}
              />
            </div>
          </div>
        </div>
      ))}

      {/* 회사 추가 버튼 */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleAddCompany}
          className="flex items-center gap-2 text-[#FF6000] hover:opacity-80 font-bold text-[14px]"
        >
          <Plus size={16} className="text-[#FF6000]" />
          <span>회사 추가</span>
        </button>
      </div>
    </section>
  );
}
