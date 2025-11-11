import Image from "next/image";
import Link from "next/link";
import ScrollDownButton from "./ScrollDownButton";

type HeroSectionProps = {
  badge?: string;
  backgroundImage?: string;
};

/**
 * @description
 * 랜딩 페이지의 히어로 섹션 컴포넌트입니다.
 * 배경 이미지 위에 배지, 타이틀, 서브타이틀, CTA 버튼들을 표시합니다.
 * 페이지 로드 시 순차적인 페이드인 애니메이션이 적용됩니다.
 *
 * Note: SEO 최적화를 위해 Server Component로 작성되었으며,
 * 클라이언트 인터랙션이 필요한 ScrollDownButton은 별도 Client Component로 분리되었습니다.
 */
export default function HeroSection({
  badge = "IT 인재 채용 플랫폼 NO.1",
  backgroundImage = "/images/hero-image.png",
}: HeroSectionProps) {
  return (
    <section className="relative w-full min-w-[1444px] h-[790px] flex justify-center items-center overflow-hidden">
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
        {/* Badge */}
        <div className="w-52 h-9 bg-bg-accent/20 rounded-lg outline-[0.80px] outline-offset-[-0.80px] outline-bg-accent/30 overflow-hidden animate-[fadeInUp_1s_ease-out_0.2s_forwards] opacity-0">
          <p className="text-center text-text-accent text-sm font-normal leading-5 pt-[7.60px]">
            {badge}
          </p>
        </div>

        {/* Title & Subtitle */}
        <hgroup className="inline-flex flex-col items-center gap-6">
          <h1 className="lc-heading-ko text-6xl leading-[80px] text-center animate-[fadeInUp_1s_ease-out_0.4s_forwards] opacity-0">
            <span className="text-text-inverse-primary">우수한 IT 인재와</span>
            <br />
            <span className="text-text-accent">지금 바로 연결 </span>
            <span className="text-text-inverse-primary">하세요</span>
          </h1>

          <p className="w-[768px] text-center text-text-inverse-primary/90 text-2xl font-normal leading-8 animate-[fadeInUp_1s_ease-out_0.6s_forwards] opacity-0">
            멋쟁이사자처럼 출신 29,000명 이상의 검증된 인재들이
            <br />
            여러분의 기업을 기다리고 있습니다
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
          <button className="h-12 px-8 bg-white/10 rounded-full outline-[0.80px] outline-offset-[-0.80px] outline-white/30 inline-flex justify-center items-center hover:bg-white/20 transition-colors text-text-inverse-primary text-lg font-semibold leading-7">
            기업 문의하기
          </button>
        </nav>
      </article>

      {/* Scroll Down Button */}
      <ScrollDownButton />
    </section>
  );
}
