/**
 * 학력 섹션 컴포넌트
 * 필드: educations[].id, educations[].schoolName, educations[].major, educations[].status, educations[].degree, educations[].startDate, educations[].endDate, educations[].description
 * 배열 구조로 여러 개 학력 추가 가능
 *
 * 데이터 흐름:
 * 1. page.tsx에서 useInitializeTalentForm 훅이 store 데이터를 폼에 자동 로드
 * 2. EducationSection은 폼 필드 렌더링 + DELETE 기능만 담당
 * 3. 서버 데이터가 있으면 id 값이 포함됨 (DELETE 가능)
 */

"use client";

import { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";
import { deleteEducation } from "@/lib/api/educations";
import AddButton from "../AddButton";
import EducationItem from "./EducationItem";

interface EducationSectionProps {
  profileId: number;
}

export default function EducationSection({ profileId }: EducationSectionProps) {
  const { control, getValues, reset } = useFormContext<TalentRegisterFormValues>();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // useFieldArray로 배열 관리
  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });

  // 학력 추가 핸들러
  const handleAddEducation = () => {
    append({
      id: undefined, // 명시적으로 undefined 설정 - 삭제 후 추가 시 이전 id가 재사용되는 문제 방지
      schoolName: "",
      major: "",
      status: "" as "" | "ENROLLED" | "GRADUATED" | "COMPLETED",
      startDate: "",
      endDate: "",
      description: "",
      degree: "",
    });
  };

  // 학력 삭제 핸들러
  const handleDeleteEducation = async (index: number, educationId?: number) => {
    try {
      setDeleteError(null);

      // 서버에서 데이터가 있는 경우 (id 존재) - DELETE API 호출
      if (educationId) {
        await deleteEducation(profileId, educationId);
      }

      // 폼에서 필드 제거
      remove(index);

      // defaultValues를 현재 상태로 업데이트하여 삭제된 항목이 다시 사용되지 않도록 함
      const currentValues = getValues();
      reset(currentValues, { keepDirty: true, keepTouched: true, keepErrors: true });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "학력 삭제에 실패했습니다.";
      setDeleteError(errorMessage);
      // 에러 발생 시 폼 필드는 제거하지 않음
    }
  };

  return (
    <section className="section section-education flex flex-col gap-6 md:gap-8">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">
        학력<span className="text-text-error">*</span>
      </h2>

      {/* 삭제 에러 표시 */}
      {deleteError && (
        <div className="text-sm text-text-error bg-red-50 p-3 rounded-lg border border-red-200">
          {deleteError}
        </div>
      )}

      {/* 학력 항목 (반복 가능 구조) */}
      <div className="education-list flex flex-col gap-6">
        {fields.map((field, index) => {
          // getValues()로 현재 폼 값을 가져와서 실제 id 값을 추출
          const allEducations = getValues("educations");
          const educationId = allEducations?.[index]?.id as number | undefined;
          return (
            <EducationItem
              key={field.id}
              index={index}
              educationId={educationId}
              onDelete={handleDeleteEducation}
            />
          );
        })}
      </div>

      {/* 학력 추가 버튼 */}
      <AddButton label="학력 추가" onClick={handleAddEducation} className="self-end" />
    </section>
  );
}
