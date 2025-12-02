/**
 * 경력 항목 컴포넌트
 * 개별 경력 정보를 표시하고 편집하는 컴포넌트
 */

"use client";

import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";
import { FormInput } from "@/components/form/FormInput";
import { FormTextarea } from "@/components/form/FormTextarea";
import { FormContainer } from "@/components/form/FormContainer";
import { MonthRangePicker } from "@/components/form/MonthRangePicker";

interface CareerItemProps {
  index: number;
  careerId?: number; // 서버에서 받은 id (기존 데이터인 경우)
  onDelete?: (index: number, careerId?: number) => void | Promise<void>; // DELETE 핸들러
}

export default function CareerItem({ index, careerId, onDelete }: CareerItemProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<TalentRegisterFormValues>();

  // useWatch를 컴포넌트 최상위에서 호출 (Hook의 순서 유지)
  const careerFields = useWatch({
    control,
    name: `careers.${index}`,
  });

  const hasCareerValue =
    careerFields?.companyName ||
    careerFields?.department ||
    careerFields?.position ||
    careerFields?.startDate ||
    careerFields?.endDate ||
    careerFields?.description;

  // DELETE 핸들러
  const handleDelete = async () => {
    if (!onDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      await onDelete(index, careerId);
    } catch (error) {
      // Error handling
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="career-item flex items-start gap-4">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 9H21V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V9Z"
            stroke="currentColor"
            className="text-icon-secondary"
            strokeWidth="2"
          />
          <path
            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V9H9V5Z"
            stroke="currentColor"
            className="text-icon-secondary"
            strokeWidth="2"
          />
        </svg>
      </div>

      <FormContainer
        hasValue={!!hasCareerValue}
        isPressed={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onDelete={handleDelete}
        disabled={isDeleting}
        className="flex-1 rounded-xl p-4 md:p-6 flex flex-col gap-4"
      >
        {/* ID 필드 (Hidden) */}
        <input type="hidden" {...register(`careers.${index}.id`)} />

        {/* 회사명 */}
        <div className="field">
          <FormInput
            id={`careers-${index}-company`}
            type="text"
            placeholder="회사명을 입력해주세요"
            className="border-0 focus:border-0"
            {...register(`careers.${index}.companyName`)}
          />
        </div>

        {/* 근무 기간 */}
        <MonthRangePicker
          startValue={careerFields?.startDate}
          endValue={careerFields?.endDate}
          startRegister={register(`careers.${index}.startDate`)}
          endRegister={register(`careers.${index}.endDate`)}
          startId={`careers-${index}-start-date`}
          endId={`careers-${index}-end-date`}
        />

        <div className="grid md:grid-cols-2 gap-4">
          {/* 부서 · 직무 */}
          <div className="field">
            <FormInput
              id={`careers-${index}-department`}
              type="text"
              placeholder="부서를 입력해주세요"
              className="border-0 focus:border-0"
              {...register(`careers.${index}.department`)}
            />
          </div>

          {/* 직급 · 직책 */}
          <div className="field">
            <FormInput
              id={`careers-${index}-position`}
              type="text"
              placeholder="직책을 입력해주세요"
              className="border-0 focus:border-0"
              {...register(`careers.${index}.position`)}
            />
          </div>
        </div>
        {/* 재직 중 */}
        {/* <div className="field">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-border-quaternary text-bg-accent focus:ring-bg-accent"
              {...register(`careers.${index}.isCurrent`)}
            />
            <span className="text-sm font-medium text-text-secondary">재직 중</span>
          </label>
        </div> */}

        {/* 담당 업무 */}
        <div className="field">
          <FormTextarea
            id={`careers-${index}-description`}
            placeholder="경력에 대한 설명을 입력해주세요."
            rows={3}
            className="border-0 focus:border-0"
            {...register(`careers.${index}.description`)}
          />
        </div>
      </FormContainer>
    </div>
  );
}
