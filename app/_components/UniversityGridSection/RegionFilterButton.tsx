"use client";

/**
 * RegionFilterButton Component
 * 지역 필터 버튼 컴포넌트
 */
type RegionFilterButtonProps = {
  region: string;
  isActive: boolean;
  onClick: () => void;
};

export default function RegionFilterButton({ region, isActive, onClick }: RegionFilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2.5 rounded-full hover:cursor-pointer text-base font-bold transition-colors ${
        isActive
          ? "bg-orange-600 text-white"
          : "bg-white text-orange-600 border-2 border-orange-600 hover:bg-orange-50"
      }`}
    >
      {region}
    </button>
  );
}
