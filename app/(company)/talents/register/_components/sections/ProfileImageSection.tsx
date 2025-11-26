/**
 * 프로필 사진 섹션 컴포넌트
 * 필드: profile.avatar (파일 업로드)
 *
 * 데이터 흐름:
 * 1. 기존 썸네일은 profileLinks에서 가져와서 표시 (url, originalFilename)
 * 2. 새 파일 선택 시 로컬 미리보기 표시 및 File 객체 저장
 * 3. 제출 시 submitTalentRegister에서 S3 업로드 처리
 */

"use client";

import { useRef, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";
import AddButton from "../AddButton";
import { useTalentRegisterStore } from "@/store/talentRegisterStore";

export default function ProfileImageSection() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TalentRegisterFormValues>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  // Store에서 기존 썸네일 정보 가져오기
  const profileLinks = useTalentRegisterStore((state) => state.profileLinks);
  const existingThumbnail = profileLinks.find((link) => link.type === "THUMBNAIL");

  const avatarValue = watch("profile.avatar");

  // API에서 받아온 URL을 초기 미리보기로 설정
  useEffect(() => {
    if (typeof avatarValue === "string" && avatarValue && !previewUrl) {
      setPreviewUrl(avatarValue);
    }
  }, [avatarValue, previewUrl]);

  // 파일명 결정: 새로 선택한 파일명 > 기존 originalFilename > 안내 문구
  const displayFileName =
    selectedFileName || existingThumbnail?.originalFilename || "jpg 나 png 사진을 첨부해주세요.";

  // 이미지 URL 결정: 로컬 미리보기 > API URL > 기본 이미지
  const displayImageUrl =
    previewUrl ||
    existingThumbnail?.url ||
    (typeof avatarValue === "string" ? avatarValue : null) ||
    "/images/default-profile.png";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 타입 검증
      if (!file.type.match(/^image\/(jpeg|png)$/)) {
        alert("jpg 또는 png 파일만 업로드 가능합니다.");
        return;
      }

      // 파일을 폼에 저장
      setValue("profile.avatar", file, { shouldValidate: true, shouldDirty: true });

      // 선택한 파일명 저장
      setSelectedFileName(file.name);

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
                  {displayFileName}
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
