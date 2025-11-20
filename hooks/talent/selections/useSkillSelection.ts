// hooks/useSkillSelection.ts
import { useState, useRef, useEffect } from "react";
import { useMySkills } from "@/hooks/talent/queries/useMySkills";

export function useSkillSelection() {
  const [skillIds, setSkillIds] = useState<number[]>([]);
  const [initialSkillIds, setInitialSkillIds] = useState<number[]>([]);
  const dataLoadedRef = useRef(false);

  const { data: mySkills } = useMySkills();

  useEffect(() => {
    if (!mySkills || dataLoadedRef.current) return;

    const serverIds = mySkills.map((s) => s.id);
    setSkillIds(serverIds);
    setInitialSkillIds(serverIds);
    dataLoadedRef.current = true;
  }, [mySkills]);

  return {
    skillIds,
    setSkillIds,
    initialSkillIds,
    setInitialSkillIds,
  };
}
