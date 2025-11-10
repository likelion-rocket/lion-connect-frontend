import Link from "next/link";
import Image from "next/image";

type FooterLink = {
  label: string;
  href: string;
  icon?: boolean;
};

const leftLinks = [
  { label: "모든 교육 경험" },
  { label: "국비 지원 부트캠프" },
  { label: "멋사 대학" },
  { label: "이벤트" },
  { label: "기업문의" },
];

const rightLinks: FooterLink[] = [
  { label: "회사 소개", href: "/about" },
  { label: "브랜드 웹사이트", href: "/brand-website", icon: true },
  { label: "브랜드 가이드라인", href: "/brand-guidelines", icon: true },
  { label: "채용", href: "/careers" },
];

const termsLinks = [
  { label: "이용약관", href: "/terms" },
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "환불규정", href: "/refund" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-bg-quaternary border-t border-border-secondary py-16">
      <div className="max-w-7xl mx-auto px-8">
        {/* Logo and Links Section */}
        <div className="flex justify-between items-start gap-8 mb-12">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/landing/icons/LIKELION_logo_Primary.png"
              alt="LikelionConnect Logo"
              width={200}
              height={40}
            />
          </Link>

          {/* Links Container */}
          <div className="flex justify-end items-start gap-12 flex-1">
            {/* Left Links */}
            <div className="flex flex-col gap-4">
              {leftLinks.map((link) => (
                <p key={link.label} className="text-text-primary text-sm font-normal">
                  {link.label}
                </p>
              ))}
            </div>

            {/* Right Links */}
            <div className="flex flex-col gap-4">
              {rightLinks.map((link) => (
                <div key={link.href} className="flex items-center gap-4">
                  <Link
                    href={link.href}
                    className="text-text-primary hover:text-text-accent transition-colors text-sm font-normal"
                  >
                    {link.label}
                  </Link>
                  {link.icon && (
                    <Image
                      src="/icons/outline-save.svg"
                      alt="external link"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-text-secondary mb-12" />

        {/* Company Info Section */}
        <div className="flex flex-col gap-2">
          {/* Terms Links */}
          <div className="text-text-tertiary text-sm mb-4">
            {termsLinks.map((link, index) => (
              <span key={link.href}>
                <Link href={link.href} className="hover:text-text-secondary transition-colors">
                  {link.label}
                </Link>
                {index < termsLinks.length - 1 && <span className="mx-2">|</span>}
              </span>
            ))}
          </div>

          {/* Company Details */}
          <p className="text-text-tertiary text-sm leading-tight">
            상호명: 멋쟁이사자처럼 ㅣ대표: 나성영 contact@likelion.net 사업자 번호:
            264-88-01106통신판매업신고번호: 2022-서울종로-1534
          </p>
          <p className="text-text-tertiary text-sm leading-tight">
            주소 : 서울 종로구 종로3길17, 광화문D타워 D1동16층, 17층Copyright2022 멋쟁이사자처럼
            Alrights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
