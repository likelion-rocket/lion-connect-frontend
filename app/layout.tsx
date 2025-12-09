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

// SUITE 폰트 설정 (여러 weight)
const suite = localFont({
  src: [
    {
      path: "../public/fonts/SUITE-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/SUITE-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/SUITE-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/SUITE-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/SUITE-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/SUITE-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/SUITE-Heavy.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-suite",
  display: "swap",
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${suite.variable}`}>
      <body className={pretendard.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
