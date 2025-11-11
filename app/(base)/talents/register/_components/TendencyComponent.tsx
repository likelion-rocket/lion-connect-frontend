// app/(base)/talents/register/_components/TendencyComponent.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TENDENCY_ID_MAP } from "@/lib/tendencies/map";

type TendencyPair = { id: string; left: string; right: string };

const TENDENCY_ROWS: TendencyPair[] = [
  { id: "company_type", left: "안정 기업형", right: "성장 기업형" },
  { id: "task_style", left: "수직적 문화형", right: "수평적 문화형" },
  { id: "work_speed", left: "속도형", right: "퀄리티형" },
  { id: "method", left: "에자일형", right: "워터폴형" },
  { id: "rule", left: "규칙형", right: "창의형" },
  { id: "lead", left: "리더형", right: "팔로워형" },
  { id: "list", left: "스프린트 리스트형", right: "제너럴 리스트형" },
  { id: "focus", left: "결과 중심형", right: "과정 중심형" },
  { id: "lifestyle", left: "현실주의형", right: "이상주의형" },
];

function LabelWithBreak({ text }: { text: string }) {
  const parts = text.split(" ");
  return (
    <span className="whitespace-pre-line">
      {parts.map((part, idx) => (
        <span key={idx}>
          {part}
          {idx < parts.length - 1 ? <br /> : null}
        </span>
      ))}
    </span>
  );
}

type Props = {
  /** 선택된 항목 id 배열을 부모에 전달 (PUT 바디용) */
  onChangeSelectedIds?: (ids: number[]) => void;
  /** (옵션) 초기 선택: 백엔드 ids → 컴포넌트 state로 역매핑하고 싶을 때 사용 */
  initialIds?: number[];
};

export default function TendencyComponent({ onChangeSelectedIds, initialIds }: Props) {
  const [selected, setSelected] = useState<Record<string, "left" | "right" | null>>(
    TENDENCY_ROWS.reduce(
      (acc, cur) => {
        acc[cur.id] = null;
        return acc;
      },
      {} as Record<string, "left" | "right" | null>
    )
  );

  // (옵션) initialIds가 있으면 처음 렌더 때 역매핑해 초기 체크 세팅
  useEffect(() => {
    if (!initialIds || initialIds.length === 0) return;
    setSelected((prev) => {
      const next = { ...prev };
      for (const row of TENDENCY_ROWS) {
        const map = TENDENCY_ID_MAP[row.id];
        if (!map) continue;
        if (initialIds.includes(map.leftId)) next[row.id] = "left";
        else if (initialIds.includes(map.rightId)) next[row.id] = "right";
      }
      return next;
    });
  }, [initialIds]);

  const handleSelect = (id: string, side: "left" | "right") => {
    setSelected((prev) => {
      if (prev[id] === side) return { ...prev, [id]: null };
      return { ...prev, [id]: side };
    });
  };

  // 선택 상태 → 백엔드 ids[]로 변환해서 부모에 전달
  const selectedIds = useMemo(() => {
    const ids: number[] = [];
    for (const [key, side] of Object.entries(selected)) {
      if (!side) continue;
      const map = TENDENCY_ID_MAP[key];
      if (!map) continue;
      ids.push(side === "left" ? map.leftId : map.rightId);
    }
    return ids;
  }, [selected]);

  useEffect(() => {
    onChangeSelectedIds?.(selectedIds);
  }, [selectedIds, onChangeSelectedIds]);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-[18px] font-bold text-text-primary mb-4 flex items-center gap-1">
        <span>성향</span>
      </div>

      <div className="grid grid-cols-2 gap-x-12 gap-y-8">
        {TENDENCY_ROWS.map((row) => (
          <div key={row.id} className="relative h-16">
            <div className="absolute top-[22px] left-14 right-14 h-[3px] bg-[#D0D5DD] rounded-full" />

            <div className="absolute top-0 left-0 flex flex-col items-center gap-1 w-16">
              <div className="w-12 h-12 flex items-center justify-center">
                <Checkbox
                  checked={selected[row.id] === "left"}
                  onCheckedChange={() => handleSelect(row.id, "left")}
                />
              </div>
              <button
                type="button"
                onClick={() => handleSelect(row.id, "left")}
                className="w-[88px] text-center text-[13px] leading-5 text-[#1c1c1c]"
              >
                <LabelWithBreak text={row.left} />
              </button>
            </div>

            <div className="absolute top-0 right-0 flex flex-col items-center gap-1 w-16">
              <div className="w-12 h-12 flex items-center justify-center">
                <Checkbox
                  checked={selected[row.id] === "right"}
                  onCheckedChange={() => handleSelect(row.id, "right")}
                />
              </div>
              <button
                type="button"
                onClick={() => handleSelect(row.id, "right")}
                className="w-[88px] text-center text-[13px] leading-5 text-[#1c1c1c]"
              >
                <LabelWithBreak text={row.right} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
