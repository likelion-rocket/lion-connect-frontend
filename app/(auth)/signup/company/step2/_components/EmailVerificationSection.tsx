"use client";

import { UseFormRegisterReturn } from "react-hook-form";
import Input from "@/app/(auth)/_components/Input";
import OrangeBgButton from "@/components/ui/OrangeBgButton";

interface EmailVerificationSectionProps {
  email: string;
  verificationCode: string;
  isEmailSent: boolean;
  isVerified: boolean;
  remainingTime: number;
  buttonText: string;
  canSendEmail: boolean;
  canVerify: boolean;
  emailError?: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVerificationCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendEmail: () => void;
  onVerifyCode: () => void;
  emailRegister: UseFormRegisterReturn;
}

export default function EmailVerificationSection({
  email,
  verificationCode,
  isEmailSent,
  isVerified,
  remainingTime,
  buttonText,
  canSendEmail,
  canVerify,
  emailError,
  onEmailChange,
  onVerificationCodeChange,
  onSendEmail,
  onVerifyCode,
  emailRegister,
}: EmailVerificationSectionProps) {
  return (
    <div className="w-[554px] inline-flex flex-col justify-start items-start gap-4">
      {/* 라벨 */}
      <div className="h-4 relative text-sm font-normal">업무용 이메일</div>

      {/* 이메일 입력 + 메일 인증 받기 버튼 */}
      <div className="self-stretch inline-flex justify-start items-start gap-5">
        <div className="w-96 h-16 relative">
          <Input
            {...emailRegister}
            type="email"
            placeholder="이메일을 입력해주세요."
            error={!!emailError}
            disabled={isVerified}
            onChange={(e) => {
              emailRegister.onChange(e);
              onEmailChange(e);
            }}
            className="w-full h-full"
          />
        </div>
        <OrangeBgButton
          type="button"
          isActive={canSendEmail}
          onClick={onSendEmail}
          disabled={!canSendEmail || isVerified}
          className="w-44 h-16 px-4 py-5"
        >
          {remainingTime > 0 ? `${remainingTime}초 후 다시 전송 가능` : buttonText}
        </OrangeBgButton>
      </div>

      {/* 에러 메시지 */}
      {emailError && <p className="text-sm text-text-error">{emailError}</p>}

      {/* 인증번호 입력 + 확인 버튼 */}
      <div className="self-stretch inline-flex justify-start items-start gap-5">
        <div className="w-96 h-16 relative">
          <Input
            type="text"
            placeholder="인증번호를 입력해주세요."
            value={verificationCode}
            onChange={onVerificationCodeChange}
            disabled={!isEmailSent || isVerified}
            error={false}
            className="w-full h-full"
          />
        </div>
        <OrangeBgButton
          type="button"
          isActive={canVerify}
          onClick={onVerifyCode}
          disabled={!canVerify || isVerified}
          className="w-44 h-16 px-4 py-5"
        >
          {isVerified ? "인증 완료" : "확인"}
        </OrangeBgButton>
      </div>

      {/* 인증 완료 메시지 */}
      {isVerified && <p className="text-sm text-green-600">이메일 인증이 완료되었습니다.</p>}
    </div>
  );
}
