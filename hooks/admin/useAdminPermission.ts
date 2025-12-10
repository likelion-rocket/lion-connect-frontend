import { useMutation, useQueryClient } from "@tanstack/react-query";
import { grantAdminRole, revokeAdminRole } from "@/lib/api/adminUsers";
import { AdminUsersResponse } from "@/types/admin";

/**
 * 관리자 권한 관리 커스텀 훅
 *
 * @description
 * 사용자에게 관리자 권한을 부여하거나 제거할 수 있는 기능을 제공합니다.
 * Optimistic Update를 사용하여 즉시 UI를 업데이트하고, 에러 시 롤백합니다.
 * - 권한 부여: POST /api/users/{userId}/roles?role=ADMIN
 * - 권한 제거: DELETE /api/users/{userId}/roles?role=ADMIN
 *
 * @param userId - 대상 사용자 ID
 *
 * @example
 * const adminMutation = useAdminPermission(userId);
 *
 * // 관리자 권한 부여 (현재 일반 회원 → 관리자)
 * adminMutation.mutate(true);
 *
 * // 관리자 권한 제거 (현재 관리자 → 일반 회원)
 * adminMutation.mutate(false);
 */
export function useAdminPermission(userId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (shouldGrantAdmin: boolean) => {
      // shouldGrantAdmin이 true면 권한 부여, false면 권한 제거
      if (shouldGrantAdmin) {
        return await grantAdminRole(userId);
      } else {
        return await revokeAdminRole(userId);
      }
    },
    // Optimistic Update: 서버 응답 전에 UI 즉시 업데이트
    onMutate: async (shouldGrantAdmin: boolean) => {
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
                ? {
                    ...user,
                    roles: shouldGrantAdmin
                      ? [...user.roles.filter(r => r !== "ROLE_ADMIN"), "ROLE_ADMIN"] // ADMIN 역할 추가
                      : user.roles.filter(r => r !== "ROLE_ADMIN"), // ADMIN 역할 제거
                  }
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
      console.error("관리자 권한 변경 실패:", error);

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
