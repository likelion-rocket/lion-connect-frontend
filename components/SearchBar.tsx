"use client";

import { useState, useEffect } from "react";
import { cn } from "@/utils/utils";

type SearchBarProps = {
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  /** 엔터 입력 시 검색 실행 */
  onSubmit?: (value: string) => void;
  /** 입력값 실시간 변경 핸들러 */
  onChange?: (value: string) => void;
};

export default function SearchBar({
  className,
  placeholder,
  defaultValue = "",
  onSubmit,
  onChange,
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => setValue(defaultValue), [defaultValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(value.trim());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "w-full h-14 rounded-xl border border-border-quaternary bg-white flex items-center px-4",
        className
      )}
    >
      <input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="flex-1 outline-none text-[14px] placeholder:text-[#999]"
      />
    </form>
  );
}
