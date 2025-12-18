import MemberHeader from "@/components/headers/MemberHeader";
import Footer from "@/components/Footer";
import { dashboardMetadata } from "@/app/(company)/seo/metadata";

export const metadata = dashboardMetadata;

/**
 * 인재용 레이아웃
 * - MemberHeader: 인재 전용 네비게이션
 * - Footer: 공통 푸터
 * - pt-20: Header의 고정 높이만큼 상단 패딩
 */
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MemberHeader />
      <div className="pt-20">{children}</div>
      <Footer />
    </>
  );
}
