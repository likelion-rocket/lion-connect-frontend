import "../globals.css";
import Footer from "@/components/Footer";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  // ✅ html/body 없음, body 내부에 삽입되는 레이아웃
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
