"use client";

import Image from "next/image";
import Input from "@/components/ui/input";

type Props = {
  schoolName: string;
  onChangeSchoolName: (v: string) => void;

  periodText: string; // "0000.mm - 0000.mm"
  onChangePeriodText: (v: string) => void;

  status: string;
  onChangeStatus: (v: string) => void;

  major: string;
  onChangeMajor: (v: string) => void;

  description: string;
  onChangeDescription: (v: string) => void;

  /** ✅ 인풋별 에러 메시지 전달용 */
  errors?: {
    schoolName?: string;
    periodText?: string;
    status?: string;
    major?: string;
    description?: string;
  };
};

export default function EducationComponent({
  schoolName,
  onChangeSchoolName,
  periodText,
  onChangePeriodText,
  status,
  onChangeStatus,
  major,
  onChangeMajor,
  description,
  onChangeDescription,
  errors = {},
}: Props) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 섹션 타이틀 */}
      <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
        <span>학력</span>
      </div>

      {/* 아이콘 + 내용 그리드 */}
      <div className="grid grid-cols-[48px_auto] gap-x-4">
        {/* 아이콘 */}
        <div className="w-12 h-12 rounded-md bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center">
          <Image src="/icons/outline-library.svg" alt="library" width={24} height={24} />
        </div>

        {/* 제목 줄 */}
        <div className="flex items-center justify-between h-12 text-[16px] font-semibold text-text-primary">
          <span>학교</span>
        </div>

        {/* 들여쓰기용 빈칸 */}
        <div />

        {/* 1) 학교명 */}
        <div className="mt-4 mb-3">
          <Input
            placeholder="학교명을 입력하세요"
            type="text"
            className={`w-full ${errors.schoolName ? "border-red-500" : ""}`}
            value={schoolName}
            onChange={(e) => onChangeSchoolName(e.target.value)}
          />
          {errors.schoolName && <p className="mt-1 text-xs text-red-500">{errors.schoolName}</p>}
        </div>

        <div />

        {/* 2) 재학 기간 */}
        <div className="mb-3">
          <Input
            placeholder="0000.mm - 0000.mm (0년 0개월)"
            type="text"
            className={`w-full ${errors.periodText ? "border-red-500" : ""}`}
            value={periodText}
            onChange={(e) => onChangePeriodText(e.target.value)}
          />
          {errors.periodText && <p className="mt-1 text-xs text-red-500">{errors.periodText}</p>}
        </div>

        <div />

        {/* 3) 졸업 상태 + 전공학위 */}
        <div className="mb-3 flex gap-4 w-full">
          <div className="w-full">
            <Input
              placeholder="졸업 상태"
              type="text"
              className={`w-full ${errors.status ? "border-red-500" : ""}`}
              value={status}
              onChange={(e) => onChangeStatus(e.target.value)}
            />
            {errors.status && <p className="mt-1 text-xs text-red-500">{errors.status}</p>}
          </div>
          <div className="w-full">
            <Input
              placeholder="전공학위"
              type="text"
              className={`w-full ${errors.major ? "border-red-500" : ""}`}
              value={major}
              onChange={(e) => onChangeMajor(e.target.value)}
            />
            {errors.major && <p className="mt-1 text-xs text-red-500">{errors.major}</p>}
          </div>
        </div>

        <div />

        {/* 4) 학교 활동 */}
        <div className="mb-3">
          <Input
            placeholder="학교에서 무슨 활동을 했는지 적어주세요"
            type="text"
            className={`w-full ${errors.description ? "border-red-500" : ""}`}
            value={description}
            onChange={(e) => onChangeDescription(e.target.value)}
          />
          {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
        </div>
      </div>
    </section>
  );
}
