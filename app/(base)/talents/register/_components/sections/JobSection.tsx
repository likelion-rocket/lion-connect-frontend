"use client";

import { useState } from "react";

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
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    setSelectedRole("");
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
  };

  const availableRoles = JOB_CATEGORIES.find((cat) => cat.value === selectedCategory)?.roles || [];

  return (
    <section className="section section-job flex flex-col gap-6 md:gap-8">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">
        직군 및 직무 선택<span className="text-text-error">*</span>
      </h2>

      <div className="flex items-start gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect
              x="5"
              y="4"
              width="14"
              height="16"
              rx="2"
              stroke="currentColor"
              className="text-icon-secondary"
              strokeWidth="2"
            />
            <path
              d="M9 2V6M15 2V6M5 9H19"
              stroke="currentColor"
              className="text-icon-secondary"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
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
            <select
              id="job-category"
              name="job.category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full h-14 px-4 bg-bg-tertiary rounded-lg border border-transparent text-base text-text-primary focus:outline-none focus:border-border-accent transition-colors"
            >
              <option value="" disabled hidden>
                직군 선택
              </option>
              {JOB_CATEGORIES.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
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
            <select
              id="job-role"
              name="job.role"
              value={selectedRole}
              onChange={handleRoleChange}
              disabled={!selectedCategory}
              className="w-full h-14 px-4 bg-bg-tertiary rounded-lg border border-transparent text-base text-text-primary focus:outline-none focus:border-border-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="" disabled hidden>
                {selectedCategory ? "직무 선택" : "먼저 직군을 선택하세요"}
              </option>
              {availableRoles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            <p className="field-error text-sm text-text-error mt-1"></p>
          </div>
        </div>
      </div>
    </section>
  );
}
