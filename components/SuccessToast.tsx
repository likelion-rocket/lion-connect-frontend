"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToastStore } from "@/store/toastStore";

const TOAST_DURATION = 3000; // 3초

// 타입별 스타일 설정 (모두 메인 색상 사용)
const toastStyles = {
  success: {
    border: "border-bg-accent",
    shadow: "shadow-[0_10px_40px_rgba(255,96,0,0.15)]",
    iconBg: "bg-linear-to-br from-bg-accent to-brand-06",
    progressBar: "bg-bg-accent",
  },
  error: {
    border: "border-bg-accent",
    shadow: "shadow-[0_10px_40px_rgba(255,96,0,0.15)]",
    iconBg: "bg-linear-to-br from-bg-accent to-brand-06",
    progressBar: "bg-bg-accent",
  },
  info: {
    border: "border-bg-accent",
    shadow: "shadow-[0_10px_40px_rgba(255,96,0,0.15)]",
    iconBg: "bg-linear-to-br from-bg-accent to-brand-06",
    progressBar: "bg-bg-accent",
  },
};

export default function SuccessToast() {
  const { isVisible, message, type, hideToast } = useToastStore();

  // isVisible이 true가 되면 타이머 시작
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        hideToast();
      }, TOAST_DURATION);

      return () => clearTimeout(timer);
    }
  }, [isVisible, hideToast]);

  const styles = toastStyles[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="fixed top-8 left-1/2 -translate-x-1/2 z-100 max-w-md w-full mx-4"
        >
          <div
            className={`bg-bg-primary border-2 ${styles.border} rounded-2xl ${styles.shadow} overflow-hidden`}
          >
            <div className="p-6 flex items-center gap-4">
              {/* 아이콘 */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 15 }}
                className={`shrink-0 w-12 h-12 ${styles.iconBg} rounded-full flex items-center justify-center`}
              >
                {type === "success" ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.3, duration: 0.3, ease: "easeOut" }}
                      d="M5 13l4 4L19 7"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : type === "error" ? (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.3, duration: 0.3, ease: "easeOut" }}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.3, duration: 0.3, ease: "easeOut" }}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </motion.div>

              {/* 메시지 */}
              <div className="flex-1">
                <p className="text-base font-bold text-text-primary">{message}</p>
              </div>

              {/* 닫기 버튼 */}
              <button
                onClick={hideToast}
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg-tertiary transition-colors"
                aria-label="알림 닫기"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4L4 12M4 4L12 12"
                    stroke="currentColor"
                    className="text-text-secondary"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* 진행 바 */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: TOAST_DURATION / 1000, ease: "linear" }}
              className={`h-1 ${styles.progressBar} origin-left`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
