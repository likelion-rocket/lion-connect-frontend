import Footer from "@/components/Footer";
import AdminHeader from "@/components/headers/AdminHeader";
import { AdminSidebar } from "./_components/AdminSidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      <div className="flex min-h-screen mx-auto mt-[100px] mb-10">
        <AdminSidebar />
        <main className="w-[1043px] p-8">{children}</main>
      </div>
      {/* 페이지네이션 넣기 */}
      <Footer />
    </div>
  );
}
