import Link from "next/link";

type LoginButtonProps = {
  href?: string;
  className?: string;
};

export default function LoginButton({ href = "/login", className = "" }: LoginButtonProps) {
  const defaultClassName =
    "bg-brand-01 text-text-accent px-6 py-2 rounded-full border border-border-accent hover:bg-brand-02 transition-colors font-medium";

  return (
    <Link href={href} className={className || defaultClassName}>
      로그인/회원가입
    </Link>
  );
}
