"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { ConfirmModal } from "../components/ConfirmModal";

export type ConfirmOptions = {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

type InternalConfirmState = ConfirmOptions & {
  isOpen: boolean;
  resolve?: (value: boolean) => void;
};

type ConfirmContextValue = {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};

const ConfirmContext = createContext<ConfirmContextValue | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<InternalConfirmState | null>(null);

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setState({
        ...options,
        isOpen: true,
        resolve,
      });
    });
  }, []);

  const handleResolve = (value: boolean) => {
    setState((prev) => {
      if (prev?.resolve) {
        prev.resolve(value);
      }
      return prev ? { ...prev, isOpen: false, resolve: undefined } : prev;
    });
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {/* Global Confirm Modal Host */}
      {state?.isOpen && (
        <ConfirmModal
          open={state.isOpen}
          title={state.title}
          description={state.description}
          confirmLabel={state.confirmLabel || "확인"}
          cancelLabel={state.cancelLabel || "취소"}
          onClose={() => handleResolve(false)}
          onConfirm={() => handleResolve(true)}
        />
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) {
    throw new Error("useConfirm must be used within ConfirmProvider");
  }
  return ctx.confirm;
}
