import { useEffect, useRef, useState } from "react";

/**
 * useScrollAnimation Hook
 *
 * @description
 * IntersectionObserver를 사용하여 스크롤 트리거 애니메이션을 구현하는 커스텀 훅입니다.
 * 요소가 화면에 진입하면 isVisible 상태를 true로 변경하고, 한 번만 실행됩니다.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { ref, isVisible } = useScrollAnimation();
 *
 *   return (
 *     <div
 *       ref={ref}
 *       className={`transition-all duration-1000 ${
 *         isVisible ? "opacity-100" : "opacity-0"
 *       }`}
 *     >
 *       Content
 *     </div>
 *   );
 * }
 * ```
 *
 * @param options - IntersectionObserver 옵션
 * @param options.threshold - 요소가 몇 % 보일 때 트리거할지 (기본값: 0.2)
 * @param options.rootMargin - 루트 요소의 마진 (기본값: "0px 0px -50px 0px")
 * @param options.once - 한 번만 실행할지 여부 (기본값: true)
 *
 * @returns {{ ref: RefObject<T>, isVisible: boolean }}
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(options?: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}) {
  const { threshold = 0.2, rootMargin = "0px 0px -50px 0px", once = true } = options || {};

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect(); // 한 번만 실행
          }
        } else if (!once) {
          setIsVisible(false); // once가 false면 다시 숨김
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}
