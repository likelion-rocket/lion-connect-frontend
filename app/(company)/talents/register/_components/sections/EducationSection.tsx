/**
 * 학력 섹션 컴포넌트
 * 필드: educations[].schoolName, educations[].major, educations[].status, educations[].degree, educations[].startDate, educations[].endDate, educations[].description
 * 배열 구조로 여러 개 학력 추가 가능
 */

"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";
import AddButton from "../AddButton";
import EducationItem from "./EducationItem";

export default function EducationSection() {
  const { control } = useFormContext<TalentRegisterFormValues>();

  // useFieldArray로 배열 관리
  const { fields, append } = useFieldArray({
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

  return (
    <section className="section section-education flex flex-col gap-6 md:gap-8">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">
        학력<span className="text-text-error">*</span>
      </h2>

      {/* 학력 항목 (반복 가능 구조) */}
      <div className="education-list flex flex-col gap-6">
        {fields.map((field, index) => (
          <EducationItem key={field.id} index={index} />
        ))}
      </div>

      {/* 학력 추가 버튼 */}
      <AddButton label="학력 추가" onClick={handleAddEducation} className="self-end" />
    </section>
  );
}
