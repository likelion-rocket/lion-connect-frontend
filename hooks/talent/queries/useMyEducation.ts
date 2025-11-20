// hooks/useMyEducations.ts
import { useQuery } from "@tanstack/react-query";
import { fetchMyEducations, type EducationListItem } from "@/lib/api/educations";
import { useAuthStore } from "@/store/authStore";

export function useMyEducations() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const userId = useAuthStore((s) => s.user?.id);

  const enabled = !!accessToken && !!userId;

  return useQuery<EducationListItem[]>({
    queryKey: ["profile", "educations", userId], // ✅ 계정별로 분리
    queryFn: fetchMyEducations,
    enabled,
    retry: false,
    refetchOnMount: "always",
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  });
}
