import Image from "next/image";
import CTAButton from "@/components/buttons/CTAButton";

type HeroSectionProps = {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundImage?: string;
};

/**
 * @description
 * 랜딩 페이지의 히어로 섹션 컴포넌트입니다.
 * 배경 이미지 위에 타이틀, 서브타이틀, CTA 버튼을 표시합니다.
 * 추후 gif 애니메이션 배경으로 교체 가능하도록 설계되었습니다.
 */
export default function HeroSection({
  title = "IT 인재 탐색 및 채용 플랫폼\n라이언 커넥트",
  subtitle = "지금 바로 우수 IT 인재와 커넥트하세요",
  ctaText = "인재 탐색 바로가기",
  ctaHref = "/talents",
  backgroundImage = "/images/landing-image01.jpg",
}: HeroSectionProps) {
  return (
    <section className="relative w-full h-[790px] flex justify-center items-center">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Lion Connect Hero Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 to-black/80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full px-[422px] py-[148px] flex justify-center items-center">
        <div className="flex flex-col justify-start items-center gap-20">
          {/* Title & Subtitle Container */}
          <div className="w-[517px] flex flex-col justify-center items-center gap-2">
            {/* Title */}
            <h1 className="self-stretch text-center text-text-inverse-primary text-4xl font-bold leading-10 whitespace-pre-line">
              {title}
            </h1>

            {/* Subtitle Container: p-2.5 */}
            <div className="p-2.5 flex justify-center items-center">
              <p className="text-center text-text-inverse-primary text-lg font-normal leading-6">
                {subtitle}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <CTAButton href={ctaHref}>{ctaText}</CTAButton>
        </div>
      </div>
    </section>
  );
}
