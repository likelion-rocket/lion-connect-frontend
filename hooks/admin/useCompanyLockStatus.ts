import { useMutation, useQueryClient } from "@tanstack/react-query";
import { lockCompany, unlockCompany } from "@/lib/api/adminUsers";
import { AdminCompaniesResponse } from "@/types/admin";

/**
 * 기업 회원 잠금/해제 상태 관리 커스텀 훅
 *
 * @description
 * 관리자가 기업 회원을 잠금/해제할 수 있는 기능을 제공합니다.
 * Optimistic Update를 사용하여 즉시 UI를 업데이트하고, 에러 시 롤백합니다.
 * - 잠금 상태(locked): POST /api/admin/companies/{companyId}/lock
 * - 해제 상태(unlocked): POST /api/admin/companies/{companyId}/unlock
 *
 * @param companyId - 대상 기업 회원 ID
 *
 * @example
 * const lockMutation = useCompanyLockStatus(companyId);
 *
 * // 잠금 상태로 전환 (현재 해제 상태 → 잠금)
 * lockMutation.mutate(true);
 *
 * // 해제 상태로 전환 (현재 잠금 상태 → 해제)
 * lockMutation.mutate(false);
 */
export function useCompanyLockStatus(companyId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (shouldLock: boolean) => {
      // shouldLock이 true면 잠금, false면 해제
      if (shouldLock) {
        return await lockCompany(companyId);
      } else {
        return await unlockCompany(companyId);
      }
    },
    // Optimistic Update: 서버 응답 전에 UI 즉시 업데이트
    onMutate: async (shouldLock: boolean) => {
      // 모든 adminCompanies 쿼리 취소 (페이지네이션 포함)
      await queryClient.cancelQueries({ queryKey: ["adminCompanies"] });

      // 모든 adminCompanies 쿼리 데이터 백업
      const previousQueries = queryClient.getQueriesData<AdminCompaniesResponse>({
        queryKey: ["adminCompanies"],
      });

      // 모든 adminCompanies 쿼리의 캐시 즉시 업데이트
      queryClient.setQueriesData<AdminCompaniesResponse>(
        { queryKey: ["adminCompanies"] },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            content: old.content.map((company) =>
              company.id === companyId
                ? { ...company, companyLocked: shouldLock } // companyLocked 필드 업데이트
                : company
            ),
          };
        }
      );

      // 롤백용 데이터 반환
      return { previousQueries };
    },
    // 에러 발생 시 롤백
    onError: (error, _variables, context) => {
      console.error("기업 회원 잠금 상태 변경 실패:", error);

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
