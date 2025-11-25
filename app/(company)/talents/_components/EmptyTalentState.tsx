import Image from "next/image";

type EmptyTalentStateProps = {
  hasFilters: boolean;
};

export default function EmptyTalentState({ hasFilters }: EmptyTalentStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] py-16">
      <div className="relative w-32 h-32 mb-6 opacity-40">
        <Image
          src="/icons/outline-search.svg"
          alt="검색 결과 없음"
          fill
          className="object-contain"
        />
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {hasFilters ? "검색 조건에 부합하는 인재가 없습니다" : "등록된 인재가 없습니다"}
      </h3>

      <p className="text-sm text-gray-500 text-center max-w-md">
        {hasFilters
          ? "다른 검색 조건으로 시도해보시거나, 필터를 초기화해보세요."
          : "아직 등록된 인재 프로필이 없습니다."}
      </p>
    </div>
  );
}
