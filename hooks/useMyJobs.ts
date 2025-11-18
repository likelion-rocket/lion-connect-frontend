// hooks/useMyJobs.ts
import { useQuery } from "@tanstack/react-query";
import { fetchMyJobs } from "@/lib/api/jobs";
import { useAuthStore } from "@/store/authStore";

export function useMyJobs() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const userId = useAuthStore((s) => s.user?.id);

  const enabled = !!accessToken;

  return useQuery({
    queryKey: ["jobs", "me", userId],
    queryFn: fetchMyJobs,
    enabled,
    retry: false,
  });
}
