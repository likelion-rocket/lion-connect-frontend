// app/(base)/talents/register/_components/IntroComponent.tsx
"use client";

import Image from "next/image";
import Input from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthStore } from "@/store/authStore";
import { EXP_TAG_ID_MAP, type ExpTagKey } from "@/lib/expTags/map";
import { useEffect, useState, useMemo } from "react";

type IntroProps = {
  name: string;
  onNameChange?: (value: string) => void;

  /** ✅ 초기 선택: 백엔드에서 가져온 경험 태그 id 배열 */
  initialExpTagIds?: number[];

  /** ✅ 현재 선택된 경험 태그 id 배열을 부모로 올려줌 (PUT 바디용) */
  onChangeExpTagIds?: (ids: number[]) => void;
};

// UI 에서 사용할 경험 옵션 정의
const EXPERIENCES: { key: ExpTagKey; label: string }[] = [
  { key: "bootcamp", label: "부트캠프 경험자" },
  { key: "startup", label: "창업 경험자" },
  { key: "certificate", label: "자격증 보유자" },
  { key: "major", label: "전공자" },
];

// 전화번호 포맷터: 01012341234 -> 010 1234 1234
function formatPhoneNumber(raw: string | null | undefined) {
  if (!raw) return "";
  const digits = raw.replace(/\D/g, "");

  if (digits.length === 11) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }
  return raw;
}

export default function IntroComponent({
  name,
  onNameChange,
  initialExpTagIds,
  onChangeExpTagIds,
}: IntroProps) {
  // ✅ 로그인한 사용자 정보
  const user = useAuthStore((state) => state.user);

  const emailText = user?.email ?? "email@gmail.com";
  const phoneText = formatPhoneNumber(user?.phoneNumber) || "010 0000 0000";

  // ✅ 경험 태그 선택 상태 (bootcamp/startup/...)
  const [selected, setSelected] = useState<Record<ExpTagKey, boolean>>({
    bootcamp: false,
    startup: false,
    certificate: false,
    major: false,
  });

  // ✅ initialExpTagIds → 체크박스 상태로 역매핑
  useEffect(() => {
    if (!initialExpTagIds || initialExpTagIds.length === 0) return;

    setSelected((prev) => {
      const next = { ...prev };
      (Object.keys(EXP_TAG_ID_MAP) as ExpTagKey[]).forEach((key) => {
        const id = EXP_TAG_ID_MAP[key];
        next[key] = initialExpTagIds.includes(id);
      });
      return next;
    });
  }, [initialExpTagIds]);

  // ✅ 체크박스 변경 핸들러
  const handleToggle = (key: ExpTagKey) => {
    setSelected((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // ✅ 선택 상태 → 백엔드 ids[]로 변환해서 부모에 전달
  const selectedIds = useMemo(() => {
    const ids: number[] = [];
    (Object.keys(selected) as ExpTagKey[]).forEach((key) => {
      if (!selected[key]) return;
      ids.push(EXP_TAG_ID_MAP[key]);
    });
    return ids;
  }, [selected]);

  useEffect(() => {
    onChangeExpTagIds?.(selectedIds);
  }, [selectedIds, onChangeExpTagIds]);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 인적 사항 */}
      <div className="mb-8">
        <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
          <span>인적 사항</span>
        </div>
      </div>

      <div className="grid grid-cols-[48px_auto] gap-x-4">
        <div className="w-12 h-12 rounded-md bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center">
          <Image src="/icons/outline-user-circle.svg" alt="user-circle" width={24} height={24} />
        </div>

        <div className="flex items-center justify-between h-12 text-[16px] font-semibold text-text-primary">
          <span>이름</span>
        </div>

        <div />

        <div className="mt-4 mb-6">
          <div className="flex items-center justify-start gap-20">
            <div className="flex items-center gap-4">
              <Image src="/icons/outline-user.svg" alt="user" width={20} height={20} />
              <Input
                type="text"
                placeholder="이름을 입력하세요"
                className="text-[14px] text-[#1c1c1c]"
                value={name}
                onChange={(e) => onNameChange?.(e.target.value)}
                hideClear
              />
            </div>

            {/* 전화번호 */}
            <div className="flex items-center gap-4">
              <Image src="/icons/outline-phone.svg" alt="phone" width={20} height={20} />
              <span className="text-[14px] text-[#9CA3AF] font-normal">{phoneText}</span>
            </div>

            {/* 이메일 */}
            <div className="flex items-center gap-4">
              <Image src="/icons/outline-mail.svg" alt="mail" width={20} height={20} />
              <span className="text-[14px] text-[#9CA3AF] font-normal">{emailText}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 관련 경험 선택 */}
      <div className="grid grid-cols-[48px_auto] gap-x-4">
        <div className="w-12 h-12 rounded-md bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center">
          <Image src="/icons/outline-pencil-alt.svg" alt="pencil-alt" width={24} height={24} />
        </div>
        <div className="flex items-center justify-between h-12 text-[16px] font-semibold text-text-primary">
          <span>관련 경험 선택</span>
        </div>
        <div />
        <div className="mt-4 mb-2 flex flex-wrap gap-[140px]">
          {EXPERIENCES.map((item) => (
            <label
              key={item.key}
              className="inline-flex items-center gap-3 cursor-pointer select-none"
            >
              <Checkbox
                checked={selected[item.key]}
                onCheckedChange={() => handleToggle(item.key)}
              />
              <span className="text-[14px] font-medium text-[#1c1c1c]">{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}
