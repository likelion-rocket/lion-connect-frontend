"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";
import AddButton from "../AddButton";
import { useTalentRegisterStore } from "@/store/talentRegisterStore";

export default function ProfileImageSection() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<TalentRegisterFormValues>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Store에서 기존 썸네일 가져오기
  const profileLinks = useTalentRegisterStore((state) => state.profileLinks);

  // THUMBNAIL 타입의 링크 찾기 (useMemo로 최적화)
  const existingThumbnail = useMemo(
    () => profileLinks.find((link) => link.type === "THUMBNAIL"),
    [profileLinks]
  );

  // 새로 선택한 파일
  const selectedFile = watch("profile.avatar");

  // 미리보기 URL
  const [previewUrl, setPreviewUrl] = useState<string>("/images/default-profile.png");

  /**
   * 초기 로드: Store의 기존 썸네일 표시
   * existingThumbnail이 변경될 때마다 미리보기 업데이트
   * 캐시 버스터 추가하여 브라우저 캐시 문제 방지
   */
  useEffect(() => {
    if (existingThumbnail?.url) {
      // S3 URL이 같은 경로에 덮어쓰기하므로 캐시 버스터 추가
      const cacheBustedUrl = `${existingThumbnail.url}${existingThumbnail.url.includes("?") ? "&" : "?"}v=${Date.now()}`;
      setPreviewUrl(cacheBustedUrl);
    } else {
      setPreviewUrl("/images/default-profile.png");
    }
  }, [existingThumbnail]);

  /**
   * 새 파일 선택 시: Object URL로 즉시 미리보기
   */
  useEffect(() => {
    if (selectedFile instanceof File) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, [selectedFile]);

  /**
   * 파일명 표시
   * - File 객체: 새로 선택한 파일명
   * - 문자열 (URL 아님): 임시저장 후 저장된 파일명
   * - 기존 썸네일: store에서 가져온 originalFilename
   */
  const displayFileName =
    selectedFile instanceof File
      ? selectedFile.name
      : typeof selectedFile === "string" && selectedFile && !selectedFile.startsWith("http")
        ? selectedFile // 임시저장 후 저장된 파일명 (URL이 아닌 경우만)
        : existingThumbnail?.originalFilename || "jpg 나 png 사진을 첨부해주세요.";

  /**
   * 파일 선택 핸들러
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 타입 검증
    if (!file.type.match(/^image\/(jpeg|png)$/)) {
      alert("jpg 또는 png 파일만 업로드 가능합니다.");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // React Hook Form에 저장
    setValue("profile.avatar", file, { shouldValidate: true, shouldDirty: true });
  };

  /**
   * 파일 선택 창 열기
   */
  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="section section-profile-image flex flex-col gap-6 md:gap-8">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">프로필 사진</h2>

      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
        {/* 프로필 이미지 미리보기 */}
        <button
          type="button"
          onClick={handleOpenFilePicker}
          className="w-32 h-40 md:w-40 md:h-[199px] bg-bg-tertiary rounded-lg overflow-hidden flex items-center justify-center shrink-0 relative cursor-pointer hover:opacity-90 transition-opacity"
        >
          <Image
            src={previewUrl}
            alt="프로필 사진"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 128px, 160px"
          />
        </button>

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
              {/* 파일명 표시 */}
              <button
                type="button"
                onClick={handleOpenFilePicker}
                className="flex-1 h-14 md:h-16 px-4 py-3 bg-bg-primary border border-border-quaternary rounded-lg flex items-center hover:bg-bg-tertiary transition-colors cursor-pointer"
              >
                <p className="text-sm md:text-base text-text-tertiary truncate text-left">
                  {displayFileName}
                </p>
              </button>
              <AddButton label="사진 파일 업로드" onClick={handleOpenFilePicker} />
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
