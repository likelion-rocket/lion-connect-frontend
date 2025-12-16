/**
 * 포트폴리오 섹션 컴포넌트
 * 필드: portfolioFile
 */

"use client";

import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";
import AddButton from "../AddButton";
import { useTalentRegisterStore } from "@/store/talentRegisterStore";

export default function PortfolioSection() {
  const {
    setValue,
    watch,
    register,
    formState: { errors },
  } = useFormContext<TalentRegisterFormValues>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 필드를 React Hook Form에 등록 (isValid 계산에 포함되도록)
  register("portfolioFile");

  // Store에서 기존 포트폴리오 가져오기 (파일명 표시용)
  const profileLinks = useTalentRegisterStore((state) => state.profileLinks);
  const existingPortfolio = profileLinks.find((link) => link.type === "PORTFOLIO");

  // 폼에 저장된 파일 (File 객체 또는 기존 포트폴리오 정보)
  const selectedFile = watch("portfolioFile");

  // 포트폴리오 초기화는 useInitializeTalentForm 훅에서 처리

  /**
   * 파일 선택 핸들러
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 타입 검증 (PDF만 허용)
    if (file.type !== "application/pdf") {
      alert("PDF 파일만 업로드 가능합니다.");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // React Hook Form에 저장
    setValue("portfolioFile", file, { shouldValidate: true, shouldDirty: true });
  };

  /**
   * 파일 선택 창 열기
   */
  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  /**
   * 파일명 표시
   */
  const displayFileName =
    selectedFile instanceof File
      ? selectedFile.name
      : selectedFile?.originalFilename ||
        existingPortfolio?.originalFilename ||
        "PDF 파일을 첨부해주세요.";

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
            <input
              ref={fileInputRef}
              id="portfolio-file"
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="flex items-center gap-4">
              {/* 파일명 표시 */}
              <button
                type="button"
                onClick={handleOpenFilePicker}
                className="flex-1 h-14 px-4 py-3 bg-bg-primary border border-border-quaternary rounded-lg flex items-center hover:bg-bg-tertiary transition-colors cursor-pointer"
              >
                <p className="text-sm md:text-base text-text-tertiary truncate text-left">
                  {displayFileName}
                </p>
              </button>
              <AddButton label="PDF 파일 업로드" onClick={handleOpenFilePicker} />
            </div>
            {errors.portfolioFile && (
              <p className="field-error text-sm text-text-error mt-1">
                {String(errors.portfolioFile.message || "")}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
