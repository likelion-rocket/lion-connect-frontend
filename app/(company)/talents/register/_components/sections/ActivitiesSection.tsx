/**
 * 수상/활동/기타 섹션 컴포넌트
 * 필드: activities[].title, activities[].organization, activities[].awardDate, activities[].description
 * 배열 구조로 여러 개 활동 추가 가능
 * DELETE API: deleteAward(id) - activities는 API에서 awards로 매핑됨
 */

"use client";

import { useState } from "react";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";
import { FormInput } from "@/components/form/FormInput";
import { FormTextarea } from "@/components/form/FormTextarea";
import { FormContainer } from "@/components/form/FormContainer";
import { deleteAward } from "@/lib/api/awards";
import AddButton from "../AddButton";

export default function ActivitiesSection() {
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const { control, getValues } = useFormContext<TalentRegisterFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "activities",
  });

  // 개별 항목의 포커스 상태 관리
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // 활동 삭제 핸들러
  const handleDeleteActivity = async (index: number, activityId?: number) => {
    try {
      if (activityId) {
        await deleteAward(activityId);
      }
      remove(index);
      setDeleteError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "활동 삭제에 실패했습니다";
      setDeleteError(errorMessage);
    }
  };

  // 활동 추가
  const handleAddActivity = () => {
    append({
      title: "",
      organization: "",
      awardDate: "",
      description: "",
    });
  };

  return (
    <section className="section section-activities flex flex-col gap-6">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">수상 / 활동 / 기타</h2>

      {deleteError && (
        <div className="error-message text-sm text-text-error bg-bg-error/10 p-3 rounded-lg">
          {deleteError}
        </div>
      )}

      <div className="activities-list flex flex-col gap-6">
        {fields.map((field, index) => {
          const activityData = getValues("activities")?.[index];
          const activityId = activityData?.id;

          return (
            <ActivityItem
              key={field.id}
              index={index}
              activityId={activityId}
              onDelete={handleDeleteActivity}
              isFocused={focusedIndex === index}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
            />
          );
        })}
      </div>

      {/* 활동 추가 버튼 */}
      <AddButton label="활동 추가" className="self-end" onClick={handleAddActivity} />
    </section>
  );
}

interface ActivityItemProps {
  index: number;
  activityId?: number; // 서버에서 받은 id (기존 데이터인 경우)
  onDelete?: (index: number, activityId?: number) => void | Promise<void>; // DELETE 핸들러
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

function ActivityItem({
  index,
  activityId,
  onDelete,
  isFocused,
  onFocus,
  onBlur,
}: ActivityItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { register, control } = useFormContext<TalentRegisterFormValues>();

  // useWatch를 컴포넌트 최상위에서 호출 (Hook의 순서 유지)
  const activityFields = useWatch({
    control,
    name: `activities.${index}`,
  });

  const hasActivityValue =
    activityFields?.title ||
    activityFields?.organization ||
    activityFields?.awardDate ||
    activityFields?.description;

  // DELETE 핸들러
  const handleDelete = async () => {
    if (!onDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      await onDelete(index, activityId);
    } catch (error) {
      // Error handling
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="activity-item flex items-start gap-4 md:gap-8">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L14.5 9H22L16 14L18.5 21L12 16L5.5 21L8 14L2 9H9.5L12 2Z"
            stroke="currentColor"
            className="text-icon-secondary"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <FormContainer
        hasValue={!!hasActivityValue}
        isPressed={isFocused}
        onFocus={onFocus}
        onBlur={onBlur}
        onDelete={handleDelete}
        disabled={isDeleting}
        className="flex-1 rounded-xl p-4 md:p-6 flex flex-col gap-4"
      >
        {/* ID 필드 (Hidden) */}
        <input type="hidden" {...register(`activities.${index}.id`)} />

        {/* 활동명 */}
        <div className="field">
          <label
            htmlFor={`activities-${index}-title`}
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            활동명/수상명
          </label>
          <FormInput
            id={`activities-${index}-title`}
            type="text"
            placeholder="활동명/수상명을 입력해주세요"
            {...register(`activities.${index}.title`)}
          />
        </div>

        {/* 주최 기관 */}
        <div className="field">
          <label
            htmlFor={`activities-${index}-organization`}
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            주최 기관
          </label>
          <FormInput
            id={`activities-${index}-organization`}
            type="text"
            placeholder="주최 기관을 입력해주세요"
            {...register(`activities.${index}.organization`)}
          />
        </div>

        {/* 수상/활동 일자 */}
        <div className="field">
          <label
            htmlFor={`activities-${index}-award-date`}
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            수상/활동 일자
          </label>
          <FormInput
            id={`activities-${index}-award-date`}
            type="month"
            placeholder="YYYY.MM"
            {...register(`activities.${index}.awardDate`)}
          />
        </div>

        {/* 활동 내용 */}
        <div className="field">
          <label
            htmlFor={`activities-${index}-description`}
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            활동 내용
          </label>
          <FormTextarea
            id={`activities-${index}-description`}
            placeholder="활동 내용을 입력해주세요"
            rows={3}
            {...register(`activities.${index}.description`)}
          />
        </div>
      </FormContainer>
    </div>
  );
}
