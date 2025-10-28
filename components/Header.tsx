import Link from "next/link";
import LoginButton from "./buttons/LoginButton";
import Image from "next/image";

type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  { label: "인재탐색", href: "/talents" },
  { label: "기업문의", href: "/company-inquiry" },
  { label: "인재등록", href: "/talents/register" },
  { label: "참여기업", href: "/partners" },
  { label: "어드민", href: "/admin" },
];

export default function Header() {
  return (
    <header className="w-full bg-bg-primary border-b border-border-quaternary">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-2">
          <Image
            src="/icons/likelion_favicon_60.svg"
            alt="LikelionConnect Logo"
            width={60}
            height={60}
          />
          <div className="text-[24px] font-bold leading-[138%] font-ko-body">
            <span className="text-text-accent">라이언 커넥트</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text-secondary hover:text-text-accent transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Sign Up Button */}
        <LoginButton />
      </nav>
    </header>
  );
}
