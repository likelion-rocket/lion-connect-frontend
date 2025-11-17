"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Input from "@/components/ui/input";
import { Plus } from "lucide-react";
import { findSkillById, searchSkillsByName, type SkillOption } from "@/constants/skills";

type SkillComponentProps = {
  selectedSkillIds: number[];
  onChangeSelectedSkillIds: (ids: number[]) => void;
};

type SkillRow = {
  id: number | null;
  value: string; // 인풋에 보이는 텍스트
};

export default function SkillComponent({
  selectedSkillIds,
  onChangeSelectedSkillIds,
}: SkillComponentProps) {
  const [rows, setRows] = useState<SkillRow[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /* -----------------------------------
   * 1) selectedSkillIds → rows 프리필
   * ----------------------------------- */
  useEffect(() => {
    console.log("[SkillComponent] selectedSkillIds 변경:", selectedSkillIds);
    console.log("[SkillComponent] 현재 rows:", rows);

    // 선택된 스킬이 하나도 없으면: 최소 1줄은 유지
    if (!selectedSkillIds || selectedSkillIds.length === 0) {
      if (rows.length === 0) {
        console.log("[SkillComponent] 선택 스킬 없음 + rows 비어있음 → 빈 행 1개 생성");
        setRows([{ id: null, value: "" }]);
      }
      return;
    }

    // 이미 의미 있는 행이 있으면 (id 있거나, value에 글자가 있으면) 덮어쓰지 않음
    const hasMeaningfulRow = rows.some((r) => r.id !== null || r.value.trim().length > 0);
    if (hasMeaningfulRow) {
      return;
    }

    // 처음 들어오는 서버 값으로 프리필
    const next = selectedSkillIds.map((id) => ({
      id,
      value: findSkillById(id)?.name ?? "",
    }));
    console.log("[SkillComponent] 서버에서 받은 skillIds로 프리필:", next);
    setRows(next);
  }, [selectedSkillIds, rows]);

  /* -----------------------------------
   * 2) rows → 부모 skillIds 동기화
   *    (렌더 이후 useEffect에서만 올려보냄)
   * ----------------------------------- */
  useEffect(() => {
    const ids = rows.map((r) => r.id).filter((id): id is number => typeof id === "number");

    console.log("[SkillComponent] rows 변경 → 상위 ids 동기화:", ids);
    onChangeSelectedSkillIds(ids);
  }, [rows, onChangeSelectedSkillIds]);

  /* -----------------------------------
   * 이벤트 핸들러들
   * ----------------------------------- */

  const handleAddSkill = () => {
    setRows((prev) => {
      const next = [...prev, { id: null, value: "" }];
      console.log("[SkillComponent] 행 추가:", next);
      return next; // ids 동기화는 useEffect에서 처리
    });
  };

  const handleChangeValue = (index: number, value: string) => {
    setRows((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], value, id: null }; // 텍스트 수정 시 선택 해제
      console.log("[SkillComponent] 인풋 변경 index, value:", index, value);
      return next; // ids 동기화는 useEffect에서 처리
    });
    setOpenIndex(index);
  };

  const handleSelectSkill = (rowIndex: number, option: SkillOption) => {
    setRows((prev) => {
      const next = [...prev];
      next[rowIndex] = { id: option.id, value: option.name };
      console.log("[SkillComponent] 스킬 선택:", option);
      return next; // ids 동기화는 useEffect에서 처리
    });
    setOpenIndex(null);
  };

  // 휴지통 클릭 시 동작
  const handleClearRow = (rowIndex: number) => {
    setRows((prev) => {
      if (prev.length === 1) {
        // 인풋이 1개 뿐이면 값만 비우고 행은 남김
        const next = [{ id: null, value: "" }];
        console.log("[SkillComponent] 마지막 행 비우기 (행은 유지)");
        return next;
      }

      // 여러 개면 해당 행 삭제
      const next = prev.filter((_, i) => i !== rowIndex);
      console.log("[SkillComponent] 행 삭제 index:", rowIndex, "→", next);
      return next;
    });

    setOpenIndex((curr) => (curr === rowIndex ? null : curr));
  };

  /* -----------------------------------
   * 렌더
   * ----------------------------------- */

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 섹션 타이틀 */}
      <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
        <span>직무 스킬</span>
      </div>

      {/* 아이콘 + 설명 */}
      <div className="grid grid-cols-[48px_auto] gap-x-4">
        {/* 왼쪽 아이콘 */}
        <div className="w-12 h-12 rounded-md bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center">
          <Image src="/icons/outline-code.svg" alt="skill" width={24} height={24} />
        </div>

        {/* 오른쪽 설명 */}
        <div className="flex items-center justify-between h-12">
          <p className="text-[16px] text-text-secondary">세부적인 직무 스킬이 있다면 적어주세요</p>
        </div>

        {/* 들여쓰기용 빈칸 */}
        <div />

        {/* grid-cols-3 유지하면서 행마다 Input + 드롭다운 */}
        <div className="mt-4 w-full grid grid-cols-3 gap-4">
          {rows.map((row, idx) => {
            const options = searchSkillsByName(row.value);

            return (
              <div key={idx} className="relative">
                <Input
                  placeholder="직무 스킬을 입력해주세요"
                  type="text"
                  className="w-full"
                  value={row.value}
                  onChange={(e) => handleChangeValue(idx, e.currentTarget.value)}
                  onFileClear={() => handleClearRow(idx)} // 휴지통 커스텀 동작
                />

                {/* 드롭다운 (셀렉트처럼) */}
                {openIndex === idx && options.length > 0 && (
                  <ul className="absolute z-20 mt-1 w-full max-h-60 overflow-y-auto rounded-md border border-border-quaternary bg-white shadow-lg">
                    {options.map((opt) => (
                      <li
                        key={opt.id}
                        className="px-3 py-2 text-sm cursor-pointer hover:bg-[#FFF3EB] hover:text-[#FF6000]"
                        onMouseDown={(e) => {
                          e.preventDefault(); // Input blur 방지
                          handleSelectSkill(idx, opt);
                        }}
                      >
                        {opt.name}
                        <span className="ml-2 text-[11px] text-text-tertiary">
                          {opt.category === "frontendSkills" ? "Frontend" : "Backend"}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 추가 버튼 */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleAddSkill}
          className="flex items-center gap-2 text-[#FF6000] hover:opacity-80 font-bold text-[16px] leading-none"
        >
          <Plus size={20} className="text-[#FF6000]" />
          <span>직무 스킬 추가</span>
        </button>
      </div>
    </section>
  );
}
