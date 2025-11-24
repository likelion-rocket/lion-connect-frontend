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

/* 🔹 직군/직무 목록 (value도 한글로 맞춤: 카드의 jobGroup / job 과 동일) */
const JOB_GROUPS = [
  { value: "개발", label: "개발" },
  { value: "디자인", label: "디자인" },
  { value: "데이터 분석", label: "데이터 분석" },
  { value: "마케팅", label: "마케팅" },
  { value: "기획", label: "기획" },
];

// 🔹 각 직군별 직무 (value = 직무명 그대로)
const JOB_OPTIONS: Record<string, { value: string; label: string }[]> = {
  개발: [
    { value: "프론트앤드", label: "프론트앤드" },
    { value: "백앤드", label: "백앤드" },
    { value: "IOS", label: "IOS" },
    { value: "Android", label: "Android" },
    { value: "Unity", label: "Unity" },
    { value: "AI", label: "AI" },
  ],
  디자인: [{ value: "UX/UI", label: "UX/UI" }],
  "데이터 분석": [{ value: "데이터 분석", label: "데이터 분석" }],
  마케팅: [{ value: "그로스 마케팅", label: "그로스 마케팅" }],
  기획: [{ value: "PM", label: "PM" }],
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

  // 직군 바뀌면 직무 초기화
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
            placeholder="스킬로 검색하세요"
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
                // 직군 변경 시 직무 초기화해서 URL도 같이 비워줌
                setSelectedJob("");
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
