// components/talent/IconCard.tsx
import Image from "next/image";

type IconCardProps = {
  icon: string; // 예: "/icons/solid-briefcase.svg"
  alt: string;
  className?: string;
  children: React.ReactNode;
};

export default function IconCard({ icon, alt, className = "", children }: IconCardProps) {
  return (
    <div className={`w-full rounded-xl border border-border-quaternary bg-white p-5 ${className}`}>
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-lg bg-[#F5F5F5] border border-border-quaternary flex items-center justify-center shrink-0">
          <Image src={icon} alt={alt} width={20} height={20} />
        </div>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
