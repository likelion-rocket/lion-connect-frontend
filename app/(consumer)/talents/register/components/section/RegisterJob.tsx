"use client";

import Image from "next/image";
import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const JOB_OPTIONS: Record<string, string[]> = {
  개발: ["프론트 엔드", "백엔드", "IOS", "Android", "Unity", "AI"],
  디자인: ["UX/UI"],
  "데이터 분석": ["데이터 분석"],
  마케팅: ["그로스 마케팅"],
  PM: ["PM"],
};

const JOB_KEYS = Object.keys(JOB_OPTIONS);

export default function RegisterJob() {
  // 👇 처음엔 둘 다 빈 값으로
  const [selectedJobGroup, setSelectedJobGroup] = React.useState<string>("");
  const [selectedJob, setSelectedJob] = React.useState<string>("");

  // 직군이 바뀌면 직무는 다시 비워주기만 함
  React.useEffect(() => {
    setSelectedJob("");
  }, [selectedJobGroup]);

  return (
    <section>
      <div className="grid grid-cols-[48px_auto] gap-x-4">
        <div className="w-12 h-12 rounded-[6px] bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center">
          <Image src="/icons/outline-clipboard.svg" alt="job" width={24} height={24} />
        </div>
        <div className="flex items-center h-12 text-[16px] font-semibold text-text-primary">
          직군 및 직무 선택
        </div>

        <div />
        <div className="mt-4 flex gap-4 w-full overflow-visible">
          {/* 직군 선택 */}
          <div className="flex-1">
            <Select value={selectedJobGroup} onValueChange={setSelectedJobGroup}>
              <SelectTrigger className="w-full h-[52px] rounded-[6px] bg-[#F5F5F5] border border-border-quaternary justify-between">
                <div className="flex items-center justify-between w-full">
                  <SelectValue placeholder="직군 선택" />
                  <Image
                    src="/icons/outline-cheveron-down.svg"
                    alt="chevron"
                    width={24}
                    height={24}
                    className="opacity-60"
                  />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white rounded-[6px] border border-border-quaternary">
                {JOB_KEYS.map((job) => (
                  <SelectItem key={job} value={job}>
                    {job}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 직무 선택 */}
          <div className="flex-1">
            <Select
              value={selectedJob}
              onValueChange={setSelectedJob}
              // 직군 안 고르면 선택 막기
              disabled={!selectedJobGroup}
            >
              <SelectTrigger className="w-full h-[52px] rounded-[6px] bg-[#F5F5F5] border border-border-quaternary justify-between">
                <div className="flex items-center justify-between w-full">
                  <SelectValue placeholder="직무 선택" />
                  <Image
                    src="/icons/outline-cheveron-down.svg"
                    alt="chevron"
                    width={24}
                    height={24}
                    className="opacity-60"
                  />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white rounded-[6px] border border-border-quaternary">
                {(JOB_OPTIONS[selectedJobGroup] ?? []).map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  );
}
