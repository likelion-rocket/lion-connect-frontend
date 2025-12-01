import { create } from "zustand";

type ToastType = "success" | "error" | "info";

interface ToastState {
  isVisible: boolean;
  message: string;
  type: ToastType;
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  isVisible: false,
  message: "",
  type: "success",
  showToast: (message: string, type: ToastType = "success") =>
    set({ isVisible: true, message, type }),
  hideToast: () => set({ isVisible: false, message: "", type: "success" }),
}));
