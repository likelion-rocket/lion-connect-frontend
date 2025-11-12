// app/(base)/talents/register/_components/ProfileComponent.tsx
"use client";

import Input from "@/components/ui/input";
import RegisterJob from "./section/RegisterJob";

type ProfileProps = {
  intro: string; // ✅ 부모가 내려주는 값
  onIntroChange?: (value: string) => void;
  // ✅ 추가: 직군/직무 제어용
  jobGroup: string;
  job: string;
  onChangeJobGroup: (v: string) => void;
  onChangeJob: (v: string) => void;
};

export default function ProfileComponent({
  intro,
  onIntroChange,
  jobGroup,
  job,
  onChangeJobGroup,
  onChangeJob,
}: ProfileProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
        <span>간단 소개</span>
        <span className="text-status-error">*</span>
      </div>

      <Input
        placeholder="간단한 자기소개를 입력해주세요."
        multiline
        className="h-[120px] leading-[150%] text-start align-top"
        value={intro}
        onChange={(e) => onIntroChange?.(e.target.value)}
        hideClear
      />

      <div className="mt-8" />
      <RegisterJob
        jobGroup={jobGroup} // ✅ 전달
        job={job} // ✅ 전달
        onChangeJobGroup={onChangeJobGroup}
        onChangeJob={onChangeJob}
      />
    </section>
  );
}
