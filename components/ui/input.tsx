// components/ui/input.tsx
"use client";

import Image from "next/image";
import { ChangeEventHandler, useEffect, useRef, useState, ChangeEvent } from "react";

type FieldEl = HTMLInputElement | HTMLTextAreaElement;

type InputProps = {
  placeholder?: string;
  type?: string;
  className?: string;
  multiline?: boolean;
  readOnly?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: ChangeEventHandler<FieldEl>;
  sectionControlled?: boolean;
  showClearWhenFilled?: boolean;
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
  sectionControlled = false,
  showClearWhenFilled = true,
}: InputProps) {
  const fieldRef = useRef<FieldEl | null>(null);

  const [hasValue, setHasValue] = useState<boolean>(
    typeof value === "string" ? value.length > 0 : (defaultValue ?? "").length > 0
  );

  useEffect(() => {
    if (value !== undefined) setHasValue(value.length > 0);
  }, [value]);

  useEffect(() => {
    if (value === undefined && fieldRef.current) {
      setHasValue((fieldRef.current.value ?? "").length > 0);
    }
  }, [value]);

  const handleChange: ChangeEventHandler<FieldEl> = (e) => {
    setHasValue(e.currentTarget.value.length > 0);
    onChange?.(e);
  };

  const handleClear = () => {
    const el = fieldRef.current;
    if (!el) return;
    el.value = "";
    setHasValue(false);

    if (value === undefined) {
      el.dispatchEvent(new Event("input", { bubbles: true }));
    } else if (onChange) {
      const synthetic = new Event("input", { bubbles: true }) as unknown as ChangeEvent<FieldEl>;
      Object.defineProperty(synthetic, "currentTarget", { value: el });
      Object.defineProperty(synthetic, "target", { value: el });
      onChange(synthetic);
    }
  };

  // 휴지통 버튼 표시 여부 (한 번만 계산)
  const showClear = !sectionControlled && !readOnly && showClearWhenFilled && hasValue;

  // 섹션 제어 모드면 인풋 래퍼는 투명/무보더로 고정
  const wrapperClasses = sectionControlled
    ? "relative w-full rounded-[6px] bg-transparent"
    : "relative w-full rounded-[6px] bg-white transition-all " +
      // 값이 있으면 항상 주황 테두리, 하지만 pressed(active)에서는 테두리 색 투명화
      (hasValue
        ? "border border-[#FF6000] active:border-transparent "
        : // 값이 없으면 hover 때만 주황 테두리, pressed(active)에서는 테두리 색 투명화
          "hover:border hover:border-[#FF6000]/50 active:border-transparent ") +
      // pressed/focus 시에는 카드와 동일한 그림자
      "focus-within:shadow-[0_4px_6px_-2px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.10)] " +
      "active:shadow-[0_4px_6px_-2px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.10)]";

  const baseField =
    "block w-full bg-transparent rounded-[6px] px-4 py-3 text-[14px] " +
    "text-text-primary placeholder:text-text-tertiary outline-none ring-0 border-0";

  // 휴지통이 있을 때만 오른쪽 패딩 추가해 겹침 방지
  const fieldWithGuardSpace = `${baseField} ${showClear ? "pr-12" : ""}`;

  return (
    <div className={wrapperClasses}>
      {multiline ? (
        value !== undefined ? (
          <textarea
            ref={fieldRef as React.RefObject<HTMLTextAreaElement>}
            placeholder={placeholder}
            className={`${fieldWithGuardSpace} h-[120px] resize-none leading-[150%] text-start ${className}`}
            readOnly={readOnly}
            value={value}
            onChange={handleChange}
          />
        ) : (
          <textarea
            ref={fieldRef as React.RefObject<HTMLTextAreaElement>}
            placeholder={placeholder}
            className={`${fieldWithGuardSpace} h-[120px] resize-none leading-[150%] text-start ${className}`}
            readOnly={readOnly}
            defaultValue={defaultValue}
            onChange={handleChange}
          />
        )
      ) : value !== undefined ? (
        <input
          ref={fieldRef as React.RefObject<HTMLInputElement>}
          type={type}
          placeholder={placeholder}
          className={`${fieldWithGuardSpace} ${className}`}
          readOnly={readOnly}
          value={value}
          onChange={handleChange}
        />
      ) : (
        <input
          ref={fieldRef as React.RefObject<HTMLInputElement>}
          type={type}
          placeholder={placeholder}
          className={`${fieldWithGuardSpace} ${className}`}
          readOnly={readOnly}
          defaultValue={defaultValue}
          onChange={handleChange}
        />
      )}

      {showClear && (
        <button
          type="button"
          aria-label="입력 내용 삭제"
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm border border-[#FF6000]/20 bg-[#FFF3EB] p-1 transition hover:opacity-90 z-10"
          tabIndex={-1}
        >
          <Image src="/icons/outline-trash.svg" alt="삭제" width={24} height={24} />
        </button>
      )}
    </div>
  );
}
