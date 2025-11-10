import Link from "next/link";
import Image from "next/image";

type FooterLink = {
  label: string;
  href: string;
  icon?: boolean;
};

const leftLinks: FooterLink[] = [
  { label: "모든 교육 경험", href: "/all-education" },
  { label: "전체 강의", href: "/all-courses" },
  { label: "국비지원부트캠프", href: "/government-bootcamp" },
  { label: "이벤트", href: "/events" },
  { label: "기업 문의", href: "/company-inquiry" },
];

const rightLinks: FooterLink[] = [
  { label: "회사 소개", href: "/about" },
  { label: "브랜드 필사이드", href: "/brand-poolside", icon: true },
  { label: "브랜드가라언", href: "/brand-garaeon", icon: true },
  { label: "채용", href: "/careers" },
];

const termsLinks = [
  { label: "이용약관", href: "/terms" },
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "환불규정", href: "/refund" },
];

export default function Footer() {
  return (
    <footer className="w-full min-w-[1444px] bg-bg-quaternary border-t border-border-secondary">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Logo and Links Section */}
        <div className="flex justify-between gap-8 mb-8">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/icons/likelion-black-logo.svg"
                alt="LikelionConnect Logo"
                width={40}
                height={40}
              />
              <span className="text-[#545454] font-body font-medium text-xl leading-xl align-middle">
                멋쟁이사자처럼
              </span>
            </Link>
          </div>

          {/* Left Links */}
          <div className="flex flex-col gap-2">
            {leftLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-secondary hover:text-text-accent transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Links */}
          <div className="flex flex-col gap-2">
            {rightLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-secondary hover:text-text-accent transition-colors text-sm flex items-center gap-1"
              >
                {link.label}
                {link.icon && <span className="text-xs">↗</span>}
              </Link>
            ))}
          </div>
        </div>

        {/* Terms Links */}
        <div className="flex gap-4 mb-6 text-xs text-text-tertiary">
          {termsLinks.map((link, index) => (
            <span key={link.href} className="flex items-center gap-4">
              <Link href={link.href} className="hover:text-text-secondary transition-colors">
                {link.label}
              </Link>
              {index < termsLinks.length - 1 && <span>|</span>}
            </span>
          ))}
        </div>

        {/* Company Info */}
        <div className="text-xs text-text-tertiary space-y-1">
          <p>
            상호명: 멋쟁이사자처럼 | 대표: 나성균 contact@likelion.net 사업자 번호: 264-88-01106
            통신판매업신고번호: 2022-서울용산-1534
          </p>
          <p>주소 : 서울 용산구 한강대로 32길 7, 광장문단지 빌 D동 16층, 17층</p>
          <p>Copyright 2022 멋쟁이사자처럼 Alrights reserved</p>
        </div>
      </div>
    </footer>
  );
}
