"use client";

import TrashButtonInput from "./TrashButtonInput";

/**
 * 직무 스킬 입력 컴포넌트
 */

interface SkillInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onDelete?: () => void;
  placeholder?: string;
}

export default function SkillInput({
  name,
  value,
  onChange,
  onBlur,
  onDelete,
  placeholder = "직무 스킬을 입력해주세요",
}: SkillInputProps) {
  return (
    <TrashButtonInput
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onDelete={onDelete}
      placeholder={placeholder}
    />
  );
}
