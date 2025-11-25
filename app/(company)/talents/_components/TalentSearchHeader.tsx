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
import { JOB_GROUPS, findJobGroupById } from "@/constants/jobMapping";

type TalentSearchHeaderProps = {
  totalCount: number;
};

export default function TalentSearchHeader({ totalCount }: TalentSearchHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const keywordInit = sp.get("keyword") ?? "";
  const groupIdInit = sp.get("jobGroupId") ?? "";
  const roleIdInit = sp.get("jobRoleId") ?? "";

  const [keyword, setKeyword] = React.useState(keywordInit);
  const [selectedJobGroupId, setSelectedJobGroupId] = React.useState(groupIdInit);
  const [selectedJobRoleId, setSelectedJobRoleId] = React.useState(roleIdInit);

  // 직군 바뀌면 직무 초기화
  React.useEffect(() => setSelectedJobRoleId(""), [selectedJobGroupId]);

  // 선택된 직군에 해당하는 직무 목록
  const selectedGroup = findJobGroupById(Number(selectedJobGroupId));
  const availableRoles = selectedGroup?.roles ?? [];

  // URL 갱신
  const pushQuery = React.useCallback(
    (next: { keyword?: string; jobGroupId?: string; jobRoleId?: string }) => {
      const params = new URLSearchParams(sp.toString());

      if (next.keyword !== undefined) {
        if (next.keyword) {
          params.set("keyword", next.keyword);
        } else {
          params.delete("keyword");
        }
      }
      if (next.jobGroupId !== undefined) {
        if (next.jobGroupId) {
          params.set("jobGroupId", next.jobGroupId);
        } else {
          params.delete("jobGroupId");
        }
      }
      if (next.jobRoleId !== undefined) {
        if (next.jobRoleId) {
          params.set("jobRoleId", next.jobRoleId);
        } else {
          params.delete("jobRoleId");
        }
      }

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
            defaultValue={keywordInit}
            placeholder="스킬로 검색하세요"
            onChange={setKeyword}
            onSubmit={(kw) => pushQuery({ keyword: kw })}
          />
        </div>
        <button
          onClick={() => pushQuery({ keyword })}
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
              value={selectedJobGroupId}
              onValueChange={(v) => {
                const newGroupId = v === "all" ? "" : v;
                setSelectedJobGroupId(newGroupId);
                setSelectedJobRoleId("");
                pushQuery({ jobGroupId: newGroupId, jobRoleId: "" });
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
                <SelectItem value="all">전체</SelectItem>
                {JOB_GROUPS.map((group) => (
                  <SelectItem key={group.id} value={String(group.id)}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 직무 */}
          <div className="w-full sm:w-[220px]">
            <Select
              value={selectedJobRoleId}
              onValueChange={(v) => {
                const newRoleId = v === "all" ? "" : v;
                setSelectedJobRoleId(newRoleId);
                pushQuery({ jobRoleId: newRoleId });
              }}
              disabled={!selectedJobGroupId}
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
                <SelectItem value="all">전체</SelectItem>
                {availableRoles.map((role) => (
                  <SelectItem key={role.id} value={String(role.id)}>
                    {role.name}
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
