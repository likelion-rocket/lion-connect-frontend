"use client";

import { useState, useEffect } from "react";
import Input from "@/components/ui/input";
import RegisterJob from "./section/RegisterJob";

type ProfileProps = {
  onIntroChange?: (value: string) => void;
};

export default function ProfileComponent({ onIntroChange }: ProfileProps) {
  const [intro, setIntro] = useState("");

  useEffect(() => {
    onIntroChange?.(intro);
  }, [intro, onIntroChange]);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 제목 */}
      <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
        <span>간단 소개</span>
        <span className="text-status-error">*</span>
      </div>

      {/* 멀티라인 입력 */}
      <Input
        placeholder="간단한 자기소개를 입력해주세요."
        multiline
        className="h-[120px] leading-[150%] text-start align-top"
        value={intro}
        onChange={(e) => setIntro(e.target.value)}
      />

      <div className="mt-8" />
      <RegisterJob />
    </section>
  );
}
