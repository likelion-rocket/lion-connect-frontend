"use client";

import { useFormContext, useWatch } from "react-hook-form";
import Image from "next/image";
import FilterSelect from "@/components/form/FilterSelect";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";

/**
 * 직군 및 직무 선택 섹션 컴포넌트
 * 필드: job.category, job.role
 */

type JobCategory = "develop" | "design" | "data" | "marketing" | "pm";

interface JobRole {
  value: string;
  label: string;
}

interface JobCategoryConfig {
  value: JobCategory;
  label: string;
  roles: JobRole[];
}

const JOB_CATEGORIES: JobCategoryConfig[] = [
  {
    value: "develop",
    label: "개발",
    roles: [
      { value: "frontend", label: "프론트엔드" },
      { value: "backend", label: "백엔드" },
      { value: "ios", label: "iOS" },
      { value: "android", label: "Android" },
      { value: "unity", label: "Unity" },
      { value: "ai", label: "AI" },
    ],
  },
  {
    value: "design",
    label: "디자인",
    roles: [{ value: "ui-ux", label: "UI/UX" }],
  },
  {
    value: "data",
    label: "데이터 분석",
    roles: [{ value: "data-analysis", label: "데이터 분석" }],
  },
  {
    value: "marketing",
    label: "마케팅",
    roles: [{ value: "growth-marketing", label: "그로스 마케팅" }],
  },
  {
    value: "pm",
    label: "기획",
    roles: [{ value: "pm", label: "PM" }],
  },
];

export default function JobSection() {
  const { control, setValue } = useFormContext<TalentRegisterFormValues>();

  const selectedCategory = useWatch({ control, name: "job.category" });
  const selectedRole = useWatch({ control, name: "job.role" });

  const handleCategoryChange = (value: string) => {
    setValue("job.category", value, { shouldValidate: true, shouldDirty: true });
    setValue("job.role", "", { shouldValidate: true, shouldDirty: true });
  };

  const handleRoleChange = (value: string) => {
    setValue("job.role", value, { shouldValidate: true, shouldDirty: true });
  };

  const categoryOptions = JOB_CATEGORIES.map((cat) => ({
    value: cat.value,
    label: cat.label,
  }));

  const availableRoles = JOB_CATEGORIES.find((cat) => cat.value === selectedCategory)?.roles || [];

  return (
    <section className="section section-job flex flex-col gap-6 md:gap-8">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">
        직군 및 직무 선택<span className="text-text-error">*</span>
      </h2>

      <div className="flex items-start gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0">
          <Image
            src="/icons/outline-clipboard.svg"
            alt="직군 및 직무"
            width={24}
            height={24}
            className="text-icon-secondary"
          />
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 직군 선택 */}
          <div className="field">
            <label
              htmlFor="job-category"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              직군<span className="required text-text-error">*</span>
            </label>
            <FilterSelect
              value={selectedCategory}
              onValueChange={handleCategoryChange}
              options={categoryOptions}
              placeholder="직군 선택"
              width="w-full"
            />
            <p className="field-error text-sm text-text-error mt-1"></p>
          </div>

          {/* 직무 선택 */}
          <div className="field">
            <label
              htmlFor="job-role"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              직무<span className="required text-text-error">*</span>
            </label>
            <FilterSelect
              value={selectedRole}
              onValueChange={handleRoleChange}
              options={availableRoles}
              placeholder={selectedCategory ? "직무 선택" : "먼저 직군을 선택하세요"}
              width="w-full"
            />
            <p className="field-error text-sm text-text-error mt-1"></p>
          </div>
        </div>
      </div>
    </section>
  );
}
