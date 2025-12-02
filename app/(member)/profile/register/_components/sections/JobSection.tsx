"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { useMemo } from "react";
import Image from "next/image";
import FilterSelect from "@/components/form/FilterSelect";
import { JOB_GROUPS, findJobGroupByCode } from "@/constants/jobMapping";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";

/**
 * 직군 및 직무 선택 섹션 컴포넌트
 * 필드: job.category, job.role
 *
 * API 응답 형식:
 * - jobCategories[0]: 직군 (Job Group) { id: number, name: string }
 * - jobCategories[1]: 직무 (Job Role) { id: number, name: string }
 *
 * 데이터 흐름:
 * - API → Store (useTalentRegisterStore.jobCategories)
 * - Store → Mapper (mapApiDataToFormValues) → Form (job.category, job.role as codes)
 * - Form → UI (JOB_GROUPS constant for dropdown options)
 */

interface FilterOption {
  value: string;
  label: string;
}

export default function JobSection() {
  const { control, setValue, register } = useFormContext<TalentRegisterFormValues>();

  const selectedCategory = useWatch({ control, name: "job.category" }) || "";
  const selectedRole = useWatch({ control, name: "job.role" }) || "";

  // 필드를 React Hook Form에 등록 (isValid 계산에 포함되도록)
  register("job.category");
  register("job.role");

  const handleCategoryChange = (value: string) => {
    setValue("job.category", value, { shouldValidate: true, shouldDirty: true });
    setValue("job.role", "", { shouldValidate: true, shouldDirty: true });
  };

  const handleRoleChange = (value: string) => {
    setValue("job.role", value, { shouldValidate: true, shouldDirty: true });
  };

  // 직군 옵션: JOB_GROUPS에서 전체 직군 목록 가져오기
  const categoryOptions: FilterOption[] = useMemo(() => {
    return JOB_GROUPS.map((group) => ({
      value: group.code,
      label: group.name,
    }));
  }, []);

  // 직무 옵션: 선택된 직군에 해당하는 직무 목록
  const availableRoles: FilterOption[] = useMemo(() => {
    if (!selectedCategory) return [];

    const jobGroup = findJobGroupByCode(selectedCategory);
    if (!jobGroup) return [];

    return jobGroup.roles.map((role) => ({
      value: role.code,
      label: role.name,
    }));
  }, [selectedCategory]);

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
              key={`category-${selectedCategory}`}
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
              key={`role-${selectedRole}`}
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
