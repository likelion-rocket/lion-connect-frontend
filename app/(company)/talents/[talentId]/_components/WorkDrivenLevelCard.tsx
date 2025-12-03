import Image from "next/image";

interface WorkDrivenLevelCardProps {
  level?: number;
}

export default function WorkDrivenLevelCard({ level }: WorkDrivenLevelCardProps) {
  // level 값이 없으면 테스트 결과가 없다는 메시지 표시
  if (level === undefined || level === null) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div
          className="w-full flex justify-center items-center"
          style={{ width: "293px", height: "282px", margin: "0 auto" }}
        >
          <p className="text-gray-500 text-center">테스트 결과가 없습니다</p>
        </div>
      </div>
    );
  }

  // level 값 유효성 검증 (1~5 범위, 기본값 3)
  const validLevel = Math.min(Math.max(1, Math.round(level)), 5);
  const imagePath = `/images/detailpage-type=level${validLevel}.svg`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <div className="w-full flex justify-center">
        <Image
          src={imagePath}
          alt={`Work Driven Level ${validLevel}`}
          width={293}
          height={282}
          className="w-auto h-auto"
          priority
        />
      </div>
    </div>
  );
}
