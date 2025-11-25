"use client";

import { useState, useRef, useEffect } from "react";
import TrashButtonInput from "./TrashButtonInput";
import { SKILL_OPTIONS } from "@/constants/skills";

/**
 * 직무 스킬 입력 컴포넌트
 * 자동완성 드롭다운 기능 포함
 * constants/skills.ts의 SKILL_OPTIONS 사용
 */

interface SkillInputProps {
  value: string;
  onChange: (value: string) => void;
  onDelete?: () => void;
  placeholder?: string;
}

export default function SkillInput({
  value,
  onChange,
  onDelete,
  placeholder = "직무 스킬을 입력해주세요",
}: SkillInputProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredSkills, setFilteredSkills] = useState<typeof SKILL_OPTIONS>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 입력값에 따라 필터링
  useEffect(() => {
    if (value.trim() === "") {
      setFilteredSkills(SKILL_OPTIONS.slice(0, 6));
    } else {
      const filtered = SKILL_OPTIONS.filter((skill) =>
        skill.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSkills(filtered);
    }
  }, [value]);

  const handleFocus = () => {
    setShowDropdown(true);
  };

  const handleSkillSelect = (skillName: string) => {
    onChange(skillName);
    setShowDropdown(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <TrashButtonInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onDelete={onDelete}
        placeholder={placeholder}
      />

      {/* 자동완성 드롭다운 */}
      {showDropdown && filteredSkills.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10 max-h-[240px] overflow-y-auto">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSkillSelect(skill.name);
              }}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-base text-neutral-800 font-['Pretendard'] transition-colors"
            >
              {skill.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
