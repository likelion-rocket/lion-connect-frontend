// hooks/useTendencySelection.ts
import { useState, useRef, useEffect } from "react";
import { useMyTendencies } from "@/hooks/talent/queries/useMyTendencies";

export function useTendencySelection() {
  const [tendencyIds, setTendencyIds] = useState<number[]>([]);
  const [initialTendencyIds, setInitialTendencyIds] = useState<number[]>([]);
  const dataLoadedRef = useRef(false);

  const { data: myTendencies } = useMyTendencies();

  useEffect(() => {
    if (!myTendencies || dataLoadedRef.current) return;

    const ids = myTendencies.map((t) => t.id);
    setTendencyIds(ids);
    setInitialTendencyIds(ids);
    dataLoadedRef.current = true;
  }, [myTendencies]);

  return {
    tendencyIds,
    setTendencyIds,
    initialTendencyIds,
    setInitialTendencyIds,
  };
}
