// hooks/useMyTendencies.ts
import { useQuery } from "@tanstack/react-query";
import { fetchMyTendencies } from "@/lib/api/tendencies";
import { useAuthStore } from "@/store/authStore";

export function useMyTendencies() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const userId = useAuthStore((s) => s.user?.id); // 현재 로그인 유저 id

  const enabled = !!accessToken; // 로그인 된 경우에만 호출

  return useQuery({
    queryKey: ["tendencies", "me", userId], // ✅ 사용자별 캐시 분리
    queryFn: fetchMyTendencies,
    enabled,
    retry: false,
  });
}
