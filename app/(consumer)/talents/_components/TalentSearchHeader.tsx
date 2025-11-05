"use client";

import * as React from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// 🔹 직군/직무 목록 (value: 영문, label: 한글)
const JOB_GROUPS = [
  { value: "dev", label: "개발" },
  { value: "design", label: "디자인" },
  { value: "data", label: "데이터 분석" },
  { value: "marketing", label: "마케팅" },
  { value: "pm", label: "PM" },
];

// 🔹 각 직군별 직무
const JOB_OPTIONS: Record<string, { value: string; label: string }[]> = {
  dev: [
    { value: "frontend", label: "프론트 엔드" },
    { value: "backend", label: "백엔드" },
    { value: "ios", label: "IOS" },
    { value: "android", label: "Android" },
    { value: "unity", label: "Unity" },
    { value: "ai", label: "AI" },
  ],
  design: [{ value: "uxui", label: "UX/UI" }],
  data: [{ value: "data", label: "데이터 분석" }],
  marketing: [{ value: "growth", label: "그로스 마케팅" }],
  pm: [{ value: "pm", label: "PM" }],
};

type TalentSearchHeaderProps = {
  totalCount: number;
};

export default function TalentSearchHeader({ totalCount }: TalentSearchHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const qInit = sp.get("q") ?? "";
  const groupInit = sp.get("group") ?? "";
  const jobInit = sp.get("job") ?? "";

  const [keyword, setKeyword] = React.useState(qInit);
  const [selectedJobGroup, setSelectedJobGroup] = React.useState(groupInit);
  const [selectedJob, setSelectedJob] = React.useState(jobInit);

  React.useEffect(() => setSelectedJob(""), [selectedJobGroup]);

  // URL 갱신
  const pushQuery = React.useCallback(
    (next: { q?: string; group?: string; job?: string }) => {
      const params = new URLSearchParams(sp.toString());
      if (next.q !== undefined) params.set("q", next.q);
      if (next.group !== undefined) params.set("group", next.group);
      if (next.job !== undefined) params.set("job", next.job);
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, sp]
  );

  return (
    <section className="w-full">
      {/* 🔍 검색창 + 버튼 */}
      <div className="flex w-full h-14">
        <div className="flex-1">
          <SearchBar
            defaultValue={qInit}
            placeholder="이름, 직무, 스킬로 검색하세요"
            onChange={setKeyword}
            onSubmit={(kw) => pushQuery({ q: kw })}
          />
        </div>
        <button
          onClick={() => pushQuery({ q: keyword })}
          className="ml-3 px-6 rounded-xl bg-[#FF6000] text-white font-semibold hover:opacity-90 transition"
        >
          <Image src="/icons/outline-search-white.svg" alt="search" width={20} height={20} />
        </button>
      </div>

      {/* 필터 + 총 인원 */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4 w-full sm:w-auto">
          {/* 직군 */}
          <div className="w-full sm:w-[220px]">
            <Select
              value={selectedJobGroup}
              onValueChange={(v) => {
                setSelectedJobGroup(v);
                pushQuery({ group: v, job: "" });
              }}
            >
              <SelectTrigger className="w-full h-11 rounded-md bg-[#F5F5F5] border border-border-quaternary justify-between">
                <div className="flex items-center justify-between w-full">
                  <SelectValue placeholder="직군 선택" />
                  <Image
                    src="/icons/outline-cheveron-down.svg"
                    alt="chevron"
                    width={20}
                    height={20}
                    className="opacity-60"
                  />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white rounded-md border border-border-quaternary">
                {JOB_GROUPS.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 직무 */}
          <div className="w-full sm:w-[220px]">
            <Select
              value={selectedJob}
              onValueChange={(v) => {
                setSelectedJob(v);
                pushQuery({ job: v });
              }}
              disabled={!selectedJobGroup}
            >
              <SelectTrigger className="w-full h-11 rounded-md bg-[#F5F5F5] border border-border-quaternary justify-between">
                <div className="flex items-center justify-between w-full">
                  <SelectValue placeholder="직무 선택" />
                  <Image
                    src="/icons/outline-cheveron-down.svg"
                    alt="chevron"
                    width={20}
                    height={20}
                    className="opacity-60"
                  />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white rounded-md border border-border-quaternary">
                {(JOB_OPTIONS[selectedJobGroup] ?? []).map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="text-sm text-[#666] text-right">
          총 <span className="font-semibold text-black">{totalCount.toLocaleString()}</span>명
        </div>
      </div>
    </section>
  );
}
