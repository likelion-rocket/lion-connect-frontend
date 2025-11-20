// app/(base)/talents/register/_components/CareerComponent.tsx
"use client";

import Image from "next/image";
import Input from "@/components/ui/input";
import type { CompanyForm, CompanyErrors } from "@/hooks/talent/register/sections/useCareerSection";
import { Plus } from "lucide-react";

type Props = {
  companies: CompanyForm[];
  errors: CompanyErrors[];
  hasAnyValue: (c: CompanyForm) => boolean;
  onChange: (
    index: number,
    field: keyof CompanyForm
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  onClear: (index: number) => void;
  /** ✅ 추가: 휴지통 클릭 시 호출 (서버 삭제 + 폼 초기화) */
  onDelete?: (index: number) => Promise<void> | void;
};

export default function CareerComponent({
  companies,
  errors = [],
  hasAnyValue,
  onChange,
  onAdd,
  onClear,
  onDelete, // ✅
}: Props) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 제목/아이콘은 1회만 노출 */}
      <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
        <span>경력</span>
      </div>
      <div className="grid grid-cols-[48px_auto] gap-x-4 mb-4">
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
      </div>

      {companies.map((item, index) => {
        const sectionClasses =
          "relative w-full rounded-xl bg-white transition-all " +
          (hasAnyValue(item)
            ? "border border-[#FF6000] active:border-transparent "
            : "hover:border hover:border-[#FF6000]/50 active:border-transparent ") +
          "focus-within:shadow-[0_4px_6px_-2px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.10)] " +
          "active:shadow-[0_4px_6px_-2px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.10)]";

        return (
          <div key={index} className="mb-8 last:mb-0">
            {/* 입력 섹션만 반복 */}
            <div className={sectionClasses}>
              <div className="p-4">
                <div className="grid grid-cols-[48px_auto] gap-x-4">
                  <div />
                  <div className="mt-1">
                    <Input
                      sectionControlled
                      showClearWhenFilled={false}
                      placeholder="회사명을 입력해주세요"
                      type="text"
                      className="w-full mb-3"
                      value={item.company}
                      onChange={onChange(index, "company")}
                    />
                    {errors[index]?.company && (
                      <p className="mt-1 text-xs text-red-500">{errors[index]?.company}</p>
                    )}

                    <Input
                      sectionControlled
                      showClearWhenFilled={false}
                      placeholder="YYYY . MM ~ YYYY . MM (n년 n개월)"
                      type="text"
                      className="w-full mb-3"
                      value={item.period}
                      onChange={onChange(index, "period")}
                    />
                    {errors[index]?.period && (
                      <p className="mt-1 text-xs text-red-500">{errors[index]?.period}</p>
                    )}

                    <div className="flex gap-4 mb-3">
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
                        {errors[index]?.dept && (
                          <p className="mt-1 text-xs text-red-500">{errors[index]?.dept}</p>
                        )}
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
                        {errors[index]?.role && (
                          <p className="mt-1 text-xs text-red-500">{errors[index]?.role}</p>
                        )}
                      </div>
                    </div>

                    <Input
                      sectionControlled
                      showClearWhenFilled={false}
                      placeholder="담당 업무를 상세 기준으로 작성해주세요."
                      type="text"
                      className="w-full"
                      value={item.desc}
                      onChange={onChange(index, "desc")}
                    />
                    {errors[index]?.desc && (
                      <p className="mt-1 text-xs text-red-500">{errors[index]?.desc}</p>
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

      {/* 4. 링크 추가 버튼 */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-2 text-[#FF6000] hover:opacity-80 font-bold text-[16px] leading-none"
        >
          <Plus size={20} className="text-[#FF6000]" />
          <span>경력 추가</span>
        </button>
      </div>
    </section>
  );
}
