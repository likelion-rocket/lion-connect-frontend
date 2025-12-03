// hooks/talent/queries/useMyProfiles.ts
import { useQuery } from "@tanstack/react-query";
import { fetchMyProfiles, type ProfileListResponse } from "@/lib/api/profiles";
import { useAuthStore } from "@/store/authStore";

/**
 * 프로필 목록 조회 훅
 * - GET /api/profile
 * - 현재 로그인한 사용자의 모든 프로필 목록을 조회합니다
 */
export function useMyProfiles() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const userId = useAuthStore((s) => s.user?.id);

  const enabled = !!accessToken && !!userId;

  return useQuery<ProfileListResponse[]>({
    queryKey: ["profile", "list", userId], // ✅ 계정별로 캐시 분리
    queryFn: fetchMyProfiles,
    enabled,
    retry: false, // apiClient가 401 자동 처리
    refetchOnMount: "always", // 마운트 시 항상 최신 데이터 가져오기
    staleTime: 0, // 즉시 stale 처리
    gcTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
}
