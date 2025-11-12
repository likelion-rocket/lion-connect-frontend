"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type QueryParams = {
  [key: string]: string | undefined;
};

/**
 * URL 쿼리 파라미터를 관리하는 커스텀 훅
 *
 * @example
 * const { params, setParam, setParams, clearParams } = useQueryParams();
 * setParam('status', 'new');
 * setParams({ status: 'done', period: '24h' });
 */
export function useQueryParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 현재 모든 쿼리 파라미터를 객체로 반환
  const params: QueryParams = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  /**
   * 단일 쿼리 파라미터 업데이트
   */
  const setParam = useCallback(
    (key: string, value: string | undefined) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      if (value === undefined || value === "") {
        current.delete(key);
      } else {
        current.set(key, value);
      }

      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${window.location.pathname}${query}`, { scroll: false });
    },
    [searchParams, router]
  );

  /**
   * 여러 쿼리 파라미터를 한번에 업데이트
   */
  const setParams = useCallback(
    (updates: QueryParams) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === "") {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      });

      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${window.location.pathname}${query}`, { scroll: false });
    },
    [searchParams, router]
  );

  /**
   * 모든 쿼리 파라미터 제거
   */
  const clearParams = useCallback(() => {
    router.push(window.location.pathname, { scroll: false });
  }, [router]);

  return {
    params,
    setParam,
    setParams,
    clearParams,
  };
}
