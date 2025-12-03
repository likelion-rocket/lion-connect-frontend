"use client";

import { ModalContainer } from "@/components/ModalContainer";
import { cn } from "@/utils/utils";

interface UnsavedChangesModalProps {
  open: boolean;
  onDiscard: () => void;
  onSave: () => void;
}

export function UnsavedChangesModal({ open, onDiscard, onSave }: UnsavedChangesModalProps) {
  return (
    <ModalContainer
      open={open}
      onClose={onDiscard}
      closeOnBackdropClick={false}
      closeOnEsc={false}
      className="w-full max-w-[360px] p-6"
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-text-primary">저장되지 않은 변경 사항이 있습니다.</h2>

        <p className="text-sm text-text-secondary">
          현재 입력된 내용은 지정되지 않습니다.
          <br />
          나가기 전 입력 저장하시겠습니까?
        </p>

        <div className="flex gap-3 pt-4">
          <button
            onClick={onDiscard}
            className={cn(
              "flex-1 px-4 py-2.5 rounded-lg text-sm font-medium",
              "bg-bg-tertiary text-text-primary",
              "hover:bg-bg-quaternary transition-colors"
            )}
          >
            저장하지 않고 나가기
          </button>

          <button
            onClick={onSave}
            className={cn(
              "flex-1 px-4 py-2.5 rounded-lg text-sm font-medium",
              "bg-bg-accent text-text-inverse-primary",
              "hover:bg-brand-06 transition-colors"
            )}
          >
            입력 저장
          </button>
        </div>
      </div>
    </ModalContainer>
  );
}

export default UnsavedChangesModal;
