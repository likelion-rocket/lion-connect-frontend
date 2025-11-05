"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Input from "@/components/ui/input";
import { Plus } from "lucide-react";

export default function PhotoComponent() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  // 파일 선택창 열기
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // 파일 선택 시
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

    // 정상 파일
    setError("");
    setFileName(file.name);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 섹션 타이틀 */}
      <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
        <span>프로필 사진</span>
      </div>

      {/* 숨겨진 input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".jpg,.jpeg,.png"
        onChange={handleFileChange}
      />

      {/* 본문: 미리보기 / 인풋 / 버튼 */}
      <div className="flex items-center gap-8">
        {/* ✅ 기본이미지 / 업로드이미지 미리보기 */}
        <div className="w-[120px] h-[150px] rounded-xl bg-[#E5E5E5] flex items-center justify-center overflow-hidden">
          <Image
            src={previewUrl || "/images/default-profile.png"} // ✅ 기본이미지
            alt="profile preview"
            width={120}
            height={150}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 오른쪽 영역 (인풋 + 버튼) */}
        <div className="flex flex-1 items-center gap-8">
          {/* 인풋 */}
          <div onClick={openFileDialog} className="cursor-pointer flex-1 max-w-[520px]">
            <Input
              readOnly
              type="text"
              value={fileName}
              placeholder="jpg / png 파일을 업로드 해주세요. (사진 파일 업로드하면 사진 제목이 여기 보입니다)"
              className={`w-full bg-[#F6F6F6] text-[14px] cursor-pointer ${
                error ? "border border-[#FF3B30] text-[#FF3B30]" : "text-[#6B7280]"
              }`}
            />
            {error && <p className="mt-2 text-[13px] text-[#FF3B30]">{error}</p>}
          </div>

          {/* 4. 링크 추가 버튼 */}

          <button
            type="button"
            onClick={openFileDialog}
            className="flex items-center gap-2 text-[#FF6000] hover:opacity-80 font-bold text-[16px] leading-none"
          >
            <Plus size={20} className="text-[#FF6000]" />
            <span>사진 파일 업로드</span>
          </button>
        </div>
      </div>
    </section>
  );
}
