"use client";

type InputProps = {
  placeholder: string;
  type?: string;
  className?: string;
};

export default function Input({ placeholder, type = "text", className = "" }: InputProps) {
  return (
    <div
      className={`flex items-center rounded-[6px] bg-[#F5F5F5] border border-border-quaternary px-4 py-3 min-w-[200px] ${className}`}
    >
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent text-[14px] leading-[140%] text-text-primary placeholder:text-text-tertiary outline-none"
      />
    </div>
  );
}
