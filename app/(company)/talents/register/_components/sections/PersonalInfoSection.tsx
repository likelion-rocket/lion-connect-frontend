/**
 * 인적사항 섹션 컴포넌트
 * 필드: profile.name, profile.phone, profile.email
 */

"use client";

import { useFormContext } from "react-hook-form";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";
import { FormInput } from "@/components/form/FormInput";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function PersonalInfoSection() {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<TalentRegisterFormValues>();

  const user = useAuthStore((state) => state.user);

  // user 정보가 있으면 전화번호와 이메일을 자동으로 채움
  useEffect(() => {
    if (user) {
      if (user.phoneNumber) {
        setValue("profile.phone", user.phoneNumber);
      }
      if (user.email) {
        setValue("profile.email", user.email);
      }
    }
  }, [user, setValue]);
  return (
    <section className="section section-personal-info flex flex-col gap-6 md:gap-8">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">
        인적 사항<span className="text-text-error">*</span>
      </h2>

      <div className="flex items-start gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0">
          <Image
            src="/icons/outline-user-circle.svg"
            alt="User"
            width={24}
            height={24}
            className="text-icon-secondary"
          />
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* 이름 */}
          <div className="field">
            <label
              htmlFor="profile-name"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              이름<span className="required text-text-error">*</span>
            </label>
            <FormInput
              id="profile-name"
              type="text"
              placeholder="이름을 입력해주세요"
              error={!!errors.profile?.name}
              {...register("profile.name")}
            />
            {errors.profile?.name && (
              <p className="field-error text-sm text-text-error mt-1">
                {errors.profile.name.message}
              </p>
            )}
          </div>

          {/* 전화번호 */}
          <div className="field">
            <label
              htmlFor="profile-phone"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              전화번호<span className="required text-text-error">*</span>
            </label>
            <FormInput
              id="profile-phone"
              type="tel"
              placeholder="010 0000 0000"
              error={!!errors.profile?.phone}
              {...register("profile.phone")}
            />
            {errors.profile?.phone && (
              <p className="field-error text-sm text-text-error mt-1">
                {errors.profile.phone.message}
              </p>
            )}
          </div>

          {/* 이메일 */}
          <div className="field">
            <label
              htmlFor="profile-email"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              이메일<span className="required text-text-error">*</span>
            </label>
            <FormInput
              id="profile-email"
              type="email"
              placeholder="email@example.com"
              error={!!errors.profile?.email}
              {...register("profile.email")}
            />
            {errors.profile?.email && (
              <p className="field-error text-sm text-text-error mt-1">
                {errors.profile.email.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
