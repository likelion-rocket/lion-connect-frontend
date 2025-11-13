// app/(base)/talents/register/_components/IntroComponent.tsx
"use client";

import Image from "next/image";
import Input from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
// ✅ authStore에서 user 가져오기 (경로는 프로젝트에 맞게 조정: "@/store/authStore" or "@/store/AuthStore")
import { useAuthStore } from "@/store/authStore";

const EXPERIENCES = [
  { id: "bootcamp", label: "부트캠프 경험자" },
  { id: "startup", label: "창업 경험자" },
  { id: "certificate", label: "자격증 보유자" },
  { id: "major", label: "전공자" },
];

type IntroProps = {
  name: string; // ✅ 부모가 내려주는 값
  onNameChange?: (value: string) => void;
};

// 전화번호 포맷터: 01012341234 -> 010 1234 1234
function formatPhoneNumber(raw: string | null | undefined) {
  if (!raw) return "";
  const digits = raw.replace(/\D/g, ""); // 숫자 외 제거

  if (digits.length === 11) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }

  // 그 외 길이는 그냥 원본 리턴
  return raw;
}

export default function IntroComponent({ name, onNameChange }: IntroProps) {
  // ✅ 로그인한 사용자 정보 가져오기
  const user = useAuthStore((state) => state.user);

  const emailText = user?.email ?? "email@gmail.com";
  const phoneText = formatPhoneNumber(user?.phoneNumber) || "010 0000 0000"; // 전화번호 없으면 기존 placeholder

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

            {/* 전화번호 - authStore 값 사용 */}
            <div className="flex items-center gap-4">
              <Image src="/icons/outline-phone.svg" alt="phone" width={20} height={20} />
              <span className="text-[14px] text-[#9CA3AF] font-normal">{phoneText}</span>
            </div>

            {/* 이메일 - authStore 값 사용 */}
            <div className="flex items-center gap-4">
              <Image src="/icons/outline-mail.svg" alt="mail" width={20} height={20} />
              <span className="text-[14px] text-[#9CA3AF] font-normal">{emailText}</span>
            </div>
          </div>
        </div>
      </div>

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
              key={item.id}
              className="inline-flex items-center gap-3 cursor-pointer select-none"
            >
              <Checkbox />
              <span className="text-[14px] font-medium text-[#1c1c1c]">{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}
