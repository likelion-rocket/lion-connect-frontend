// components/talent/IconCard.tsx
import Image from "next/image";

type IconCardProps = {
  icon: string;
  alt: string;
  title?: React.ReactNode; // 아이콘 옆, 한 줄
  subtitle?: React.ReactNode; // 제목 아래 (아이콘 아래로 내려감)
  right?: React.ReactNode; // 제목 라인의 우측 액션(선택)
  className?: string;
  children?: React.ReactNode; // 본문
};

export default function IconCard({
  icon,
  alt,
  title,
  subtitle,
  right,
  className = "",
  children,
}: IconCardProps) {
  return (
    <div
      className={`w-full rounded-xl border border-border-quaternary bg-white px-5 py-4 ${className}`}
    >
      {/* 아이콘/제목 한 줄 + 나머지는 아래로 떨어지게 그리드 구성 */}
      <div className="grid grid-cols-[40px_1fr] gap-4">
        {/* row 1, col 1: 아이콘 */}
        <div className="col-start-1 row-start-1 w-10 h-10 rounded-lg bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center">
          <Image src={icon} alt={alt} width={20} height={20} />
        </div>

        {/* row 1, col 2: 제목 라인 */}
        {title && (
          <div className="col-start-2 row-start-1 flex items-center justify-between gap-3 min-w-0">
            <div className="text-[14px] font-semibold text-[#111] leading-6 truncate">{title}</div>
            {right}
          </div>
        )}

        {/* row 2, col 2: 메타(기간/부서 등) — 아이콘 아래로 내려감 */}
        {subtitle && (
          <div className="col-start-2 row-start-2 text-[13px] text-[#666] leading-5">
            {subtitle}
          </div>
        )}

        {/* row 3, col 2: 본문 */}
        {children && (
          <div className="col-start-2 row-start-3 text-[14px] text-[#333] leading-6">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
