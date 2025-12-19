"use client";

import { useCallback, useRef } from "react";

/**
 * 디바운싱을 적용한 콜백 함수를 반환하는 훅
 *
 * 사용법:
 * const debouncedFn = useDebounce((id: string) => {
 *   handleDelete(id);
 * }, 1000ms);
 *
 * @param callback 디바운싱할 콜백 함수
 * @param delay 디바운싱 지연 시간 (기본값: 1000ms)
 * @returns 디바운싱이 적용된 콜백 함수
 */
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 1000
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;

  return debouncedCallback;
}
