import { cn } from "@/utils/utils";
import Image from "next/image";

interface ImageToggleButtonProps {
  /**
   * 버튼 활성화 상태
   * - true: 주황색 이미지 표시
   * - false: 회색 이미지 표시
   */
  isActive: boolean;
  /**
   * 상태 변경 핸들러
   */
  onToggle: (isActive: boolean) => void;
  /**
   * 회색 이미지 경로 (비활성화 상태)
   */
  grayImageSrc: string;
  /**
   * 주황색 이미지 경로 (활성화 상태)
   */
  orangeImageSrc: string;
  /**
   * 이미지 크기 (width, height)
   */
  size?: number;
  /**
   * 커스텀 클래스명
   */
  className?: string;
  /**
   * 이미지 alt 텍스트
   */
  alt?: string;
}

/**
 * Image Toggle Button Component
 *
 * @description
 * 클릭 시 활성화/비활성화 상태를 토글하며, 상태에 따라 회색 또는 주황색 이미지를 표시하는 버튼입니다.
 * 활성화 상태일 때는 주황색 이미지를, 비활성화 상태일 때는 회색 이미지를 보여줍니다.
 *
 * @example
 * // 기본 사용
 * const [isActive, setIsActive] = useState(false);
 * 
 * <ImageToggleButton
 *   isActive={isActive}
 *   onToggle={setIsActive}
 *   grayImageSrc="/icons/icon-gray.svg"
 *   orangeImageSrc="/icons/icon-orange.svg"
 *   size={24}
 *   alt="토글 버튼"
 * />
 *
 * @example
 * // 커스텀 크기와 스타일
 * <ImageToggleButton
 *   isActive={isActive}
 *   onToggle={setIsActive}
 *   grayImageSrc="/icons/star-gray.svg"
 *   orangeImageSrc="/icons/star-orange.svg"
 *   size={32}
 *   className="hover:scale-110 transition-transform"
 *   alt="즐겨찾기"
 * />
 */
export default function ImageToggleButton({
  isActive,
  onToggle,
  grayImageSrc,
  orangeImageSrc,
  size = 24,
  className,
  alt = "toggle button",
}: ImageToggleButtonProps) {
  const handleClick = () => {
    onToggle(!isActive);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      data-state={isActive ? "active" : "default"}
      className={cn(
        "w-10 p-2.5 rounded-lg inline-flex items-center justify-center cursor-pointer transition-colors",
        isActive
          ? "bg-neutral-100 outline outline-[0.80px] outline-offset-[-0.80px] outline-orange-600"
          : "bg-white outline outline-1 outline-offset-[-1px] outline-neutral-200",
        className
      )}
      aria-pressed={isActive}
      aria-label={alt}
    >
      <Image
        src={isActive ? orangeImageSrc : grayImageSrc}
        alt={alt}
        width={size}
        height={size}
        className="object-contain"
      />
    </button>
  );
}
