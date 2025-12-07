import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 회원가입 Step 1 데이터 타입
interface CompanySignupStep1Data {
  companyName: string;
  businessNumber: string;
  employeeCount: string;
}

interface PersonalSignupStep1Data {
  name: string;
  courseName?: string;
  courseNumber?: string;
}

// 회원가입 스토어 타입
interface SignupStore {
  // 기업 회원가입 Step 1 데이터
  companyStep1: CompanySignupStep1Data | null;
  setCompanyStep1: (data: CompanySignupStep1Data) => void;
  clearCompanyStep1: () => void;

  // 일반 회원가입 Step 1 데이터
  personalStep1: PersonalSignupStep1Data | null;
  setPersonalStep1: (data: PersonalSignupStep1Data) => void;
  clearPersonalStep1: () => void;

  // 전체 초기화
  clearAll: () => void;
}

export const useSignupStore = create<SignupStore>()(
  persist(
    (set) => ({
      companyStep1: null,
      setCompanyStep1: (data) => set({ companyStep1: data }),
      clearCompanyStep1: () => set({ companyStep1: null }),

      personalStep1: null,
      setPersonalStep1: (data) => set({ personalStep1: data }),
      clearPersonalStep1: () => set({ personalStep1: null }),

      clearAll: () => set({ companyStep1: null, personalStep1: null }),
    }),
    {
      name: "signup-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
