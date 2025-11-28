"use client";

import { useCallback } from "react";
import { createProfile } from "@/lib/api/profiles";

/**
 * 로그인 후 빈 프로필을 한 번 생성하는 훅
 */
export function useCreateInitialProfile() {
  const createInitialProfile = useCallback(async () => {
    await createProfile({
      name: "",
      introduction: "",
      storageUrl: "",
      likelionCode: "",
      visibility: "PUBLIC" as const,
    });
  }, []);

  return { createInitialProfile };
}
