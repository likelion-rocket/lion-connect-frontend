/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import Input from "@/components/ui/input";
import { Plus } from "lucide-react";

type PhotoComponentProps = {
  /** 서버에 이미 저장된 썸네일 URL (없으면 null) */
  initialThumbnailUrl?: string | null;
  /** 서버에 이미 저장된 썸네일 파일명 (없으면 "") */
  initialFileName?: string;
  /** 사용자가 새 파일을 선택했을 때 전달 */
  onChangeFile?: (file: File | null) => void;
};

export default function PhotoComponent({
  initialThumbnailUrl = null,
  initialFileName = "",
  onChangeFile,
}: PhotoComponentProps) {
  const [fileName, setFileName] = useState(initialFileName);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialThumbnailUrl);
  const [error, setError] = useState("");

  // 숨겨진 file input에 접근하기 위한 ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /** 서버에서 프리필된 썸네일이 뒤늦게 도착했을 때 한 번만 적용 */
  useEffect(() => {
    if (!previewUrl && initialThumbnailUrl) {
      setPreviewUrl(initialThumbnailUrl);
    }
  }, [initialThumbnailUrl, previewUrl]);

  useEffect(() => {
    if (!fileName && initialFileName) {
      setFileName(initialFileName);
    }
  }, [initialFileName, fileName]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase();
    const allowed = ["jpg", "jpeg", "png"];

    if (!ext || !allowed.includes(ext)) {
      setError("jpg 또는 png 형식의 파일만 업로드할 수 있습니다.");
      setFileName("");
      setPreviewUrl(initialThumbnailUrl ?? null);
      e.target.value = "";
      onChangeFile?.(null);
      return;
    }

    setError("");
    setFileName(file.name);
    setPreviewUrl(URL.createObjectURL(file));
    onChangeFile?.(file);
  };

  // 커스텀 인풋 영역 클릭 시 숨겨진 file input 클릭
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
        <span>프로필 사진</span>
      </div>

      <div className="flex items-center gap-8">
        {/* 미리보기 */}
        <div className="w-[120px] h-[150px] rounded-xl bg-[#E5E5E5] flex items-center justify-center overflow-hidden">
          <img
            src={previewUrl || "/images/default-profile.png"}
            alt="profile preview"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-1 items-center gap-8">
          <div className="flex-1 max-w-[520px]">
            {/* 실제 파일 선택용 input: 숨김 */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* 우리가 보는 가짜 인풋: 클릭하면 위에 숨겨진 input이 열림 */}
            <div onClick={openFileDialog}>
              <Input
                type="text"
                readOnly
                value={fileName}
                placeholder="jpg / png 파일을 업로드 해주세요. (업로드 시 파일명이 표시됩니다)"
                className={`w-full cursor-pointer ${
                  error ? "border border-[#FF3B30] text-[#FF3B30]" : "text-[#6B7280]"
                }`}
              />
            </div>

            {error && <p className="mt-2 text-[13px] text-[#FF3B30]">{error}</p>}
          </div>

          {/* 파일이 없을 때만 플러스 버튼 노출 */}
          {!fileName && (
            <button
              type="button"
              onClick={openFileDialog}
              className="flex items-center gap-2 text-[#FF6000] hover:opacity-80 font-bold text-[16px] leading-none"
            >
              <Plus size={20} className="text-[#FF6000]" />
              <span>사진 파일 업로드</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
