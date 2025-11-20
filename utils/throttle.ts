/**
 * 함수 실행을 제한하는 throttle 유틸리티
 * - 스크롤 이벤트와 같이 빈번하게 발생하는 이벤트 최적화에 사용
 * - 지정된 시간(delay) 동안 최대 1회만 함수 실행
 *
 * @param func - throttle을 적용할 함수
 * @param delay - 최소 실행 간격 (ms)
 * @returns throttle이 적용된 함수
 */
export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}
