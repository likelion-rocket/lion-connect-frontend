// components/ui/input.tsx
"use client";

import Image from "next/image";
import { ChangeEventHandler, useEffect, useRef, useState, ChangeEvent, MouseEvent } from "react";

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

  // 파일명 인풋 같은 케이스에서 외부에서 삭제 처리하도록 콜백
  onFileClear?: () => void;

  // ✅ 추가: 휴지통 아이콘 강제 숨김
  hideClear?: boolean;
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
  onFileClear,
  hideClear = false, // ✅ 기본값 false
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

  const handleClearInternal = () => {
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

  // ✅ readOnly라도 onFileClear가 있으면 휴지통을 보여주던 기존 로직에
  //    hideClear가 true면 무조건 숨기도록 한 줄 추가
  const showClear =
    !hideClear &&
    !sectionControlled &&
    showClearWhenFilled &&
    hasValue &&
    (onFileClear || !readOnly);

  const wrapperClasses = sectionControlled
    ? "relative w/full rounded-[6px] bg-transparent"
    : "relative w-full rounded-[6px] bg-white transition-all " +
      (hasValue
        ? "border border-[#FF6000] active:border-transparent "
        : "hover:border hover:border-[#FF6000]/50 active:border-transparent ") +
      "focus-within:shadow-[0_4px_6px_-2px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.10)] " +
      "active:shadow-[0_4px_6px_-2px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.10)]";

  const baseField =
    "block w-full bg-transparent rounded-[6px] px-4 py-3 text-[14px] " +
    "text-text-primary placeholder:text-text-tertiary outline-none ring-0 border-0";

  const fieldWithGuardSpace = `${baseField} ${showClear ? "pr-12" : ""}`;

  const onClearClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (onFileClear) {
      onFileClear();
      setHasValue(false);
      if (fieldRef.current) fieldRef.current.value = "";
    } else {
      handleClearInternal();
    }
  };

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
          onClick={onClearClick}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm border border-[#FF6000]/20 bg-[#FFF3EB] p-1 transition hover:opacity-90 z-10"
          tabIndex={-1}
        >
          <Image src="/icons/outline-trash.svg" alt="삭제" width={24} height={24} />
        </button>
      )}
    </div>
  );
}
