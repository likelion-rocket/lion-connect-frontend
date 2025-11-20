// hooks/useMyLanguages.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMyLanguages, type LanguageListItem } from "@/lib/api/languages";
import { useAuthStore } from "@/store/authStore";

export function useMyLanguages() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const userId = useAuthStore((s) => s.user?.id);

  const enabled = !!accessToken && !!userId;

  return useQuery<LanguageListItem[]>({
    queryKey: ["profile", "languages", userId], // ✅ 계정별 캐시 분리
    queryFn: fetchMyLanguages, // GET /api/profile/Languages
    enabled,
    retry: false,
    refetchOnMount: "always",
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  });
}
