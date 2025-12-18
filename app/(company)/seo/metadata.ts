import { Metadata } from "next";
import { SEO } from "./index";

/**
 * 인재용 대시보드 메타데이터 (최우선 SEO)
 */
export const dashboardMetadata: Metadata = {
  title: {
    default: "채용 공고 탐색 - 라이언 커넥트",
    template: "%s | 라이언 커넥트",
  },
  description:
    "멋쟁이사자처럼 출신 IT 인재를 위한 맞춤 채용 공고를 탐색하세요. 개발자, 기획자, 디자이너 직무별 최신 채용 정보를 지금 확인하세요.",
  keywords: [
    "라이언 커넥트",
    "멋쟁이사자처럼 채용",
    "개발자 채용공고",
    "신입 개발자",
    "IT 인재",
    "채용 정보",
    "스타트업 채용",
    "개발자 구직",
    "부트캠프 수료생",
    "주니어 개발자 채용",
    "멋쟁이사자처럼",
  ] as string[],
  openGraph: {
    type: "website",
    locale: SEO.locale,
    url: `${SEO.url}/dashboard`,
    title: "채용 공고 탐색 - 라이언 커넥트",
    description: "멋쟁이사자처럼 출신 IT 인재를 위한 맞춤 채용 공고를 탐색하세요.",
    siteName: SEO.siteName,
    images: [
      {
        url: SEO.images.ogImage,
        width: 1200,
        height: 630,
        alt: "라이언 커넥트 - IT 인재 채용 공고 탐색",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "채용 공고 탐색 - 라이언 커넥트",
    description: "멋쟁이사자처럼 출신 IT 인재를 위한 맞춤 채용 공고를 탐색하세요.",
    images: [SEO.images.twitterImage],
  },
  alternates: {
    canonical: `${SEO.url}/dashboard`,
  },
  robots: {
    index: true,
    follow: true,
  },
};
