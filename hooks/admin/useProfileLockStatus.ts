import { useMutation, useQueryClient } from "@tanstack/react-query";
import { lockProfile, unlockProfile } from "@/lib/api/adminUsers";
import { AdminUsersResponse } from "@/types/admin";

/**
 * 프로필 잠금/해제 상태 관리 커스텀 훅
 *
 * @description
 * 관리자가 사용자 프로필을 잠금/해제할 수 있는 기능을 제공합니다.
 * Optimistic Update를 사용하여 즉시 UI를 업데이트하고, 에러 시 롤백합니다.
 * - 잠금 상태(locked): lock API 호출
 * - 해제 상태(unlocked): unlock API 호출
 *
 * @param userId - 대상 사용자 ID
 *
 * @example
 * const lockMutation = useProfileLockStatus(userId);
 *
 * // 잠금 상태로 전환 (현재 해제 상태 → 잠금)
 * lockMutation.mutate(true);
 *
 * // 해제 상태로 전환 (현재 잠금 상태 → 해제)
 * lockMutation.mutate(false);
 */
export function useProfileLockStatus(userId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (shouldLock: boolean) => {
      // shouldLock이 true면 잠금, false면 해제
      if (shouldLock) {
        return await lockProfile(userId);
      } else {
        return await unlockProfile(userId);
      }
    },
    // Optimistic Update: 서버 응답 전에 UI 즉시 업데이트
    onMutate: async (shouldLock: boolean) => {
      // 모든 adminUsers 쿼리 취소 (페이지네이션 포함)
      await queryClient.cancelQueries({ queryKey: ["adminUsers"] });

      // 모든 adminUsers 쿼리 데이터 백업
      const previousQueries = queryClient.getQueriesData<AdminUsersResponse>({
        queryKey: ["adminUsers"],
      });

      // 모든 adminUsers 쿼리의 캐시 즉시 업데이트
      queryClient.setQueriesData<AdminUsersResponse>(
        { queryKey: ["adminUsers"] },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            content: old.content.map((user) =>
              user.id === userId
                ? { ...user, locked: shouldLock } // locked 필드 업데이트
                : user
            ),
          };
        }
      );

      // 롤백용 데이터 반환
      return { previousQueries };
    },
    // 에러 발생 시 롤백
    onError: (error, _variables, context) => {
      console.error("프로필 잠금 상태 변경 실패:", error);

      // 이전 데이터로 복원
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }

      // TODO: 토스트 알림 추가
    },
    // 성공 시 (invalidateQueries 제거)
    onSuccess: () => {
      // invalidateQueries를 호출하지 않음 - Optimistic Update가 이미 캐시를 업데이트했으므로
    },
  });
}
