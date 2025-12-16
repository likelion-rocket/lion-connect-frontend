"use client";

import { useMemo } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { FormField } from "@/components/form/FormField";
import FilterSelect from "@/components/form/FilterSelect";
import { JOB_GROUPS, findJobGroupByCode } from "@/constants/jobMapping";
import { JobFormData } from "@/types/job";

interface FilterOption {
  value: string;
  label: string;
}

interface JobCategorySelectProps {
  control: Control<JobFormData>;
  errors: FieldErrors<JobFormData>;
  selectedCategory: string;
  selectedRoleId: number;
  onCategoryChange: (value: string) => void;
  onRoleChange: (value: number) => void;
}

/**
 * 채용 공고용 직군/직무 선택 컴포넌트
 * JobForm에 통합되어 사용
 */
export function JobCategorySelect({
  control,
  errors,
  selectedCategory,
  selectedRoleId,
  onCategoryChange,
  onRoleChange,
}: JobCategorySelectProps) {
  // 직군 옵션
  const categoryOptions: FilterOption[] = useMemo(() => {
    return JOB_GROUPS.map((group) => ({
      value: group.code,
      label: group.name,
    }));
  }, []);

  // 직무 옵션
  const roleOptions: FilterOption[] = useMemo(() => {
    if (!selectedCategory) return [];

    const jobGroup = findJobGroupByCode(selectedCategory);
    if (!jobGroup) return [];

    return jobGroup.roles.map((role) => ({
      value: String(role.id),
      label: role.name,
    }));
  }, [selectedCategory]);

  return (
    <div className="self-stretch flex gap-6">
      {/* 직군 선택 */}
      <div className="flex-1">
        <FormField label="직군" required error={errors.jobRoleId?.message}>
          <Controller
            name="jobRoleId"
            control={control}
            render={() => (
              <FilterSelect
                key={`category-${selectedCategory}`}
                value={selectedCategory}
                onValueChange={onCategoryChange}
                options={categoryOptions}
                placeholder="직군 선택"
                width="w-full"
              />
            )}
          />
        </FormField>
      </div>

      {/* 직무 선택 */}
      <div className="flex-1">
        <FormField label="직무" required error={errors.jobRoleId?.message}>
          <Controller
            name="jobRoleId"
            control={control}
            render={({ field }) => (
              <FilterSelect
                key={`role-${selectedRoleId}`}
                value={String(selectedRoleId || "")}
                onValueChange={(value) => {
                  const roleId = Number(value);
                  field.onChange(roleId);
                  onRoleChange(roleId);
                }}
                options={roleOptions}
                placeholder={selectedCategory ? "직무 선택" : "먼저 직군을 선택하세요"}
                width="w-full"
              />
            )}
          />
        </FormField>
      </div>
    </div>
  );
}
