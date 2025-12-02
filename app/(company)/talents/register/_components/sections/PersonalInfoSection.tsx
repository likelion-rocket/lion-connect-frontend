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
        setValue("profile.phone", user.phoneNumber, { shouldValidate: true });
      }
      if (user.email) {
        setValue("profile.email", user.email, { shouldValidate: true });
      }
    }
  }, [user, setValue]);
  return (
    <section className="section section-personal-info flex flex-col gap-14">
      <h2 className="text-lg font-bold text-neutral-800">
        인적 사항<span className="text-red-500">*</span>
      </h2>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center shrink-0">
          <Image src="/icons/outline-user-circle.svg" alt="User" width={24} height={24} />
        </div>

        <div className="flex-1 flex flex-col gap-6">
          {/* 에러 메시지 */}
          {(errors.profile?.name || errors.profile?.phone || errors.profile?.email) && (
            <p className="text-red-500 text-sm font-normal">*필수 정보를 모두 입력해주세요.</p>
          )}

          <div className="flex items-center gap-8 flex-wrap">
            {/* 이름 */}
            <div className="flex items-center gap-2 w-64">
              <FormInput
                id="profile-name"
                type="text"
                placeholder="이름을 입력해주세요."
                className="w-full h-16 px-4 py-3 bg-white rounded-lg"
                error={!!errors.profile?.name}
                {...register("profile.name")}
              />
            </div>

            {/* 전화번호 */}
            <div className="flex items-center gap-2 w-64">
              <div className="w-12 h-12 flex items-center justify-center shrink-0">
                <Image src="/icons/outline-phone.svg" alt="Phone" width={24} height={24} />
              </div>
              <div className="px-4 py-2 rounded-lg text-neutral-400 text-base font-normal">
                {user?.phoneNumber || "010 0000 0000"}
              </div>
            </div>

            {/* 이메일 */}
            <div className="flex items-center gap-2 w-64">
              <div className="w-12 h-12 flex items-center justify-center shrink-0">
                <Image src="/icons/outline-mail.svg" alt="Email" width={24} height={24} />
              </div>
              <div className="p-4 rounded-lg text-neutral-400 text-base font-normal">
                {user?.email || "email@gmail.com"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
