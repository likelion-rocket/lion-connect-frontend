/**
 * 학력 섹션 컴포넌트
 * 필드: education.schoolName, education.major, education.status, education.degree, education.startDate, education.endDate, education.description
 */

"use client";

import { useFormContext } from "react-hook-form";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";
import { FormInput } from "@/components/form/FormInput";
import { FormTextarea } from "@/components/form/FormTextarea";
import { FormSelect } from "@/components/form/FormSelect";
import AddButton from "../AddButton";

export default function EducationSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TalentRegisterFormValues>();
  return (
    <section className="section section-education flex flex-col gap-6 md:gap-8">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">
        학력<span className="text-text-error">*</span>
      </h2>

      {/* 학력 항목 (반복 가능 구조) */}
      <div className="education-list flex flex-col gap-6">
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

          <div className="flex-1 bg-bg-primary rounded-xl shadow-md p-4 md:p-6 flex flex-col gap-4">
            {/* 학교명 */}
            <div className="field">
              <label
                htmlFor="education-school"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                학교명<span className="required text-text-error">*</span>
              </label>
              <FormInput
                id="education-school"
                type="text"
                placeholder="학교명을 입력해주세요"
                error={!!errors.education?.schoolName}
                {...register("education.schoolName")}
              />
              {errors.education?.schoolName && (
                <p className="field-error text-sm text-text-error mt-1">
                  {errors.education.schoolName.message}
                </p>
              )}
            </div>

            {/* 전공 */}
            <div className="field">
              <label
                htmlFor="education-major"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                전공
              </label>
              <FormInput
                id="education-major"
                type="text"
                placeholder="전공을 입력해주세요"
                {...register("education.major")}
              />
            </div>

            {/* 학위 */}
            <div className="field">
              <label
                htmlFor="education-degree"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                학위
              </label>
              <FormInput
                id="education-degree"
                type="text"
                placeholder="학위를 입력해주세요 (예: 학사, 석사)"
                {...register("education.degree")}
              />
            </div>

            {/* 재학 상태 */}
            <div className="field">
              <label
                htmlFor="education-status"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                재학 상태
              </label>
              <FormSelect id="education-status" {...register("education.status")}>
                <option value="">선택해주세요</option>
                <option value="ENROLLED">재학</option>
                <option value="GRADUATED">졸업</option>
                <option value="LEAVE">휴학</option>
              </FormSelect>
            </div>

            {/* 재학 기간 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="field">
                <label
                  htmlFor="education-start-date"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  재학 시작일
                </label>
                <FormInput
                  id="education-start-date"
                  type="text"
                  placeholder="YYYY.MM"
                  {...register("education.startDate")}
                />
              </div>

              <div className="field">
                <label
                  htmlFor="education-end-date"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  재학 종료일
                </label>
                <FormInput
                  id="education-end-date"
                  type="text"
                  placeholder="YYYY.MM"
                  {...register("education.endDate")}
                />
              </div>
            </div>

            {/* 설명 */}
            <div className="field">
              <label
                htmlFor="education-description"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                설명
              </label>
              <FormTextarea
                id="education-description"
                placeholder="학력에 대한 추가 설명을 입력해주세요"
                rows={3}
                {...register("education.description")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 학력 추가 버튼 */}
      <AddButton label="학력 추가" className="self-end" />
    </section>
  );
}
