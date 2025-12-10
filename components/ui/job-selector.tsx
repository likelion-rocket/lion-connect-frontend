"use client";

import * as React from "react";
import Image from "next/image";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { JOB_GROUPS, findJobGroupById } from "@/constants/jobMapping";

type JobSelectorProps = {
  selectedJobGroupId?: string;
  selectedJobRoleId?: string;
  onJobGroupChange?: (jobGroupId: string) => void;
  onJobRoleChange?: (jobRoleId: string) => void;
};

export function JobSelector({
  selectedJobGroupId,
  selectedJobRoleId,
  onJobGroupChange,
  onJobRoleChange,
}: JobSelectorProps) {
  // 선택된 직군에 해당하는 직무 목록
  const selectedGroup = findJobGroupById(Number(selectedJobGroupId));
  const availableRoles = selectedGroup?.roles ?? [];

  return (
    <div className="flex gap-4 w-full sm:w-auto">
      {/* 직군 */}
      <div className="w-full sm:w-[220px]">
        <Select
          value={selectedJobGroupId}
          onValueChange={(v) => {
            const newGroupId = v === "all" ? "" : v;
            onJobGroupChange(newGroupId);
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
            onJobRoleChange(newRoleId);
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
  );
}
