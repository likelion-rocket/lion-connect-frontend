/**
 * 직무 관련 경험 선택 섹션 컴포넌트
 * 필드: job.experiences (체크박스 다중 선택)
 * 옵션: bootcamp, startup, certificate, major
 */

"use client";

import { useFormContext } from "react-hook-form";
import Image from "next/image";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";

const EXPERIENCE_OPTIONS = [
  { value: "bootcamp", label: "부트캠프 경험자" },
  { value: "startup", label: "창업 경험자" },
  { value: "certificate", label: "자격증 보유자" },
  { value: "major", label: "전공자" },
] as const;

export default function JobExperienceSection() {
  const { register } = useFormContext<TalentRegisterFormValues>();

  return (
    <section className="section section-experiences flex flex-col gap-6 md:gap-8">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">직무 관련 경험 선택</h2>

      <div className="flex items-start gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0">
          <Image
            src="/icons/outline-pencil.svg"
            alt="직무 경험"
            width={24}
            height={24}
            className="text-icon-secondary"
          />
        </div>

        <fieldset className="flex-1">
          <legend className="sr-only">직무 관련 경험</legend>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {EXPERIENCE_OPTIONS.map((option) => (
              <label key={option.value} className="field flex items-center gap-3 cursor-pointer">
                <input
                  id={`experience-${option.value}`}
                  type="checkbox"
                  value={option.value}
                  className="w-5 h-5 rounded border-2 border-border-secondary accent-bg-accent"
                  {...register("job.experiences")}
                />
                <span className="text-sm md:text-base text-text-primary">{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </section>
  );
}
