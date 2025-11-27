"use client";

import { cn } from "@/utils/utils";
import React, { useEffect } from "react";

interface ModalContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
  variant?: "default" | "dialog";
  children: React.ReactNode;
}

/**
 * 로컬 페이지 모달을 위한 컨테이너
 * 크기는 children 콘텐츠에 자동으로 맞춰집니다.
 */
export function ModalContainer({
  open,
  onClose,
  closeOnBackdropClick = true,
  closeOnEsc = true,
  variant = "default",
  className,
  children,
  ...props
}: ModalContainerProps) {
  useEffect(() => {
    if (!open || !closeOnEsc) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeOnEsc, onClose]);

  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-black/50 transition-opacity duration-200"
        aria-hidden="true"
      />

      <div
        className={cn(
          "relative z-10 bg-bg-page rounded-xl shadow-lg transition-all duration-200 max-h-[90vh] overflow-auto mx-4",
          variant === "dialog" && "border border-border-quaternary",
          className
        )}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

export default ModalContainer;
