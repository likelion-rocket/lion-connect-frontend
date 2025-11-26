/**
 * 자격증 섹션 컴포넌트
 * 필드: certificates[0].name, certificates[0].issuer, certificates[0].issueDate
 * 배열 구조로 여러 개 자격증 추가 가능
 */

"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";
import { FormInput } from "@/components/form/FormInput";
import { FormContainer } from "@/components/form/FormContainer";
import AddButton from "../AddButton";

export default function CertificatesSection() {
  const [isFocused, setIsFocused] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext<TalentRegisterFormValues>();
  return (
    <section className="section section-certificates flex flex-col gap-6">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">자격증</h2>

      <div className="certificates-list flex flex-col gap-6">
        <div className="certificate-item flex items-start gap-4 md:gap-8">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
                stroke="currentColor"
                className="text-icon-secondary"
                strokeWidth="2"
              />
              <path
                d="M3 10H21"
                stroke="currentColor"
                className="text-icon-secondary"
                strokeWidth="2"
              />
            </svg>
          </div>

          <FormContainer
            isPressed={isFocused}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 rounded-xl p-4 flex flex-col gap-4"
          >
            <div className="field">
              <label
                htmlFor="certificates-0-name"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                자격증명
              </label>
              <FormInput
                id="certificates-0-name"
                type="text"
                placeholder="자격증을 입력해주세요"
                {...register("certificates.0.name")}
              />
            </div>

            <div className="field">
              <label
                htmlFor="certificates-0-issuer"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                발급 기관
              </label>
              <FormInput
                id="certificates-0-issuer"
                type="text"
                placeholder="발급 기관을 입력해주세요"
                {...register("certificates.0.issuer")}
              />
            </div>

            <div className="field">
              <label
                htmlFor="certificates-0-issue-date"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                취득일자
              </label>
              <FormInput
                id="certificates-0-issue-date"
                type="text"
                placeholder="YYYY.MM"
                {...register("certificates.0.issueDate")}
              />
            </div>
          </FormContainer>
        </div>
      </div>

      <AddButton label="자격증 추가" className="self-end" />
    </section>
  );
}
