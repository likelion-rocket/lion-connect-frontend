import Footer from "@/components/Footer";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Header는 fixed로 80px(h-20) 높이를 가지므로, 콘텐츠가 가려지지 않도록 padding-top 적용 */}
      <div className="pt-20">{children}</div>
      <Footer />
    </>
  );
}
