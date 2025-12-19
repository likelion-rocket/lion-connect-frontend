import Link from "next/link";
import Image from "next/image";

type FooterLink = {
  label: string;
  href: string;
  icon?: boolean;
};

const rightLinks: FooterLink[] = [
  { label: "브랜드 웹사이트", href: "https://likelion.career.greetinghr.com/ko/home", icon: true },
  {
    label: "브랜드 가이드라인",
    href: "https://likelion.notion.site/LIKELION-BRAND-GUIDELINE-942a09c286b1401b83f9193c0787759e",
    icon: true,
  },
  { label: "채용", href: "https://likelion.career.greetinghr.com/ko/career", icon: true },
];

const termsLinks = [
  { label: "이용약관", href: "https://likelion.notion.site/89ba1354b98d4825af14109aebdd3af9" },
  {
    label: "개인정보처리방침",
    href: "https://likelion.notion.site/4d3c7ce22a724b3c99950e853dc7589b",
  },
  {
    label: "환불규정",
    href: "https://likelion.notion.site/LIKELION-e9139bf291ad4e0b88f8b99f8597d04a",
  },
];

export default function Footer() {
  return (
    <footer className="relative z-30 w-full min-w-[1440px] border-t border-border-secondary py-16 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        {/* Logo and Links Section */}
        <div className="flex justify-between items-start gap-8 mb-12">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/landing/icons/LIKELION_logo_Primary.svg"
              alt="LikelionConnect Logo"
              width={200}
              height={40}
            />
          </Link>

          {/* Links Container */}
          <div className="flex justify-end items-start gap-12 flex-1">
            {/* Right Links */}
            <div className="flex flex-col gap-4">
              {/* 회사 소개 - 링크 아닌 텍스트 레이블 */}
              <div className="text-text-secondary text-xs font-normal leading-4">회사 소개</div>

              {rightLinks.map((link) => (
                <div key={link.href} className="flex items-center gap-4">
                  <Link
                    href={link.href}
                    className="text-text-primary w-full hover:text-text-accent transition-colors text-sm font-bold leading-5 "
                  >
                    {link.label}
                  </Link>
                  {link.icon && (
                    <Image
                      src="/icons/outline-external-link.svg"
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
                {index < termsLinks.length - 1 && <span className="mx-2">&middot;</span>}
              </span>
            ))}
          </div>

          {/* Company Details */}
          <p className="text-text-tertiary text-sm leading-tight">
            상호명: 멋쟁이사자처럼 ㅣ 대표: 나성영 | contact@likelion.net | 사업자 번호:
            264-88-01106 | 통신판매업신고번호: 2022-서울종로-1534
          </p>
          <div className="flex gap-2">
            <p className="text-text-tertiary text-sm leading-tight">
              주소 : 서울 종로구 종로3길17, 광화문D타워 D1동16층, 17층
            </p>
            <p className="text-text-tertiary text-sm leading-tight">
              Copyright2022 멋쟁이사자처럼 Alrights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
