"use client";

import { cn } from "@/utils/utils";
import { useEffect } from "react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel: string;
  cancelLabel: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-black/50 transition-opacity duration-200"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      <div
        data-type="confirmModal"
        className={cn(
          "relative z-10 w-96 bg-neutral-50 rounded-lg",
          "flex flex-col justify-start items-start mx-4"
        )}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="self-stretch py-5 flex flex-col justify-center items-start gap-2.5">
          <div className="px-5 flex justify-start items-center gap-2.5">
            <h2 className="text-black text-xl font-bold font-['Pretendard'] leading-7">
              {title}
            </h2>
          </div>
          {description && (
            <div className="self-stretch px-5 flex justify-start items-center gap-2.5">
              <p className="text-neutral-500 text-xs font-normal font-['Pretendard'] leading-4 whitespace-pre-line">
                {description}
              </p>
            </div>
          )}
        </div>

        <div className="self-stretch  px-5 pb-5 flex justify-end items-center gap-3">
          <button
            data-color="default"
            data-state="default"
            data-type="cancel"
            onClick={onClose}
            className={cn(
              "px-2 py-1 rounded flex cursor-pointer justify-center items-center gap-2.5",
              "hover:bg-neutral-100 transition-colors"
            )}
          >
            <span className="text-neutral-500 text-sm font-semibold font-['Pretendard'] leading-5">
              {cancelLabel}
            </span>
          </button>

          <button
            data-color="red"
            data-state="default"
            data-type="check"
            onClick={onConfirm}
            className={cn(
              "px-2 py-1 rounded cursor-pointer flex justify-center items-center",
              "hover:bg-red-50 transition-colors"
            )}
          >
            <span className="text-red-500 text-sm font-semibold font-['Pretendard'] leading-5">
              {confirmLabel}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
