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
  educationId?: number; // 서버에서 받은 id (기존 데이터인 경우)
  onDelete?: (index: number, educationId?: number) => void | Promise<void>; // DELETE 핸들러
}

export default function EducationItem({ index, educationId, onDelete }: EducationItemProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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

  // DELETE 핸들러
  const handleDelete = async () => {
    if (!onDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      await onDelete(index, educationId);
    } catch (error) {
      // Error handling
    } finally {
      setIsDeleting(false);
    }
  };

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
        onDelete={handleDelete}
        disabled={isDeleting}
        className="flex-1 rounded-xl p-4 md:p-6 flex flex-col gap-4"
      >
        {/* ID 필드 (Hidden) - 중요: reset 후 ID 유지를 위해 필수 */}
        <input type="hidden" {...register(`educations.${index}.id`)} />

        {/* 학교명 */}
        <div className="field">
          {/* <label
            htmlFor={`educations-${index}-school`}
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            학교명<span className="required text-text-error">*</span>
          </label> */}
          <FormInput
            id={`educations-${index}-school`}
            type="text"
            placeholder="학교명을 입력해주세요"
            error={!!errors.educations?.[index]?.schoolName}
            className="border-0 focus:border-0"
            {...register(`educations.${index}.schoolName`)}
          />
          {errors.educations?.[index]?.schoolName && (
            <p className="field-error text-sm text-text-error mt-1">
              {errors.educations[index]?.schoolName?.message}
            </p>
          )}
        </div>

        {/* 재학 기간 */}
        <div className="field">
          <div className="relative h-14 md:h-16 bg-bg-primary rounded-lg px-4 flex items-center gap-2">
            {/* 커스텀 UI 표시 레이어 */}
            <div className="flex items-center gap-2 pointer-events-none">
              <span
                className={educationFields?.startDate ? "text-text-primary" : "text-text-tertiary"}
              >
                {educationFields?.startDate || "YYYY.MM"}
              </span>
              <span className="text-text-tertiary">~</span>
              <span
                className={educationFields?.endDate ? "text-text-primary" : "text-text-tertiary"}
              >
                {educationFields?.endDate || "YYYY.MM"}
              </span>
            </div>

            {/* 숨겨진 실제 input들 */}
            <div className="absolute inset-0 flex items-center gap-1 opacity-0">
              <FormInput
                id={`educations-${index}-start-date`}
                type="month"
                placeholder=""
                className="border-0 focus:border-0 w-[85px] cursor-pointer"
                onClick={(e) => {
                  const target = e.target as HTMLInputElement;
                  try {
                    target.showPicker?.();
                  } catch (error) {
                    // showPicker not supported, fallback to default behavior
                  }
                }}
                {...register(`educations.${index}.startDate`)}
              />
              <span className="text-text-tertiary">~</span>
              <FormInput
                id={`educations-${index}-end-date`}
                type="month"
                placeholder=""
                className="border-0 focus:border-0 w-[85px] cursor-pointer"
                onClick={(e) => {
                  const target = e.target as HTMLInputElement;
                  try {
                    target.showPicker?.();
                  } catch (error) {
                    // showPicker not supported, fallback to default behavior
                  }
                }}
                {...register(`educations.${index}.endDate`)}
              />
            </div>
          </div>
        </div>

        {/* 학위 */}
        {/* <div className="field">
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
        </div> */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* 졸업 상태 */}
          <div className="field">
            {/* <label
            htmlFor={`educations-${index}-status`}
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            졸업 상태
          </label> */}
            <FormSelect
              id={`educations-${index}-status`}
              className={`border-0 focus:border-0 ${!educationFields?.status ? "text-text-tertiary" : ""}`}
              {...register(`educations.${index}.status`)}
            >
              <option value="">졸업상태</option>
              <option value="ENROLLED">재학</option>
              <option value="GRADUATED">졸업</option>
              <option value="COMPLETED">수료</option>
            </FormSelect>
          </div>
          {/* 전공 */}
          <div className="field">
            {/* <label
            htmlFor={`educations-${index}-major`}
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            전공
          </label> */}
            <FormInput
              id={`educations-${index}-major`}
              type="text"
              placeholder="전공을 입력해주세요"
              className="border-0 focus:border-0"
              {...register(`educations.${index}.major`)}
            />
          </div>
        </div>
        {/* 내용 */}
        <div className="field">
          {/* <label
            htmlFor={`educations-${index}-description`}
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            내용
          </label> */}
          <FormTextarea
            id={`educations-${index}-description`}
            placeholder="학력에 대한 추가 설명을 입력해주세요"
            rows={3}
            className="border-0 focus:border-0"
            {...register(`educations.${index}.description`)}
          />
        </div>
      </FormContainer>
    </div>
  );
}
