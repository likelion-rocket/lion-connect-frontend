// hooks/useMyExpTags.ts
import { useQuery } from "@tanstack/react-query";
import { fetchMyExpTags } from "@/lib/api/expTags";
import { useAuthStore } from "@/store/authStore";

export function useMyExpTags() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const userId = useAuthStore((s) => s.user?.id);

  const enabled = !!accessToken;

  return useQuery({
    queryKey: ["expTags", "me", userId],
    queryFn: fetchMyExpTags,
    enabled,
    retry: false,
  });
}
