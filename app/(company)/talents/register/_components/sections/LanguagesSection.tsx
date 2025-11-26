/**
 * 언어 섹션 컴포넌트
 * 필드: languages[0].languageName, languages[0].level, languages[0].issueDate
 * 배열 구조로 여러 개 언어 추가 가능
 */

"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";
import { FormInput } from "@/components/form/FormInput";
import { FormContainer } from "@/components/form/FormContainer";
import AddButton from "../AddButton";

export default function LanguagesSection() {
  const [isFocused, setIsFocused] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext<TalentRegisterFormValues>();
  return (
    <section className="section section-languages flex flex-col gap-6">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">언어</h2>

      <div className="languages-list flex flex-col gap-6">
        <div className="language-item flex items-start gap-4 md:gap-8">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                className="text-icon-secondary"
                strokeWidth="2"
              />
              <path
                d="M2 12H22M12 2C14.5 5 15.5 8 15.5 12C15.5 16 14.5 19 12 22M12 2C9.5 5 8.5 8 8.5 12C8.5 16 9.5 19 12 22"
                stroke="currentColor"
                className="text-icon-secondary"
                strokeWidth="2"
              />
            </svg>
          </div>

          <FormContainer
            isPressed={isFocused}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 rounded-xl p-4 flex flex-col gap-4"
          >
            <div className="field">
              <label
                htmlFor="languages-0-name"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                언어명
              </label>
              <FormInput
                id="languages-0-name"
                type="text"
                placeholder="언어를 입력해주세요"
                {...register("languages.0.languageName")}
              />
            </div>

            <div className="field">
              <label
                htmlFor="languages-0-level"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                수준
              </label>
              <FormInput
                id="languages-0-level"
                type="text"
                placeholder="수준을 입력해주세요 (예: 상, 중, 하)"
                {...register("languages.0.level")}
              />
            </div>

            <div className="field">
              <label
                htmlFor="languages-0-issue-date"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                취득/검정 일자
              </label>
              <FormInput
                id="languages-0-issue-date"
                type="text"
                placeholder="YYYY.MM"
                {...register("languages.0.issueDate")}
              />
            </div>
          </FormContainer>
        </div>
      </div>

      <AddButton label="언어 추가" className="self-end" />
    </section>
  );
}
