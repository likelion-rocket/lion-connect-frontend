// components/talent/PersonalTypeChips.tsx
import { Chip } from "@/components/ui/chip";

const PERSONAL_TENDENCIES = [
  "안전 기업형",
  "성장 기업형",
  "수직적 문화형",
  "수평적 문화형",
  "속도형",
  "퀄리티형",
  "애자일형",
  "워터폴형",
  "팔로워형",
  "규칙형",
  "창의형",
  "리더형",
  "스페셜 리스트형",
  "제너럴 리스트형",
  "결과 중심형",
  "과정 중심형",
  "현실주의형",
  "이상주의형",
];

type PersonalTypeChipsProps = {
  /** 특정 항목만 보여주고 싶으면 keys 전달, 없으면 전체 렌더 */
  values?: string[];
  className?: string;
};

export default function PersonalTypeChips({ values, className = "" }: PersonalTypeChipsProps) {
  const items = values && values.length > 0 ? values : PERSONAL_TENDENCIES;
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((label) => (
        <Chip key={label} variant="tendency">
          {label}
        </Chip>
      ))}
    </div>
  );
}
