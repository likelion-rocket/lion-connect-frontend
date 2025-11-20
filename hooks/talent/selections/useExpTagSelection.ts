// hooks/useExpTagSelection.ts
import { useState, useRef, useEffect } from "react";
import { useMyExpTags } from "@/hooks/talent/queries/useMyExpTags";

export function useExpTagSelection() {
  const [expTagIds, setExpTagIds] = useState<number[]>([]);
  const [initialExpTagIds, setInitialExpTagIds] = useState<number[]>([]);
  const dataLoadedRef = useRef(false);

  const { data: myExpTags } = useMyExpTags();

  useEffect(() => {
    if (!myExpTags || dataLoadedRef.current) return;

    const ids = myExpTags.map((t) => t.id);
    setExpTagIds(ids);
    setInitialExpTagIds(ids);
    dataLoadedRef.current = true;
  }, [myExpTags]);

  return {
    expTagIds,
    setExpTagIds,
    initialExpTagIds,
    setInitialExpTagIds,
  };
}
