// app/(base)/talents/register/_components/section/RegisterJob.tsx
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
import { JOB_KEYS, JOB_OPTIONS } from "@/constants/jobs";

type Props = {
  jobGroup: string;
  job: string;
  onChangeJobGroup: (v: string) => void;
  onChangeJob: (v: string) => void;
};

export default function RegisterJob({ jobGroup, job, onChangeJobGroup, onChangeJob }: Props) {
  return (
    <section>
      <div className="grid grid-cols-[48px_auto] gap-x-4">
        <div className="w-12 h-12 rounded-md bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center">
          <Image src="/icons/outline-clipboard.svg" alt="job" width={24} height={24} />
        </div>
        <div className="flex items-center h-12 text-[16px] font-semibold text-text-primary">
          직군 및 직무 선택
          <span className="text-status-error">*</span>
        </div>

        <div />
        <div className="mt-4 flex gap-4 w-full overflow-visible">
          {/* 직군 선택 */}
          <div className="flex-1">
            <Select
              value={jobGroup}
              onValueChange={(v) => {
                onChangeJob(""); // ✅ 직군 변경 시 직무 리셋
                onChangeJobGroup(v);
              }}
            >
              <SelectTrigger className="w-full h-[52px] rounded-md bg-[#F5F5F5] border border-border-quaternary justify-between">
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
              <SelectContent className="bg-white rounded-md border border-border-quaternary">
                {JOB_KEYS.map((jg) => (
                  <SelectItem key={jg} value={jg}>
                    {jg}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 직무 선택 */}
          <div className="flex-1">
            <Select value={job} onValueChange={onChangeJob} disabled={!jobGroup}>
              <SelectTrigger className="w-full h-[52px] rounded-md bg-[#F5F5F5] border border-border-quaternary justify-between">
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
              <SelectContent className="bg-white rounded-md border border-border-quaternary">
                {(JOB_OPTIONS[jobGroup] ?? []).map((item) => (
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
