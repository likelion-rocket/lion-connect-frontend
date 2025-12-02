import Image from "next/image";
import Link from "next/link";
import ScrollDownButton from "./ScrollDownButton";
import BusinessConnectButton from "./BusinessConnectButton";

type HeroSectionProps = {
  backgroundImage?: string;
};

/**
 * @description
 * 랜딩 페이지의 히어로 섹션 컴포넌트입니다.
 * 배경 이미지 위에 타이틀, 서브타이틀, CTA 버튼들을 표시합니다.
 * 페이지 로드 시 순차적인 페이드인 애니메이션이 적용됩니다.
 */
export default function HeroSection({
  backgroundImage = "/images/hero-image.png",
}: HeroSectionProps) {
  return (
    <section className="relative w-full min-w-[1444px] h-screen flex justify-center items-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Lion Connect Hero Background"
          fill
          priority
          className="object-cover animate-[fadeInZoom_1.5s_ease-out_forwards]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 to-black/80 animate-[fadeIn_1s_ease-out_forwards]" />
      </div>

      {/* Content Container */}
      <article className="relative z-10 inline-flex flex-col items-center gap-12">
        {/* Title & Subtitle */}
        <hgroup className="w-[517px] flex flex-col items-center gap-2">
          <h1 className="text-center bg-linear-to-r from-[#FF9859] via-[#FF9859] via-20% to-[#FF6000] bg-clip-text text-transparent text-4xl font-bold font-ko-title leading-10 animate-[fadeInUp_1s_ease-out_0.4s_forwards] opacity-0">
            IT 인재 탐색 및 채용 플랫폼
            <br />
            라이언 커넥트
          </h1>

          <p className="text-center text-text-inverse-primary text-lg font-bold leading-7 animate-[fadeInUp_1s_ease-out_0.6s_forwards] opacity-0">
            지금 바로 우수 IT 인재와 커넥트하세요
          </p>
        </hgroup>

        {/* CTA Buttons */}
        <nav className="inline-flex gap-4 animate-[fadeInUpScale_1s_ease-out_0.9s_forwards] opacity-0">
          <Link
            href="/talents"
            className="h-12 gap-4 px-6 bg-bg-accent rounded-full inline-flex items-center justify-center hover:opacity-90 transition-opacity text-text-inverse-primary text-lg font-semibold leading-7"
          >
            <span>인재 탐색 시작하기</span>
            <Image
              src="/landing/icons/outline-arrow-right.svg"
              alt="Arrow"
              width={16}
              height={16}
            />
          </Link>
          <BusinessConnectButton />
        </nav>
      </article>

      {/* Scroll Down Button */}
      <ScrollDownButton />
    </section>
  );
}
