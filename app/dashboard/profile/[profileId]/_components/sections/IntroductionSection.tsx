/**
 * 간단 소개 섹션 컴포넌트
 * 필드: profile.introduction
 */

"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { useState } from "react";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";

export default function IntroductionSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TalentRegisterFormValues>();

  const introduction = useWatch({
    control,
    name: "profile.introduction",
  });
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className="section section-introduction flex flex-col gap-4 md:gap-6">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">
        간단 소개<span className="text-text-error">*</span>
      </h2>

      <div className="field">
        <label htmlFor="profile-introduction" className="sr-only">
          자기소개
        </label>
        <div
          className={`relative bg-bg-primary rounded-lg p-4 transition-all duration-200 border border-transparent hover:border-border-accent ${
            (introduction || isFocused) &&
            "shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-2px_rgba(0,0,0,0.05)]"
          }`}
        >
          <textarea
            id="profile-introduction"
            placeholder="자기소개를 입력해주세요 (최대 500자)"
            rows={4}
            maxLength={500}
            className="w-full bg-transparent text-base text-text-primary placeholder:text-text-tertiary focus:outline-none transition-colors resize-none"
            onFocus={() => setIsFocused(true)}
            {...register("profile.introduction", {
              onBlur: () => setIsFocused(false),
            })}
          />
        </div>
        {errors.profile?.introduction && (
          <p className="field-error text-sm text-text-error mt-1">
            {errors.profile.introduction.message}
          </p>
        )}
      </div>
    </section>
  );
}
