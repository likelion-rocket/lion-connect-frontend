"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/utils/utils";

const menuItems = [
  {
    label: "기업 문의 리스팅",
    href: "/admin/inquiries",
  },
  // {
  //   label: "직군 직무 관리",
  //   href: "/admin/positions",
  // },
  // {
  //   label: "스킬 성향 경험 관리",
  //   href: "/admin/attributes",
  // },
  // {
  //   label: "사용자 계정 관리",
  //   href: "/admin/users",
  // },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="mt-[68px] ml-[34px] mb-[214px] relative rounded-tr-lg h-[550px] min-w-[238px] w-60 bg-white shadow-lg  border border-gray-200">
      {/* Logo Section */}
      <div className="flex h-[66px] items-center justify-center border-b-[0.6px] border-neutral-200">
        <Image
          src="/landing/icons/LIKELION_logo_Primary.svg"
          alt="멋쟁이사자처럼"
          width={132}
          height={14}
          className="w-32 h-auto"
          priority
        />
      </div>

      {/* PAGES Section */}
      <div className="h-8 px-10 flex items-center">
        <span className="text-xs font-bold font-['Nunito_Sans'] tracking-tight text-neutral-800 opacity-60">
          PAGES
        </span>
      </div>

      {/* Navigation Items */}
      <nav>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative h-12 flex items-center transition-all duration-300 ease-in-out",
                isActive ? "bg-white" : "hover:bg-gray-50"
              )}
            >
              {/* Active state: Orange indicator bar */}
              <div
                className={cn(
                  "absolute left-0 h-12 w-2 bg-brand-05 rounded-r-full shadow-[0px_12px_84px_0px_rgba(83,83,83,0.21)] transition-all duration-300 ease-in-out",
                  isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                )}
              />

              {/* Active state: Orange background */}
              <div
                className={cn(
                  "absolute left-6 right-0 h-12 bg-brand-05 rounded-md shadow-[0px_12px_84px_0px_rgba(83,83,83,0.21)] transition-all duration-300 ease-in-out",
                  isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
                )}
              />

              {/* Text */}
              <span
                className={cn(
                  "relative z-10 pl-[78px] text-sm font-['Pretendard'] leading-5 transition-all duration-300 ease-in-out",
                  isActive ? "text-white font-medium" : "text-neutral-800 font-normal"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Link - 메인으로 */}
      <Link
        href="/"
        className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-center text-sm font-normal leading-5 text-neutral-800 hover:bg-gray-50 transition-colors duration-200"
      >
        메인으로
      </Link>
    </aside>
  );
}
