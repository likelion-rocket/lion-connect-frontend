/**
 * 프로필 사진 섹션 컴포넌트
 * 필드: profile.avatar (파일 업로드)
 */

"use client";

import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";
import AddButton from "../AddButton";

export default function ProfileImageSection() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TalentRegisterFormValues>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const avatarValue = watch("profile.avatar");
  const fileName = fileInputRef.current?.files?.[0]?.name || "";

  // 이미지 URL 결정: 로컬 미리보기 > API 값 > 기본 이미지
  const displayImageUrl =
    previewUrl ||
    (typeof avatarValue === "string" ? avatarValue : null) ||
    "/images/default-profile.png";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 타입 검증
      if (!file.type.match(/^image\/(jpeg|png)$/)) {
        return;
      }

      // 파일을 폼에 저장
      setValue("profile.avatar", file, { shouldValidate: true });

      // 미리보기 URL 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="section section-profile-image flex flex-col gap-6 md:gap-8">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">프로필 사진</h2>

      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
        {/* 프로필 이미지 미리보기 */}
        <div className="w-32 h-40 md:w-40 md:h-[199px] bg-bg-tertiary rounded-lg overflow-hidden flex items-center justify-center shrink-0 relative">
          <Image
            src={displayImageUrl}
            alt="프로필 사진"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 128px, 160px"
          />
        </div>

        {/* 파일 업로드 필드 */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="field">
            <label htmlFor="profile-avatar" className="sr-only">
              프로필 사진 업로드
            </label>
            <input
              ref={fileInputRef}
              id="profile-avatar"
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="flex items-center gap-4">
              <div className="flex-1 h-14 md:h-16 px-4 py-3 bg-bg-primary border border-border-quaternary rounded-lg flex items-center">
                <p className="text-sm md:text-base text-text-tertiary truncate">
                  {fileName || "jpg 나 png 사진을 첨부해주세요."}
                </p>
              </div>
              <AddButton label="사진 파일 업로드" onClick={handleButtonClick} />
            </div>
            {errors.profile?.avatar && (
              <p className="field-error text-sm text-text-error mt-1">
                {String(errors.profile.avatar.message || "")}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
