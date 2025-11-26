/**
 * 포트폴리오 섹션 컴포넌트
 * 필드: portfolio
 */

"use client";

import { useFormContext } from "react-hook-form";
import Image from "next/image";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";

export default function PortfolioSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TalentRegisterFormValues>();

  return (
    <section className="section section-portfolio flex flex-col gap-6">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">
        포트폴리오<span className="text-text-error">*</span>
      </h2>

      <div className="flex items-start gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0">
          <Image
            src="/icons/outline-link.svg"
            alt="포트폴리오"
            width={24}
            height={24}
            className="text-icon-secondary"
          />
        </div>

        <div className="flex-1">
          <div className="field">
            <label
              htmlFor="portfolio"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              포트폴리오 링크<span className="required text-text-error">*</span>
            </label>
            <input
              id="portfolio"
              type="url"
              placeholder="포트폴리오 링크를 입력해주세요"
              className="lc-input w-full h-14 px-4 py-3 bg-bg-primary border border-border-quaternary rounded-lg text-base text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-border-accent transition-colors"
              {...register("portfolio")}
            />
            {errors.portfolio && (
              <p className="field-error text-sm text-text-error mt-1">{errors.portfolio.message}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
