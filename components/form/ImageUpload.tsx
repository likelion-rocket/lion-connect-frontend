/**
 * ImageUpload - 이미지 업로드 컴포넌트
 *
 * 최대 5개의 이미지를 업로드할 수 있는 컴포넌트
 * - Drag & Drop 지원
 * - 미리보기 기능
 * - React Hook Form 연동 가능
 */

"use client";

import { useRef, useState } from "react";
import { cn } from "@/utils/utils";

interface ImageUploadProps {
  /**
   * 현재 선택된 이미지 파일들
   */
  value?: File[];

  /**
   * 이미지 변경 콜백
   */
  onChange?: (files: File[]) => void;

  /**
   * 기존 이미지 URL들 (수정 모드에서 사용)
   */
  existingImageUrls?: string[];

  /**
   * 최대 업로드 가능한 이미지 개수
   */
  maxImages?: number;

  /**
   * 에러 상태
   */
  error?: boolean;
}

export function ImageUpload({
  value = [],
  onChange,
  existingImageUrls = [],
  maxImages = 5,
  error
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // 초기 미리보기 URL은 기존 이미지 URL들로 설정
  const [previewUrls, setPreviewUrls] = useState<string[]>(existingImageUrls);

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    const remainingSlots = maxImages - previewUrls.length;
    const filesToAdd = newFiles.slice(0, remainingSlots);

    const totalFiles = [...value, ...filesToAdd];

    // 새로 추가된 파일들의 미리보기 URL만 생성
    const newFileUrls = filesToAdd.map(file => URL.createObjectURL(file));
    setPreviewUrls([...previewUrls, ...newFileUrls]);

    onChange?.(totalFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (index: number) => {
    // 기존 이미지 URL인지 새로 업로드한 File인지 구분
    const isExistingImage = index < existingImageUrls.length;

    if (isExistingImage) {
      // 기존 이미지를 삭제하는 경우: previewUrls만 업데이트
      const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
      setPreviewUrls(newPreviewUrls);
      // TODO: 기존 이미지 삭제 로직 추가 필요 (백엔드 API 연동)
    } else {
      // 새로 업로드한 파일을 삭제하는 경우
      const fileIndex = index - existingImageUrls.length;
      const newFiles = value.filter((_, i) => i !== fileIndex);
      const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
      setPreviewUrls(newPreviewUrls);
      onChange?.(newFiles);
    }
  };

  return (
    <div className="self-stretch px-1 inline-flex justify-start items-center gap-5 flex-wrap content-center overflow-hidden">
      {/* 업로드된 이미지 미리보기 */}
      {previewUrls.map((url, index) => (
        <div key={index} className="relative w-72 h-44 group">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={url}
            alt={`Preview ${index + 1}`}
          />
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}

      {/* 이미지 업로드 버튼 */}
      {previewUrls.length < maxImages && (
        <button
          type="button"
          onClick={handleClick}
          className={cn(
            "w-72 h-44 relative bg-neutral-100 rounded-lg overflow-hidden",
            "hover:bg-neutral-200 transition-colors",
            "flex items-center justify-center",
            error && "outline outline-2 outline-red-500"
          )}
        >
          <div className="w-12 h-12 bg-white rounded-[99px] overflow-hidden flex items-center justify-center">
            <svg
              className="w-6 h-6 text-neutral-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileChange(e.target.files)}
            className="hidden"
          />
        </button>
      )}
    </div>
  );
}
