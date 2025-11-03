"use client";

import { useState } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import Input from "./Input";
import PasswordToggleButton from "./PasswordToggleButton";

type PasswordInputProps = {
  id: string;
  label: string;
  placeholder?: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
};

/**
 * 비밀번호 입력 컴포넌트
 * - 비밀번호 표시/숨기기 토글 기능 내장
 * - 에러 메시지 표시
 * - React Hook Form과 통합
 */
export default function PasswordInput({
  id,
  label,
  placeholder = "password",
  error,
  register,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-xs font-medium text-text-primary">
        {label}
      </label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          error={!!error}
          className="pr-12"
          {...register}
        />
        <PasswordToggleButton show={showPassword} onToggle={() => setShowPassword(!showPassword)} />
      </div>
      {error && <p className="text-sm text-text-error">{error.message}</p>}
    </div>
  );
}
