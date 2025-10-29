"use client";

import { ChangeEventHandler } from "react";

type InputProps = {
  placeholder?: string;
  type?: string;
  className?: string;
  multiline?: boolean;
  readOnly?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

export default function Input({
  placeholder,
  type = "text",
  className = "",
  multiline = false,
  readOnly = false,
  defaultValue,
  value,
  onChange,
}: InputProps) {
  const baseClasses =
    "w-full bg-[#F5F5F5] border border-border-quaternary rounded-[6px] px-4 py-3 text-[14px] text-text-primary placeholder:text-text-tertiary outline-none";

  // multiline (textarea 버전)
  if (multiline) {
    // value가 주어졌으면 controlled textarea로 렌더
    if (value !== undefined) {
      return (
        <textarea
          placeholder={placeholder}
          className={`${baseClasses} h-[120px] resize-none leading-[150%] text-start ${className}`}
          readOnly={readOnly}
          value={value}
          onChange={onChange}
        />
      );
    }

    // 아니면 uncontrolled textarea로 렌더 (defaultValue 사용)
    return (
      <textarea
        placeholder={placeholder}
        className={`${baseClasses} h-[120px] resize-none leading-[150%] text-start ${className}`}
        readOnly={readOnly}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    );
  }

  // single-line input 버전
  if (value !== undefined) {
    // controlled input
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={`${baseClasses} ${className}`}
        readOnly={readOnly}
        value={value}
        onChange={onChange}
      />
    );
  }

  // uncontrolled input
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${baseClasses} ${className}`}
      readOnly={readOnly}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
}
