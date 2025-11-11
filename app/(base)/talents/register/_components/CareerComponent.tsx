// app/(base)/talents/register/_components/CareerComponent.tsx
"use client";

import Image from "next/image";
import Input from "@/components/ui/input";
import { Plus } from "lucide-react";
import type { CompanyForm, CompanyErrors } from "@/hooks/useCareerSection";

type Props = {
  companies: CompanyForm[];
  errors?: CompanyErrors[];
  hasAnyValue: (c: CompanyForm) => boolean;
  onChange: (
    index: number,
    field: keyof CompanyForm
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  onClear: (index: number) => void;
};

export default function CareerComponent({
  companies,
  errors = [],
  hasAnyValue,
  onChange,
  onAdd,
  onClear,
}: Props) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 섹션 타이틀 */}
      <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
        <span>경력</span>
      </div>

      {companies.map((item, index) => {
        const sectionClasses =
          "relative w-full rounded-xl bg-white transition-all " +
          (hasAnyValue(item)
            ? "border border-[#FF6000] active:border-transparent "
            : "hover:border hover:border-[#FF6000]/50 active:border-transparent ") +
          "focus-within:shadow-[0_4px_6px_-2px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.10)] " +
          "active:shadow-[0_4px_6px_-2px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.10)]";

        const e = errors[index] ?? {};

        return (
          <div key={index} className="mb-8 last:mb-0">
            {/* 아이콘 + 제목 (섹션 밖) */}
            <div className="grid grid-cols-[48px_auto] gap-x-4 mb-4">
              {index === 0 ? (
                <>
                  <div className="w-12 h-12 rounded-md bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center">
                    <Image
                      src="/icons/outline-office-building.svg"
                      alt="office-building"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="flex items-center h-12 text-[16px] font-semibold text-text-primary">
                    회사
                  </div>
                </>
              ) : (
                <>
                  <div />
                  <div />
                </>
              )}
            </div>

            {/* 입력 섹션 */}
            <div className={sectionClasses}>
              <div className="p-4">
                <div className="grid grid-cols-[48px_auto] gap-x-4">
                  <div />
                  <div className="mt-1">
                    {/* 회사명 */}
                    <Input
                      sectionControlled
                      showClearWhenFilled={false}
                      placeholder="회사명을 입력해주세요"
                      type="text"
                      className="w-full mb-1"
                      value={item.company}
                      onChange={onChange(index, "company")}
                    />
                    {e.company && <p className="mt-1 mb-2 text-red-500 text-xs">{e.company}</p>}

                    {/* 근무 기간 */}
                    <Input
                      sectionControlled
                      showClearWhenFilled={false}
                      placeholder="YYYY . MM ~ YYYY . MM (또는 ~ 현재)"
                      type="text"
                      className="w-full mb-1"
                      value={item.period}
                      onChange={onChange(index, "period")}
                    />
                    {e.period && <p className="mt-1 mb-2 text-red-500 text-xs">{e.period}</p>}

                    {/* 부서/직무 + 직급·직책 */}
                    <div className="flex gap-4 mb-1">
                      <div className="w-full">
                        <Input
                          sectionControlled
                          showClearWhenFilled={false}
                          placeholder="부서 · 직무"
                          type="text"
                          className="w-full"
                          value={item.dept}
                          onChange={onChange(index, "dept")}
                        />
                        {e.dept && <p className="mt-1 text-red-500 text-xs">{e.dept}</p>}
                      </div>
                      <div className="w-full">
                        <Input
                          sectionControlled
                          showClearWhenFilled={false}
                          placeholder="직급 · 직책"
                          type="text"
                          className="w-full"
                          value={item.role}
                          onChange={onChange(index, "role")}
                        />
                        {e.role && <p className="mt-1 text-red-500 text-xs">{e.role}</p>}
                      </div>
                    </div>

                    {/* 담당 업무 */}
                    <Input
                      sectionControlled
                      showClearWhenFilled={false}
                      placeholder="담당 업무를 상세 기준으로 작성해주세요."
                      type="text"
                      className="w-full"
                      value={item.desc}
                      onChange={onChange(index, "desc")}
                    />
                    {e.desc && <p className="mt-1 text-red-500 text-xs">{e.desc}</p>}
                  </div>
                </div>
              </div>

              {/* 하단 휴지통 버튼 */}
              <div className="flex justify-end p-3 pt-0">
                <button
                  type="button"
                  onClick={() => onClear(index)}
                  className="inline-flex items-center gap-2 rounded-sm border border-[#FF6000]/20 bg-[#FFF3EB] px-2 py-1 text-[#FF6000] hover:opacity-90"
                >
                  <Image src="/icons/outline-trash.svg" alt="삭제" width={24} height={24} />
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* 회사 추가 버튼 */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-2 text-[#FF6000] hover:opacity-80 font-bold text-[16px] leading-none"
        >
          <Plus size={20} className="text-[#FF6000]" />
          <span>회사 추가</span>
        </button>
      </div>
    </section>
  );
}
