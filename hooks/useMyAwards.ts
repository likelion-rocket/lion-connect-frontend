"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMyAwards, type AwardListItem } from "@/lib/api/awards";
import { useAuthStore } from "@/store/authStore";

export function useMyAwards() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const userId = useAuthStore((s) => s.user?.id);
  const enabled = !!accessToken && !!userId;

  return useQuery<AwardListItem[]>({
    queryKey: ["profile", "awards", userId],
    queryFn: fetchMyAwards,
    enabled,
    retry: false,
    refetchOnMount: "always",
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  });
}
