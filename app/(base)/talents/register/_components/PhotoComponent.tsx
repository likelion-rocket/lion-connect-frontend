"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "@/components/ui/input";
import { Plus } from "lucide-react";

export default function PhotoComponent() {
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase();
    const allowed = ["jpg", "jpeg", "png"];

    if (!ext || !allowed.includes(ext)) {
      setError("jpg 또는 png 형식의 파일만 업로드할 수 있습니다.");
      setFileName("");
      setPreviewUrl(null);
      e.target.value = "";
      return;
    }

    setError("");
    setFileName(file.name);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const clearExternalState = () => {
    setFileName("");
    setPreviewUrl(null);
    setError("");
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
        <span>프로필 사진</span>
      </div>

      <div className="flex items-center gap-8">
        {/* 미리보기 */}
        <div className="w-[120px] h-[150px] rounded-xl bg-[#E5E5E5] flex items-center justify-center overflow-hidden">
          <Image
            src={previewUrl || "/images/default-profile.png"}
            alt="profile preview"
            width={120}
            height={150}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 파일 인풋 + (파일 없을 때만) 업로드 버튼 */}
        <div className="flex flex-1 items-center gap-8">
          <div className="flex-1 max-w-[520px]">
            <Input
              type="file"
              placeholder="jpg / png 파일을 업로드 해주세요. (업로드 시 파일명이 표시됩니다)"
              onChange={handleFileChange}
              onFileClear={clearExternalState}
              hideClear
              showClearWhenFilled
              className={`w-full cursor-pointer ${
                error ? "border border-[#FF3B30] text-[#FF3B30]" : "text-[#6B7280]"
              }`}
            />
            {error && <p className="mt-2 text-[13px] text-[#FF3B30]">{error}</p>}
          </div>

          {/* 파일이 없을 때만 플러스 버튼 노출 */}
          {!fileName && (
            <button
              type="button"
              onClick={() =>
                document.querySelector<HTMLInputElement>('input[type="file"]')?.click()
              }
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
