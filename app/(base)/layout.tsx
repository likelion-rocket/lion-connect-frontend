import Footer from "@/components/Footer";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
