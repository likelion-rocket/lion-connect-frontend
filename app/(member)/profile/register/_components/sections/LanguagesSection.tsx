/**
 * 언어 섹션 컴포넌트
 * 필드: languages[].languageName, languages[].level, languages[].issueDate
 * 배열 구조로 여러 개 언어 추가 가능
 * DELETE API: deleteLanguage(id)
 */

"use client";

import { useState } from "react";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";
import { FormInput } from "@/components/form/FormInput";
import { FormContainer } from "@/components/form/FormContainer";
import { MonthPicker } from "@/components/form/MonthPicker";
import { deleteLanguage } from "@/lib/api/languages";
import AddButton from "../AddButton";

export default function LanguagesSection() {
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const { control, getValues } = useFormContext<TalentRegisterFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  // 개별 항목의 포커스 상태 관리
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // 언어 삭제 핸들러
  const handleDeleteLanguage = async (index: number, languageId?: number) => {
    try {
      if (languageId) {
        await deleteLanguage(languageId);
      }
      remove(index);
      setDeleteError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "언어 삭제에 실패했습니다";
      setDeleteError(errorMessage);
    }
  };

  // 언어 추가
  const handleAddLanguage = () => {
    append({
      languageName: "",
      level: "",
      issueDate: "",
    });
  };

  return (
    <section className="section section-languages flex flex-col gap-6">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">언어</h2>

      {deleteError && (
        <div className="error-message text-sm text-text-error bg-bg-error/10 p-3 rounded-lg">
          {deleteError}
        </div>
      )}

      <div className="languages-list flex flex-col gap-6">
        {fields.map((field, index) => {
          const languageData = getValues("languages")?.[index];
          const languageId = languageData?.id ? Number(languageData.id) : undefined;

          return (
            <LanguageItem
              key={field.id}
              index={index}
              languageId={languageId}
              onDelete={handleDeleteLanguage}
              isFocused={focusedIndex === index}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
            />
          );
        })}
      </div>

      <AddButton label="언어 추가" className="self-end" onClick={handleAddLanguage} />
    </section>
  );
}

interface LanguageItemProps {
  index: number;
  languageId?: number; // 서버에서 받은 id (기존 데이터인 경우)
  onDelete?: (index: number, languageId?: number) => void | Promise<void>; // DELETE 핸들러
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

function LanguageItem({
  index,
  languageId,
  onDelete,
  isFocused,
  onFocus,
  onBlur,
}: LanguageItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { register, control } = useFormContext<TalentRegisterFormValues>();

  // useWatch를 컴포넌트 최상위에서 호출 (Hook의 순서 유지)
  const languageFields = useWatch({
    control,
    name: `languages.${index}`,
  });

  const hasLanguageValue =
    languageFields?.languageName || languageFields?.level || languageFields?.issueDate;

  // DELETE 핸들러
  const handleDelete = async () => {
    if (!onDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      await onDelete(index, languageId);
    } catch (error) {
      // Error handling
    } finally {
      setIsDeleting(false);
    }
  };

  return (
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
        hasValue={!!hasLanguageValue}
        isPressed={isFocused}
        onFocus={onFocus}
        onBlur={onBlur}
        onDelete={handleDelete}
        disabled={isDeleting}
        className="flex-1 rounded-xl p-4 md:p-6 flex flex-col gap-4"
      >
        {/* ID 필드 (Hidden) */}
        <input type="hidden" {...register(`languages.${index}.id`)} />

        <div className="field">
          <FormInput
            id={`languages-${index}-name`}
            type="text"
            placeholder="언어를 입력해주세요"
            className="border-0 focus:border-0"
            {...register(`languages.${index}.languageName`)}
          />
        </div>

        {/* <div className="field">
          <label
            htmlFor={`languages-${index}-level`}
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            수준
          </label>
          <FormInput
            id={`languages-${index}-level`}
            type="text"
            placeholder="수준을 입력해주세요 (예: 상, 중, 하)"
            {...register(`languages.${index}.level`)}
          />
        </div> */}

        <MonthPicker
          value={languageFields?.issueDate}
          register={register(`languages.${index}.issueDate`)}
          id={`languages-${index}-issue-date`}
        />
      </FormContainer>
    </div>
  );
}
