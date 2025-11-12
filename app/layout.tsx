import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import { Providers } from "./providers";
import { rootMetadata } from "./seo";
import "./globals.css";

// Pretendard Variable 폰트 설정
const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className={pretendard.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
