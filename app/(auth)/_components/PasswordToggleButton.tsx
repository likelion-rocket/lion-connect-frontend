import Image from "next/image";

type PasswordToggleButtonProps = {
  show: boolean;
  onToggle: () => void;
};

/**
 * 비밀번호 표시/숨기기 토글 버튼 컴포넌트
 * - 재사용 가능한 UI 컴포넌트
 * - 접근성을 고려한 aria-label 포함
 * - 호버 시 툴팁 표시
 */
export default function PasswordToggleButton({ show, onToggle }: PasswordToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-icon-secondary hover:text-icon-primary transition-colors group"
      aria-label={show ? "비밀번호 숨기기" : "비밀번호 표시"}
    >
      {/* 툴팁 */}
      <div className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 px-2 py-1 bg-[#162D3A] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[#162D3A]">
        {show ? "비밀번호 숨기기" : "비밀번호 표시"}
      </div>

      {/* 아이콘 */}
      {show ? (
        <Image
          src="/icons/solid-eye-off.svg"
          alt="비밀번호 표시 해제"
          width={20}
          height={20}
          className="w-5 h-5"
        />
      ) : (
        <Image
          src="/icons/solid-eye.svg"
          alt="비밀번호 표시"
          width={20}
          height={20}
          className="w-5 h-5"
        />
      )}
    </button>
  );
}
