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

export default function CareerSection() {
  const { control, getValues } = useFormContext<TalentRegisterFormValues>();
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // useFieldArray로 배열 관리
  const { fields, append, remove } = useFieldArray({
    control,
    name: "careers",
  });

  // 경력 추가 핸들러
  const handleAddCareer = () => {
    append({
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
    console.log("CareerSection.handleDeleteCareer 호출됨:", {
      index,
      careerId,
    });

    try {
      setDeleteError(null);

      // 서버에서 데이터가 있는 경우 (id 존재) - DELETE API 호출
      if (careerId) {
        console.log(`API 호출: DELETE /api/profile/experiences/${careerId}`);
        await deleteExperience(careerId);
        console.log(`경력 #${careerId} 삭제 완료`);
      } else {
        console.log("신규 데이터이므로 서버 DELETE API 호출 스킵");
      }

      // 폼에서 필드 제거
      console.log(`폼 필드 제거: index=${index}`);
      remove(index);
      console.log("삭제 완료");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "경력 삭제에 실패했습니다.";
      setDeleteError(errorMessage);
      console.error("경력 삭제 실패:", error);
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
          console.log(`CareerItem 렌더링: index=${index}, careerId=${careerId}`, {
            field,
            careerData: allCareers?.[index],
          });
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
