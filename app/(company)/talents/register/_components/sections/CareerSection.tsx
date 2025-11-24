/**
 * 경력 섹션 컴포넌트
 * 필드: career.companyName, career.department, career.position, career.startDate, career.endDate, career.isCurrent, career.description
 */

"use client";

import { useFormContext } from "react-hook-form";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";
import { FormInput } from "@/components/form/FormInput";
import { FormTextarea } from "@/components/form/FormTextarea";
import AddButton from "../AddButton";

export default function CareerSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TalentRegisterFormValues>();
  return (
    <section className="section section-career flex flex-col gap-6 md:gap-8">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">경력</h2>

      {/* 경력 항목 (반복 가능 구조) */}
      <div className="career-list flex flex-col gap-6">
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

          <div className="flex-1 bg-bg-primary rounded-xl shadow-md p-4 md:p-6 flex flex-col gap-4">
            {/* 회사명 */}
            <div className="field">
              <label
                htmlFor="career-company"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                회사명
              </label>
              <FormInput
                id="career-company"
                type="text"
                placeholder="회사명을 입력해주세요"
                {...register("career.companyName")}
              />
            </div>

            {/* 부서 */}
            <div className="field">
              <label
                htmlFor="career-department"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                부서
              </label>
              <FormInput
                id="career-department"
                type="text"
                placeholder="부서를 입력해주세요"
                {...register("career.department")}
              />
            </div>

            {/* 직책 */}
            <div className="field">
              <label
                htmlFor="career-position"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                직책
              </label>
              <FormInput
                id="career-position"
                type="text"
                placeholder="직책을 입력해주세요"
                {...register("career.position")}
              />
            </div>

            {/* 근무 기간 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="field">
                <label
                  htmlFor="career-start-date"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  근무 시작일
                </label>
                <FormInput
                  id="career-start-date"
                  type="text"
                  placeholder="YYYY.MM"
                  {...register("career.startDate")}
                />
              </div>

              <div className="field">
                <label
                  htmlFor="career-end-date"
                  className="block text-sm font-medium text-text-secondary mb-2"
                >
                  근무 종료일
                </label>
                <FormInput
                  id="career-end-date"
                  type="text"
                  placeholder="YYYY.MM"
                  {...register("career.endDate")}
                />
              </div>
            </div>

            {/* 재직 중 */}
            <div className="field">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-border-quaternary text-bg-accent focus:ring-bg-accent"
                  {...register("career.isCurrent")}
                />
                <span className="text-sm font-medium text-text-secondary">재직 중</span>
              </label>
            </div>

            {/* 담당 업무 */}
            <div className="field">
              <label
                htmlFor="career-description"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                담당 업무/설명
              </label>
              <FormTextarea
                id="career-description"
                placeholder="담당 업무를 입력해주세요"
                rows={3}
                {...register("career.description")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 경력 추가 버튼 */}
      <AddButton label="경력 추가" className="self-end" />
    </section>
  );
}
