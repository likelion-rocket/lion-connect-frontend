"use client";

import { useFormContext } from "react-hook-form";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";
import AddButton from "../AddButton";
import SkillInput from "../SkillInput";
import { useEffect, useCallback, useState } from "react";

/**
 * 직무 스킬 섹션 컴포넌트
 * 필드: skills.main (입력 가능한 드롭다운, 태그 형식 다중 선택)
 *
 * watch/setValue 방식으로 배열 관리 (shouldUnregister: true 환경에서 안정적 동작)
 * API에서 받은 데이터는 자동으로 초기화됨 (reset 시)
 */

interface SkillItem {
  id?: number;
  name: string;
}

export default function SkillsSection() {
  const { watch, setValue } = useFormContext<TalentRegisterFormValues>();

  // 로컬 상태로 스킬 관리 (shouldUnregister: true 문제 회피)
  const [localSkills, setLocalSkills] = useState<SkillItem[]>([{ name: "" }]);

  // 폼 값 변경 감지 (reset 시 동기화)
  const formSkills = watch("skills.main" as any);

  // 폼 값이 외부에서 변경되면 로컬 상태 동기화 (reset 호출 시)
  useEffect(() => {
    if (formSkills && Array.isArray(formSkills) && formSkills.length > 0) {
      // 폼 값과 로컬 상태가 다르면 동기화
      const formSkillsStr = JSON.stringify(formSkills);
      const localSkillsStr = JSON.stringify(localSkills);
      if (formSkillsStr !== localSkillsStr) {
        setLocalSkills(formSkills);
      }
    }
  }, [formSkills]);

  // 로컬 상태 변경 시 폼 값 업데이트
  const syncToForm = useCallback(
    (newSkills: SkillItem[]) => {
      setLocalSkills(newSkills);
      // 폼에 전체 배열을 한번에 설정 (shouldUnregister 문제 회피)
      setValue("skills.main" as any, newSkills, { shouldDirty: true });
    },
    [setValue]
  );

  // 최소 1개 필드 유지 - 초기 로드 시 필드가 없으면 빈 필드 추가
  useEffect(() => {
    if (localSkills.length === 0) {
      syncToForm([{ name: "" }]);
    }
  }, [localSkills.length, syncToForm]);

  const addSkill = () => {
    syncToForm([...localSkills, { name: "" }]);
  };

  const removeSkill = (index: number) => {
    // 최소 1개 필드 유지
    if (localSkills.length > 1) {
      const newSkills = localSkills.filter((_, i) => i !== index);
      syncToForm(newSkills);
    }
  };

  const updateSkillName = (index: number, name: string) => {
    const newSkills = [...localSkills];
    newSkills[index] = { ...newSkills[index], name };
    syncToForm(newSkills);
  };

  return (
    <section className="section section-skills flex flex-col gap-6">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">직무 스킬</h2>

      <div className="flex items-start gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M8 6L4 12L8 18M16 6L20 12L16 18"
              stroke="currentColor"
              className="text-icon-secondary"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="flex-1 flex flex-col gap-14">
          {/* 직무 스킬 입력 필드 그리드 (최대 3개씩 가로 배치) */}
          <div className="inline-flex justify-start items-start gap-14 flex-wrap content-start">
            {localSkills.map((skill, index) => {
              return (
                <SkillInput
                  key={`skill-${index}`}
                  name={`skills.main.${index}.name`}
                  value={skill.name || ""}
                  onChange={(e) => {
                    updateSkillName(index, e.target.value);
                  }}
                  onBlur={() => {
                    // onBlur 시 추가 동작 필요하면 여기에 추가
                  }}
                  onDelete={localSkills.length > 1 ? () => removeSkill(index) : undefined}
                />
              );
            })}
          </div>

          {/* 직무 스킬 추가 버튼 */}
          <div className="flex justify-end">
            <AddButton label="직무 스킬 추가" onClick={addSkill} />
          </div>
        </div>
      </div>
    </section>
  );
}
