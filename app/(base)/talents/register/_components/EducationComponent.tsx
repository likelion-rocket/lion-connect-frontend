"use client";

import Image from "next/image";
import Input from "@/components/ui/input";

type Props = {
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
  const hasAnyValue =
    !!schoolName?.trim() ||
    !!periodText?.trim() ||
    !!status?.trim() ||
    !!major?.trim() ||
    !!description?.trim();

  // const sectionClasses =
  //   "relative w-full rounded-xl bg-white transition-all " +
  //   (hasAnyValue
  //     ? "border border-[#FF6000] "
  //     : "hover:border hover:border-[#FF6000]/50 focus-within:border focus-within:border-[#FF6000] ") +
  //   // ✅ IntroduceCard의 그림자 (pressed/focus 시)
  //   "focus-within:shadow-[0_4px_6px_-2px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.10)] " +
  //   "active:shadow-[0_4px_6px_-2px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.10)]";

  // ✅ 변경
  const sectionClasses =
    "relative w-full rounded-xl bg-white transition-all " +
    (hasAnyValue
      ? // 값이 있으면 주황 테두리 고정, 단 pressed 때는 투명 처리
        "border border-[#FF6000] active:border-transparent "
      : // 값이 없으면 hover에서만 주황 테두리, pressed 때는 투명 처리
        "hover:border hover:border-[#FF6000]/50 active:border-transparent ") +
    // IntroduceCard와 동일한 pressed/focus 그림자
    "focus-within:shadow-[0_4px_6px_-2px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.10)] " +
    "active:shadow-[0_4px_6px_-2px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.10)]";

  const clearAll = () => {
    onChangeSchoolName("");
    onChangePeriodText("");
    onChangeStatus("");
    onChangeMajor("");
    onChangeDescription("");
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 타이틀 */}
      <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
        <span>학력</span>
      </div>

      {/* ✅ 섹션 효과 */}
      <div className={sectionClasses}>
        <div className="p-4">
          <div className="grid grid-cols-[48px_auto] gap-x-4">
            {/* 아이콘 */}
            <div className="w-12 h-12 rounded-md bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center">
              <Image src="/icons/outline-library.svg" alt="library" width={24} height={24} />
            </div>

            {/* 제목 */}
            <div className="flex items-center justify-between h-12 text-[16px] font-semibold text-text-primary">
              <span>학교</span>
            </div>

            <div />

            {/* 1) 학교명 */}
            <div className="mt-4 mb-3">
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
            onClick={clearAll}
            className="inline-flex items-center gap-2 rounded-sm border border-[#FF6000]/20 bg-[#FFF3EB] px-2 py-1 text-[#FF6000] hover:opacity-90"
          >
            <Image src="/icons/outline-trash.svg" alt="삭제" width={24} height={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
