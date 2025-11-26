"use client";

import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";
import AddButton from "../AddButton";
import SkillInput from "../SkillInput";
import { useEffect } from "react";

/**
 * 직무 스킬 섹션 컴포넌트
 * 필드: skills.main (입력 가능한 드롭다운, 태그 형식 다중 선택)
 *
 * React Hook Form의 useFieldArray를 사용하여 동적 배열 관리
 * API에서 받은 데이터는 자동으로 초기화됨 (reset 시)
 */

export default function SkillsSection() {
  const { control, setValue } = useFormContext<TalentRegisterFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills.main" as any,
  });

  // useWatch로 필드 값 감지 (성능 최적화)
  const skillsValues = useWatch({
    control,
    name: "skills.main",
  }) as string[] | undefined;

  // 최소 1개 필드 유지 - 초기 로드 시 필드가 없으면 빈 필드 추가
  useEffect(() => {
    if (fields.length === 0) {
      append("" as any);
    }
  }, [fields.length, append]);

  const addSkill = () => {
    append("" as any);
  };

  const removeSkill = (index: number) => {
    // 최소 1개 필드 유지
    if (fields.length > 1) {
      remove(index);
      // remove는 자동으로 shouldDirty를 true로 설정함
    }
  };

  const updateSkill = (index: number, value: string) => {
    setValue(`skills.main.${index}`, value, { shouldValidate: true, shouldDirty: true });
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
            {fields.map((field, index) => (
              <SkillInput
                key={field.id}
                value={(skillsValues?.[index] as string) || ""}
                onChange={(value) => updateSkill(index, value)}
                onDelete={fields.length > 1 ? () => removeSkill(index) : undefined}
              />
            ))}
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
