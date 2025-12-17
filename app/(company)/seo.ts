import { Metadata } from "next";

/**
 * SEO 상수 - 프로젝트 전체에서 사용되는 메타데이터
 * Open Graph, Twitter Cards, JSON-LD 포함
 */
export const SEO = {
  title: {
    default: "라이언 커넥트 - IT 인재 탐색 및 채용 플랫폼",
    template: "%s | 라이언 커넥트",
  },
  description:
    "멋쟁이사자처럼 출신 IT 인재 14,000명 이상과 연결하세요. 개발자, 기획자, 디자이너, 데이터 분석가 등 우수한 실무형 인재를 라이언 커넥트에서 탐색하고 채용하세요.",
  keywords: [
    "IT 인재 채용",
    "개발자 채용",
    "멋쟁이사자처럼",
    "스타트업 채용",
    "신입 개발자",
    "주니어 개발자",
    "부트캠프 수료생",
    "IT 인재 플랫폼",
    "테크 인재",
    "개발자 구인",
  ] as string[],
  url: "https://like-lion.netlify.app/", // TODO: 실제 도메인으로 변경
  siteName: "라이언 커넥트",
  locale: "ko_KR" as const,
  type: "website" as const,
  images: {
    ogImage: "/meta/1200x630.png",
    twitterImage: "/meta/800x418.png",
  },
};

/**
 * Root Layout Metadata
 */
export const rootMetadata: Metadata = {
  metadataBase: new URL(SEO.url),
  title: SEO.title,
  description: SEO.description,
  keywords: SEO.keywords,
  authors: [{ name: "멋쟁이사자처럼" }],
  creator: "멋쟁이사자처럼",
  publisher: "라이언 커넥트",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: SEO.type,
    locale: SEO.locale,
    url: SEO.url,
    title: SEO.title.default,
    description: SEO.description,
    siteName: SEO.siteName,
    images: [
      {
        url: SEO.images.ogImage,
        width: 1200,
        height: 630,
        alt: "라이언 커넥트 - IT 인재 탐색 및 채용 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title.default,
    description: SEO.description,
    images: [SEO.images.twitterImage],
    creator: "@likelion_korea", // TODO: 실제 트위터 계정으로 변경
  },
  verification: {
    google: "google-site-verification-code", // TODO: Google Search Console 인증 코드
    // naver: "naver-site-verification-code", // TODO: 네이버 서치어드바이저 인증 코드
  },
};

/**
 * 랜딩 페이지 Metadata
 */
export const landingMetadata: Metadata = {
  title: "IT 인재 탐색 및 채용",
  description:
    "멋쟁이사자처럼 14,000명 이상의 IT 인재와 연결하세요. 탈잉, 그리팅, 자소설닷컴을 만든 우수 인재들이 여기 있습니다. 지금 바로 적합한 개발자, 기획자, 디자이너를 탐색하세요.",
  openGraph: {
    title: "라이언 커넥트 - IT 인재 탐색 및 채용 플랫폼",
    description:
      "멋쟁이사자처럼 14,000명 이상의 IT 인재와 연결하세요. 개발자, 기획자, 디자이너 등 우수한 실무형 인재를 만나보세요.",
    url: `${SEO.url}/`,
    images: [
      {
        url: SEO.images.ogImage,
        width: 1200,
        height: 630,
        alt: "라이언 커넥트 - 멋쟁이사자처럼 IT 인재 플랫폼",
      },
    ],
  },
  alternates: {
    canonical: `${SEO.url}/`,
  },
};

/**
 * JSON-LD Structured Data for Landing Page
 * Google Search에서 Rich Results 표시를 위한 구조화 데이터
 */
export const landingJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "라이언 커넥트",
  url: SEO.url,
  logo: `${SEO.url}/logo.png`, // TODO: 실제 로고 경로
  description: SEO.description,
  foundingDate: "2024", // TODO: 실제 설립일
  sameAs: [
    // TODO: 실제 소셜 미디어 링크
    "https://www.instagram.com/likelion.official",
    "https://www.facebook.com/likelion.net",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "고객 지원",
    email: "contact@lionconnect.com", // TODO: 실제 이메일
  },
  offers: {
    "@type": "Offer",
    description: "IT 인재 채용 및 탐색 서비스",
  },
};
