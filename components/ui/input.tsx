"use client";

type InputProps = {
  placeholder?: string;
  type?: string;
  className?: string;
  multiline?: boolean;
};

export default function Input({
  placeholder,
  type = "text",
  className = "",
  multiline = false,
}: InputProps) {
  const baseClasses =
    "w-full bg-[#F5F5F5] border border-border-quaternary rounded-[6px] px-4 py-3 text-[14px] text-text-primary placeholder:text-text-tertiary outline-none";

  if (multiline) {
    return (
      <textarea
        placeholder={placeholder}
        className={`${baseClasses} h-[120px] resize-none leading-[150%] text-start ${className}`}
      />
    );
  }

  return <input type={type} placeholder={placeholder} className={`${baseClasses} ${className}`} />;
}
