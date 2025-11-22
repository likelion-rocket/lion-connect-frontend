/**
 * 수상/활동/기타 섹션 컴포넌트
 * 필드: activities[0].title, activities[0].organization, activities[0].awardDate, activities[0].description
 * 배열 구조로 여러 개 활동 추가 가능
 */

"use client";

import { useFormContext } from "react-hook-form";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";
import { FormInput } from "@/components/form/FormInput";
import { FormTextarea } from "@/components/form/FormTextarea";
import AddButton from "../AddButton";

export default function ActivitiesSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TalentRegisterFormValues>();
  return (
    <section className="section section-activities flex flex-col gap-6">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">수상 / 활동 / 기타</h2>

      <div className="activities-list flex flex-col gap-6">
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

          <div className="flex-1 bg-bg-primary rounded-xl shadow-md p-4 md:p-6 flex flex-col gap-4">
            {/* 활동명 */}
            <div className="field">
              <label
                htmlFor="activities-0-title"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                활동명/수상명
              </label>
              <FormInput
                id="activities-0-title"
                type="text"
                placeholder="활동명/수상명을 입력해주세요"
                {...register("activities.0.title")}
              />
            </div>

            {/* 주최 기관 */}
            <div className="field">
              <label
                htmlFor="activities-0-organization"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                주최 기관
              </label>
              <FormInput
                id="activities-0-organization"
                type="text"
                placeholder="주최 기관을 입력해주세요"
                {...register("activities.0.organization")}
              />
            </div>

            {/* 수상/활동 일자 */}
            <div className="field">
              <label
                htmlFor="activities-0-award-date"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                수상/활동 일자
              </label>
              <FormInput
                id="activities-0-award-date"
                type="text"
                placeholder="YYYY.MM"
                {...register("activities.0.awardDate")}
              />
            </div>

            {/* 활동 내용 */}
            <div className="field">
              <label
                htmlFor="activities-0-description"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                활동 내용
              </label>
              <FormTextarea
                id="activities-0-description"
                placeholder="활동 내용을 입력해주세요"
                rows={3}
                {...register("activities.0.description")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 활동 추가 버튼 */}
      <AddButton label="활동 추가" className="self-end" />
    </section>
  );
}
