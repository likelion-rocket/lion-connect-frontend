import Link from "next/link";

type CTAButtonAsLink = {
  href: string;
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
};

type CTAButtonAsButton = {
  href?: never;
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type CTAButtonProps = CTAButtonAsLink | CTAButtonAsButton;

/**
 * CTA (Call-to-Action) Button Component
 *
 * @description
 * 주요 액션을 유도하는 버튼 컴포넌트입니다.
 * 브랜드 오렌지 색상의 큰 버튼으로, 랜딩 페이지나 주요 전환 포인트에서 사용됩니다.
 * href를 전달하면 Link로, 없으면 button으로 렌더링되며 모든 HTMLButtonElement props를 지원합니다.
 *
 * @example
 * // Link 버전
 * <CTAButton href="/search">인재 탐색 바로가기</CTAButton>
 * <CTAButton href="/apply" showArrow={false}>지원하기</CTAButton>
 *
 * // Button 버전
 * <CTAButton onClick={() => setShowMore(true)}>더보기</CTAButton>
 * <CTAButton onClick={handleSubmit} disabled={isLoading}>제출하기</CTAButton>
 */
export default function CTAButton({
  href,
  children,
  className = "",
  showArrow = true,
  ...buttonProps
}: CTAButtonProps) {
  const defaultClassName =
    "inline-flex items-center justify-center gap-2 bg-bg-accent text-text-inverse-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-06 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105";

  const finalClassName = className || defaultClassName;

  // Link 버전
  if (href) {
    return (
      <Link href={href} className={finalClassName}>
        {children}
        {showArrow && <span aria-hidden="true">›</span>}
      </Link>
    );
  }

  // Button 버전 - 모든 button HTML attributes 지원
  return (
    <button {...buttonProps} className={finalClassName}>
      {children}
      {showArrow && <span aria-hidden="true">›</span>}
    </button>
  );
}
