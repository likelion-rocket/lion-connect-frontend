"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: FilterOption[];
  placeholder: string;
  width?: string;
}

/**
 * 필터용 Select 컴포넌트
 * - 아래/위 화살표 아이콘 포함
 * - 열림/닫힘 상태에 따라 화살표 방향 변경
 */
export default function FilterSelect({
  value,
  onValueChange,
  options,
  placeholder,
  width = "w-[140px]",
}: FilterSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getDisplayLabel = () => {
    const option = options.find((opt) => opt.value === value);
    return option?.label || placeholder;
  };

  return (
    <Select value={value} onValueChange={onValueChange} onOpenChange={setIsOpen}>
      <SelectTrigger
        className={cn(
          "h-9 bg-bg-primary border-border-quaternary border-[0.8px] text-text-primary rounded-lg px-[12.8px] py-[0.8px] text-sm relative pr-10",
          width
        )}
      >
        <span className="text-sm leading-[1.5]">{getDisplayLabel()}</span>
        <Image
          src={isOpen ? "/icons/chevron-up.svg" : "/icons/chevron-down.svg"}
          alt={isOpen ? "펼쳐짐" : "접힘"}
          width={16}
          height={16}
          className="absolute right-3 pointer-events-none"
        />
      </SelectTrigger>
      <SelectContent className="bg-bg-primary">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
