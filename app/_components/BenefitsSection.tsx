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
 * @description 피그마 기준: h-[580px] px-[150px] py-[80px], gap-[80px]
 */
function BenefitCard({ title, description, imageSrc, imageAlt, imagePosition }: BenefitCardProps) {
  return (
    <div
      className={`self-stretch h-[580px] px-[150px] py-[80px] flex justify-start items-center gap-[80px] ${
        imagePosition === "right" ? "flex-row-reverse" : ""
      }`}
    >
      <div className="flex-1 py-[32px] flex flex-col gap-[48px]">
        <h3 className="text-text-primary text-4xl font-bold leading-[1.25]">{title}</h3>
        <p className="text-text-primary text-base font-normal leading-[1.5] whitespace-pre-line">
          {description}
        </p>
      </div>

      <div className="w-[600px] h-[420px] relative rounded-lg overflow-hidden">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="600px" />
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
        "멋사 대학 누적 수료 학생 수 14,000명 이상, 멋사 부트캠프 \n누적 수강생 15,000명 이상. 개발, 기획, 데이터 분석, 디자인, \n마케팅 등 다양한 직무의 인재가 매년 수천 명씩 멋쟁이사자처럼을 \n통해 배출되고 있습니다.",
      imageSrc: "/landing/02.png",
      imageAlt: "적합한 인재 탐색",
      imagePosition: "left" as const,
    },
    {
      title: "우수한 IT 인재",
      description:
        "지금까지 1,800개 이상의 서비스가 멋쟁이사자처럼에서 \n완성됐으며, 탈잉, 그리팅, 자소설닷컴 등 유망 스타트업들이 \n멋쟁이사자처럼의 인재들로부터 탄생했습니다. 그외에도 \n국내외 주요 기업에서 멋사 출신 인재들이 활약 중입니다.",
      imageSrc: "/landing/03.png",
      imageAlt: "우수한 IT 인재",
      imagePosition: "right" as const,
    },
  ];

  return (
    <section className="w-full max-w-[1443px] mx-auto pt-36 bg-bg-primary flex flex-col justify-start items-start">
      <div className="self-stretch flex flex-col justify-start items-center gap-[80px]">
        {/* Section Title - Figma: text-4xl font-bold leading-[1.25] text-accent */}
        <h2 className="self-stretch text-center text-text-accent text-4xl font-bold leading-[1.25]">
          왜 라이언 커넥트를 사용해야 할까요?
        </h2>

        {/* Benefits Cards Container */}
        <div className="self-stretch flex flex-col justify-start items-start">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;
