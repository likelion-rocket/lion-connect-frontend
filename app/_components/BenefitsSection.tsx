import Image from "next/image";

type BenefitCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: "left" | "right";
};

/**
 * BenefitCard Component
 * @description 반응형 디자인 적용, 공백 최소화
 * - Mobile: 세로 스택, 최소 패딩
 * - Tablet: 중간 패딩, 세로 스택 유지
 * - Desktop: 가로 레이아웃, 적절한 간격
 */
function BenefitCard({ title, description, imageSrc, imageAlt, imagePosition }: BenefitCardProps) {
  return (
    <div
      className={`w-full px-4 py-6 sm:px-8 sm:py-10 md:px-16 md:py-12 lg:px-24 lg:py-16 xl:px-[80px] xl:py-[80px]
        flex flex-col gap-6 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-[80px]
        lg:flex-row lg:justify-center lg:items-center
        ${imagePosition === "right" ? "lg:flex-row-reverse" : ""}`}
    >
      {/* 텍스트 영역 */}
      <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-[48px] w-full lg:w-auto lg:flex-1 lg:max-w-[463px]">
        <h3 className="text-text-primary text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-[36px] font-bold leading-tight xl:leading-tight">
          {title}
        </h3>
        <p className="text-text-primary text-sm sm:text-base md:text-base lg:text-base xl:text-base font-normal leading-relaxed xl:leading-normal whitespace-pre-line">
          {description}
        </p>
      </div>

      {/* 이미지 영역 */}
      <div
        className="w-full h-[280px] sm:h-[340px] md:h-[380px] lg:w-[500px] lg:h-[350px] xl:w-[600px] xl:h-[420px]
        relative rounded-lg overflow-hidden shrink-0"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 500px, 600px"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/0 to-black/60" />
      </div>
    </div>
  );
}

function BenefitsSection() {
  const benefits = [
    {
      title: "적합한 인재 탐색",
      description:
        "멋사 대학 누적 수료 학생 수 14,000명 이상, 멋사 부트캠프 누적 수강생 15,000명 이상. 개발, 기획, 데이터 분석, 디자인, 마케팅 등 다양한 직무의 인재가 매년 수천 명씩 멋쟁이사자처럼을 통해 배출되고 있습니다.",
      imageSrc: "/landing/02.png",
      imageAlt: "적합한 인재 탐색",
      imagePosition: "left" as const,
    },
    {
      title: "우수한 IT 인재",
      description:
        "지금까지 1,800개 이상의 서비스가 멋쟁이사자처럼에서 완성됐으며, 탈잉, 그리팅, 자소설닷컴 등 유망 스타트업들이 멋쟁이사자처럼의 인재들로부터 탄생했습니다. 그외에도 국내외 주요 기업에서 멋사 출신 인재들이 활약 중입니다.",
      imageSrc: "/landing/03.png",
      imageAlt: "우수한 IT 인재",
      imagePosition: "right" as const,
    },
  ];

  return (
    <section className="w-full max-w-[1443px] mx-auto pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-28 bg-bg-primary flex flex-col justify-start items-start">
      <div className="self-stretch flex flex-col justify-start items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20">
        {/* Section Title - 반응형 타이틀 */}
        <h2 className="self-stretch px-4 text-center text-text-accent text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
          왜 라이언 커넥트를 사용해야 할까요?
        </h2>

        {/* Benefits Cards Container */}
        <div className="self-stretch flex flex-col justify-start items-center">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;
