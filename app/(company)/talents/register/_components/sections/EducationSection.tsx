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

export default function EducationSection() {
  const { control, getValues } = useFormContext<TalentRegisterFormValues>();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // useFieldArray로 배열 관리
  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });

  // 학력 추가 핸들러
  const handleAddEducation = () => {
    append({
      schoolName: "",
      major: "",
      status: undefined,
      startDate: "",
      endDate: "",
      description: "",
      degree: "",
    });
  };

  // 학력 삭제 핸들러
  const handleDeleteEducation = async (index: number, educationId?: number) => {
    console.log("EducationSection.handleDeleteEducation 호출됨:", {
      index,
      educationId,
    });

    try {
      setDeleteError(null);

      // 서버에서 데이터가 있는 경우 (id 존재) - DELETE API 호출
      if (educationId) {
        console.log(`API 호출: DELETE /api/profile/educations/${educationId}`);
        await deleteEducation(educationId);
        console.log(`학력 #${educationId} 삭제 완료`);
      } else {
        console.log("신규 데이터이므로 서버 DELETE API 호출 스킵");
      }

      // 폼에서 필드 제거
      console.log(`폼 필드 제거: index=${index}`);
      remove(index);
      console.log("삭제 완료");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "학력 삭제에 실패했습니다.";
      setDeleteError(errorMessage);
      console.error("학력 삭제 실패:", error);
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
          console.log(`EducationItem 렌더링: index=${index}, educationId=${educationId}`, {
            field,
            educationData: allEducations?.[index],
          });
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
