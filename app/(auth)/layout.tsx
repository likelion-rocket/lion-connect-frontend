import AuthHeader from "@/components/headers/AuthHeader";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthHeader />
      {/* Header는 fixed로 80px(h-20) 높이를 가지므로, 콘텐츠가 가려지지 않도록 padding-top 적용 */}
      <div className="pt-20">{children}</div>
      <Footer />
    </>
  );
}
