"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMyCertifications, type CertificationListItem } from "@/lib/api/certifications";
import { useAuthStore } from "@/store/authStore";

export function useMyCertifications() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const userId = useAuthStore((s) => s.user?.id);
  const enabled = !!accessToken && !!userId;

  return useQuery<CertificationListItem[]>({
    queryKey: ["profile", "certifications", userId],
    queryFn: fetchMyCertifications,
    enabled,
    retry: false,
    refetchOnMount: "always",
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  });
}
