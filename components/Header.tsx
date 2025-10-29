import Link from "next/link";
import LoginButton from "./buttons/LoginButton";
import Image from "next/image";

type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  { label: "인재탐색", href: "/talents" },
  { label: "기업문의", href: "/" },
  { label: "인재등록", href: "/talents/register" },
  { label: "참여기업", href: "/talents/partners" },
  { label: "어드민", href: "/admin" },
];

export default function Header() {
  return (
    <header className="w-full bg-bg-primary ">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-2">
          <Image
            src="/icons/likelion-favicon-60.svg"
            alt="LikelionConnect Logo"
            width={60}
            height={60}
          />
          <span className="text-text-accent font-bold text-[24px] leading-[138%] tracking-[0]">
            라이언 커넥트
          </span>
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
