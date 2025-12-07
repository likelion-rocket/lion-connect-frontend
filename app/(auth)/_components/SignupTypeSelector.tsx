"use client";

import { cn } from "@/utils/utils";
import React from "react";
import Image from "next/image";
import { SignupTypeCard } from "./SignupTypeCard";

const userIcon = "/auth/solid-user.svg";
const companyIcon = "/auth/solid-building.svg";

export interface SignupTypeSelectorProps extends React.HTMLAttributes<HTMLDivElement> {
  onUserSignup?: () => void;
  onCompanySignup?: () => void;
  onBackToLogin?: () => void;
}

export function SignupTypeSelector({
  onUserSignup = () => {},
  onCompanySignup = () => {},
  onBackToLogin = () => {},
  className,
  ...props
}: SignupTypeSelectorProps) {
  return (
    <div
      className={cn(
        "relative min-h-[900px] w-full bg-bg-primary flex flex-col justify-center",
        className
      )}
      {...props}
    >
      {/* 메인 컨텐츠 */}
      <div className="mx-auto flex flex-col gap-[72px] items-start w-full max-w-[570px] px-6">
        {/* 제목 */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary">회원 가입 유형 선택</h1>
        </div>

        {/* 설명 */}
        <div className="w-full">
          <p className="text-base font-semibold text-text-secondary">
            목적에 맞는 유형을 선택해서 가입을 진행해주시길 바랍니다.
          </p>
          <p className="text-base font-semibold text-text-secondary">
            유형에 따라 가입 절차 및 항목에 차이가 있을 수 있습니다.
          </p>
        </div>

        {/* 카드 선택 */}
        <div className="flex gap-5 w-full">
          <SignupTypeCard
            title="일반 회원"
            icon={
              <div className="size-[72px] relative">
                <Image src={userIcon} alt="일반 회원 아이콘" fill className="object-cover" />
              </div>
            }
            onSignup={onUserSignup}
          />
          <SignupTypeCard
            title="기업 회원"
            icon={
              <div className="size-[72px] relative">
                <Image src={companyIcon} alt="기업 회원 아이콘" fill className="object-cover" />
              </div>
            }
            onSignup={onCompanySignup}
          />
        </div>

        {/* 로그인으로 돌아가기 */}
        <div className="w-full flex justify-center">
          <button
            onClick={onBackToLogin}
            className="text-sm cursor-pointer font-medium text-text-accent hover:underline transition-colors"
          >
            로그인으로 돌아가기
          </button>
        </div>
      </div>

      {/* 하단 약관 링크 */}
      <div className="absolute bottom-0 right-0 px-8 py-4 flex gap-12">
        <button className="text-xs cursor-pointer font-normal text-text-primary hover:underline transition-colors">
          이용약관
        </button>
        <button className="text-xs cursor-pointer font-normal text-text-primary hover:underline transition-colors">
          개인정보처리방침
        </button>
      </div>
    </div>
  );
}
