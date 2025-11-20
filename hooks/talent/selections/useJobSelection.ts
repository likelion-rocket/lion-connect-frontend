// hooks/useJobSelection.ts
import { useState, useRef, useEffect } from "react";
import { useMyJobs } from "@/hooks/talent/queries/useMyJobs";
import { findJobGroupByJobName } from "@/constants/jobs";

export function useJobSelection() {
  const [jobGroup, setJobGroup] = useState("");
  const [job, setJob] = useState("");
  const [initialJobName, setInitialJobName] = useState<string>("");
  const dataLoadedRef = useRef(false);

  const { data: myJobs, refetch: refetchJobs } = useMyJobs();

  useEffect(() => {
    if (!myJobs || dataLoadedRef.current) return;

    if (myJobs.length === 0) {
      dataLoadedRef.current = true;
      return;
    }

    const last = myJobs[myJobs.length - 1];
    const nameFromServer = (last.name ?? "").trim();

    if (!nameFromServer) {
      dataLoadedRef.current = true;
      return;
    }

    setInitialJobName((prev) => prev || nameFromServer);
    setJob((prev) => (prev.trim() ? prev : nameFromServer));

    setJobGroup((prev) => {
      if (prev.trim()) return prev;
      const group = findJobGroupByJobName(nameFromServer);
      return group || prev;
    });

    dataLoadedRef.current = true;
  }, [myJobs]);

  return {
    jobGroup,
    setJobGroup,
    job,
    setJob,
    initialJobName,
    setInitialJobName,
    refetchJobs,
  };
}
