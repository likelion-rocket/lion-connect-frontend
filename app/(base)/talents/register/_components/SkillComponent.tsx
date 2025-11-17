"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "@/components/ui/input";
import { Plus } from "lucide-react";

export default function SkillComponent() {
  // 🔥 초기값을 1개로 변경
  const [skills, setSkills] = useState<string[]>([""]);

  const handleAddSkill = () => {
    setSkills((prev) => [...prev, ""]);
  };

  const handleChange = (index: number, value: string) => {
    setSkills((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

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

        {/* 🔥 항상 grid-cols-3 유지하면서 skills 개수만큼 인풋 생성 */}
        <div className="mt-4 w-full grid grid-cols-3 gap-4">
          {skills.map((skill, idx) => (
            <Input
              key={idx}
              placeholder="직무 스킬을 입력해주세요"
              type="text"
              className="w-full"
              value={skill}
              onChange={(e) => handleChange(idx, e.target.value)}
            />
          ))}
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
