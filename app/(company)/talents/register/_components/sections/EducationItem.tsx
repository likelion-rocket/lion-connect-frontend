/**
 * 학력 항목 컴포넌트
 * 개별 학력 정보를 표시하고 편집하는 컴포넌트
 */

"use client";

import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";
import { FormInput } from "@/components/form/FormInput";
import { FormTextarea } from "@/components/form/FormTextarea";
import { FormSelect } from "@/components/form/FormSelect";
import { FormContainer } from "@/components/form/FormContainer";

interface EducationItemProps {
  index: number;
}

export default function EducationItem({ index }: EducationItemProps) {
  const [isFocused, setIsFocused] = useState(false);
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<TalentRegisterFormValues>();

  // useWatch를 컴포넌트 최상위에서 호출 (Hook의 순서 유지)
  const educationFields = useWatch({
    control,
    name: `educations.${index}`,
  });

  const hasEducationValue =
    educationFields?.schoolName ||
    educationFields?.major ||
    educationFields?.degree ||
    educationFields?.status ||
    educationFields?.startDate ||
    educationFields?.endDate ||
    educationFields?.description;

  return (
    <div className="education-item flex items-start gap-4">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 10L12 4L20 10V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V10Z"
            stroke="currentColor"
            className="text-icon-secondary"
            strokeWidth="2"
          />
          <path
            d="M9 19V14H15V19"
            stroke="currentColor"
            className="text-icon-secondary"
            strokeWidth="2"
          />
        </svg>
      </div>

      <FormContainer
        hasValue={!!hasEducationValue}
        isPressed={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="flex-1 rounded-xl p-4 md:p-6 flex flex-col gap-4"
      >
        {/* 학교명 */}
        <div className="field">
          <label
            htmlFor={`educations-${index}-school`}
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            학교명<span className="required text-text-error">*</span>
          </label>
          <FormInput
            id={`educations-${index}-school`}
            type="text"
            placeholder="학교명을 입력해주세요"
            error={!!errors.educations?.[index]?.schoolName}
            {...register(`educations.${index}.schoolName`)}
          />
          {errors.educations?.[index]?.schoolName && (
            <p className="field-error text-sm text-text-error mt-1">
              {errors.educations[index]?.schoolName?.message}
            </p>
          )}
        </div>

        {/* 전공 */}
        <div className="field">
          <label
            htmlFor={`educations-${index}-major`}
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            전공
          </label>
          <FormInput
            id={`educations-${index}-major`}
            type="text"
            placeholder="전공을 입력해주세요"
            {...register(`educations.${index}.major`)}
          />
        </div>

        {/* 학위 */}
        <div className="field">
          <label
            htmlFor={`educations-${index}-degree`}
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            학위
          </label>
          <FormInput
            id={`educations-${index}-degree`}
            type="text"
            placeholder="학위를 입력해주세요 (예: 학사, 석사)"
            {...register(`educations.${index}.degree`)}
          />
        </div>

        {/* 재학 상태 */}
        <div className="field">
          <label
            htmlFor={`educations-${index}-status`}
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            재학 상태
          </label>
          <FormSelect id={`educations-${index}-status`} {...register(`educations.${index}.status`)}>
            <option value="">선택해주세요</option>
            <option value="ENROLLED">재학</option>
            <option value="GRADUATED">졸업</option>
            <option value="COMPLETED">수료</option>
          </FormSelect>
        </div>

        {/* 재학 기간 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="field">
            <label
              htmlFor={`educations-${index}-start-date`}
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              재학 시작일
            </label>
            <FormInput
              id={`educations-${index}-start-date`}
              type="text"
              placeholder="YYYY.MM"
              {...register(`educations.${index}.startDate`)}
            />
          </div>

          <div className="field">
            <label
              htmlFor={`educations-${index}-end-date`}
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              재학 종료일
            </label>
            <FormInput
              id={`educations-${index}-end-date`}
              type="text"
              placeholder="YYYY.MM"
              {...register(`educations.${index}.endDate`)}
            />
          </div>
        </div>

        {/* 설명 */}
        <div className="field">
          <label
            htmlFor={`educations-${index}-description`}
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            설명
          </label>
          <FormTextarea
            id={`educations-${index}-description`}
            placeholder="학력에 대한 추가 설명을 입력해주세요"
            rows={3}
            {...register(`educations.${index}.description`)}
          />
        </div>
      </FormContainer>
    </div>
  );
}
