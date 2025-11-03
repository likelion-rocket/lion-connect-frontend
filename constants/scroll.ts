/**
 * 스크롤 관련 상수
 */

/**
 * 페이지 로드 시 해시 스크롤의 지연 시간 (ms)
 * - DOM이 완전히 렌더링된 후 스크롤하기 위한 최소 지연 시간
 */
export const SCROLL_DELAY_MS = 100;

/**
 * 스크롤 동작 옵션
 */
export const SCROLL_BEHAVIOR = "smooth" as const;

/**
 * 스크롤 정렬 옵션
 */
export const SCROLL_BLOCK = "start" as const;

/**
 * ScrollToTop 버튼 표시 임계값 (px)
 * - 이 값 이상 스크롤하면 버튼이 나타남
 */
export const SCROLL_TO_TOP_THRESHOLD = 300;

/**
 * 스크롤 이벤트 throttle 지연 시간 (ms)
 * - 성능 최적화를 위한 이벤트 제한 간격
 */
export const SCROLL_THROTTLE_DELAY = 100;
