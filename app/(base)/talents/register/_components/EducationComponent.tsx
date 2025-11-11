"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "@/components/ui/input";
import { deleteEducation } from "@/lib/api/educations";

type Props = {
  /** ✅ DB Row PK (있으면 삭제 API 호출, 없으면 단순 초기화) */
  educationId?: number | null;

  schoolName: string;
  onChangeSchoolName: (v: string) => void;
  periodText: string;
  onChangePeriodText: (v: string) => void;
  status: string;
  onChangeStatus: (v: string) => void;
  major: string;
  onChangeMajor: (v: string) => void;
  description: string;
  onChangeDescription: (v: string) => void;

  /** ✅ 삭제 성공 후 상위에서 목록/상태 갱신 */
  onDeleted?: () => void;

  errors?: {
    schoolName?: string;
    periodText?: string;
    status?: string;
    major?: string;
    description?: string;
  };
};

export default function EducationComponent({
  educationId,
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
  onDeleted,
  errors = {},
}: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  const hasAnyValue =
    !!schoolName?.trim() ||
    !!periodText?.trim() ||
    !!status?.trim() ||
    !!major?.trim() ||
    !!description?.trim();

  const sectionClasses =
    "relative w-full rounded-xl bg-white transition-all " +
    (hasAnyValue
      ? "border border-[#FF6000] active:border-transparent "
      : "hover:border hover:border-[#FF6000]/50 active:border-transparent ") +
    "focus-within:shadow-[0_4px_6px_-2px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.10)] " +
    "active:shadow-[0_4px_6px_-2px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.10)]";

  const clearAll = () => {
    onChangeSchoolName("");
    onChangePeriodText("");
    onChangeStatus("");
    onChangeMajor("");
    onChangeDescription("");
  };

  const handleClickTrash = async () => {
    // id 없으면 입력만 초기화
    if (!educationId) {
      clearAll();
      return;
    }

    // if (!window.confirm("학력 정보를 삭제할까요?")) return;

    try {
      setIsDeleting(true);
      await deleteEducation(educationId);
      clearAll();
      onDeleted?.(); // 상위에서 refetch 등
    } catch (err) {
      console.error(err);
      alert("삭제에 실패했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 타이틀 */}
      <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
        <span>학력</span>
      </div>

      {/* 아이콘 + 제목 */}
      <div className="grid grid-cols-[48px_auto] gap-x-4 mb-4">
        <div className="w-12 h-12 rounded-md bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center">
          <Image src="/icons/outline-library.svg" alt="library" width={24} height={24} />
        </div>
        <div className="flex items-center h-12 text-[16px] font-semibold text-text-primary">
          학교
        </div>
      </div>

      {/* 입력 섹션 */}
      <div className={sectionClasses}>
        <div className="p-4">
          <div className="grid grid-cols-[48px_auto] gap-x-4">
            <div />

            {/* 1) 학교명 */}
            <div className="mt-1 mb-3">
              <Input
                sectionControlled
                showClearWhenFilled={false}
                placeholder="학교명을 입력하세요"
                type="text"
                value={schoolName}
                onChange={(e) => onChangeSchoolName(e.target.value)}
              />
              {errors.schoolName && (
                <p className="mt-1 text-xs text-red-500">{errors.schoolName}</p>
              )}
            </div>

            <div />

            {/* 2) 재학 기간 */}
            <div className="mb-3">
              <Input
                sectionControlled
                showClearWhenFilled={false}
                placeholder="0000.mm - 0000.mm (0년 0개월)"
                type="text"
                value={periodText}
                onChange={(e) => onChangePeriodText(e.target.value)}
              />
              {errors.periodText && (
                <p className="mt-1 text-xs text-red-500">{errors.periodText}</p>
              )}
            </div>

            <div />

            {/* 3) 졸업 상태 + 전공 */}
            <div className="mb-3 flex gap-4 w-full">
              <div className="w-full">
                <Input
                  sectionControlled
                  showClearWhenFilled={false}
                  placeholder="졸업 상태(졸업, 수료, 재학)"
                  type="text"
                  value={status}
                  onChange={(e) => onChangeStatus(e.target.value)}
                />
                {errors.status && <p className="mt-1 text-xs text-red-500">{errors.status}</p>}
              </div>
              <div className="w-full">
                <Input
                  sectionControlled
                  showClearWhenFilled={false}
                  placeholder="전공학위"
                  type="text"
                  value={major}
                  onChange={(e) => onChangeMajor(e.target.value)}
                />
                {errors.major && <p className="mt-1 text-xs text-red-500">{errors.major}</p>}
              </div>
            </div>

            <div />

            {/* 4) 학교 활동 */}
            <div className="mb-0">
              <Input
                sectionControlled
                showClearWhenFilled={false}
                placeholder="학교에서 무슨 활동을 했는지 적어주세요"
                type="text"
                value={description}
                onChange={(e) => onChangeDescription(e.target.value)}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-500">{errors.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* 하단 휴지통 */}
        <div className="flex justify-end p-3 pt-0">
          <button
            type="button"
            onClick={handleClickTrash}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 rounded-sm border border-[#FF6000]/20 bg-[#FFF3EB] px-2 py-1 text-[#FF6000] hover:opacity-90 disabled:opacity-60"
            aria-busy={isDeleting}
          >
            <Image src="/icons/outline-trash.svg" alt="삭제" width={24} height={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
