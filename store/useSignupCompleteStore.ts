"use client";

import { create } from "zustand";

interface SignupCompleteState {
  isSignupComplete: boolean;
  setSignupComplete: (value: boolean) => void;
  reset: () => void;
}

/**
 * 회원가입 완료 상태 관리 Store
 */
export const useSignupCompleteStore = create<SignupCompleteState>((set) => ({
  isSignupComplete: false,
  setSignupComplete: (value: boolean) => set({ isSignupComplete: value }),
  reset: () => set({ isSignupComplete: false }),
}));
