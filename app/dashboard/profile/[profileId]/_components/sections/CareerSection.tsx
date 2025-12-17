/**
 * 경력 섹션 컴포넌트
 * 필드: careers[].companyName, careers[].department, careers[].position, careers[].startDate, careers[].endDate, careers[].isCurrent, careers[].description
 * 배열 구조로 여러 개 경력 추가 가능
 * DELETE API: deleteExperience(id)
 */

"use client";

import { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";
import { deleteExperience } from "@/lib/api/experiences";
import AddButton from "../AddButton";
import CareerItem from "./CareerItem";

interface CareerSectionProps {
  profileId: number;
}

export default function CareerSection({ profileId }: CareerSectionProps) {
  const { control, getValues, reset } = useFormContext<TalentRegisterFormValues>();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // useFieldArray로 배열 관리
  const { fields, append, remove } = useFieldArray({
    control,
    name: "careers",
  });

  // 경력 추가 핸들러
  const handleAddCareer = () => {
    append({
      id: undefined, // 명시적으로 undefined 설정 - 삭제 후 추가 시 이전 id가 재사용되는 문제 방지
      companyName: "",
      department: "",
      position: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    });
  };

  // 경력 삭제 핸들러
  const handleDeleteCareer = async (index: number, careerId?: number) => {
    try {
      setDeleteError(null);

      // 서버에서 데이터가 있는 경우 (id 존재) - DELETE API 호출
      if (careerId) {
        await deleteExperience(profileId, careerId);
      }

      // 폼에서 필드 제거
      remove(index);

      // defaultValues를 현재 상태로 업데이트하여 삭제된 항목이 다시 사용되지 않도록 함
      const currentValues = getValues();
      reset(currentValues, { keepDirty: true, keepTouched: true, keepErrors: true });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "경력 삭제에 실패했습니다.";
      setDeleteError(errorMessage);
      // 에러 발생 시 폼 필드는 제거하지 않음
    }
  };

  return (
    <section className="section section-career flex flex-col gap-6 md:gap-8">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">경력</h2>

      {/* 삭제 에러 표시 */}
      {deleteError && (
        <div className="text-sm text-text-error bg-red-50 p-3 rounded-lg border border-red-200">
          {deleteError}
        </div>
      )}

      {/* 경력 항목 (반복 가능 구조) */}
      <div className="career-list flex flex-col gap-6">
        {fields.map((field, index) => {
          // getValues()로 현재 폼 값을 가져와서 실제 id 값을 추출
          const allCareers = getValues("careers");
          const careerId = allCareers?.[index]?.id as number | undefined;
          return (
            <CareerItem
              key={field.id}
              index={index}
              careerId={careerId}
              onDelete={handleDeleteCareer}
            />
          );
        })}
      </div>

      {/* 경력 추가 버튼 */}
      <AddButton label="경력 추가" onClick={handleAddCareer} className="self-end" />
    </section>
  );
}
