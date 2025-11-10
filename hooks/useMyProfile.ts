// hooks/useMyProfile.ts
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { fetchMyProfile } from "@/lib/api/profiles";

export function useMyProfile() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const userId = useAuthStore((s) => s.user?.id); // 스토어에 있는 사용자 식별자

  const enabled = !!accessToken; // 로그인 된 경우에만 호출
  return useQuery({
    queryKey: ["profile", "me", userId], // ✅ 사용자별 캐시 분리
    queryFn: fetchMyProfile,
    enabled,
    retry: false,
  });
}
