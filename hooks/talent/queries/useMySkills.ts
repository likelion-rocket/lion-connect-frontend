// hooks/useMySkills.ts
import { useQuery } from "@tanstack/react-query";
import { fetchMySkills } from "@/lib/api/skills";
import { useAuthStore } from "@/store/authStore";

export function useMySkills() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const userId = useAuthStore((s) => s.user?.id);

  const enabled = !!accessToken;

  return useQuery({
    queryKey: ["skills", "me", userId],
    queryFn: fetchMySkills,
    enabled,
    retry: false,
  });
}
