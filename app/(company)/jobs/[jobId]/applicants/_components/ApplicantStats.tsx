import { cn } from "@/utils/utils";

export default function ApplicantStats() {
  const stats = [
    { label: "전체", count: 0 },
    { label: "지원 접수", count: 0 },
    { label: "서류 통과", count: 0 },
    { label: "최종 합격", count: 0 },
    { label: "불합격", count: 0 },
  ];

  return (
    <div className="flex justify-between items-center w-full h-[148px]">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={cn(
            "flex flex-col items-center gap-4 py-[25.5px] flex-1",
            index !== 0 && "border-l border-neutral-300"
          )}
        >
          <div className="text-center text-neutral-500 text-5xl font-normal font-['Pretendard'] leading-[60px]">
            {stat.count}
          </div>
          <div className="text-center text-neutral-500 text-sm font-normal font-['Pretendard'] leading-5">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
