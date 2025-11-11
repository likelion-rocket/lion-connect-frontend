// hooks/useMyExperiences.ts
import { useQuery } from "@tanstack/react-query";
import { fetchMyExperiences, type ExperienceResponse } from "@/lib/api/experiences";
import { useAuthStore } from "@/store/authStore";

export function useMyExperiences() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const userId = useAuthStore((s) => s.user?.id);

  const enabled = !!accessToken && !!userId;

  return useQuery<ExperienceResponse[]>({
    queryKey: ["profile", "experiences", userId], // ✅ 계정별로 분리
    queryFn: fetchMyExperiences,
    enabled,
    retry: false,
    refetchOnMount: "always",
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  });
}
