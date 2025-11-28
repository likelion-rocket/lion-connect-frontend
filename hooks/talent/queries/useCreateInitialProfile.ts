"use client";

import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { createProfile } from "@/lib/api/profiles";
import { useAuthStore } from "@/store/authStore";
import { useTalentRegisterStore } from "@/store/talentRegisterStore";
import type { ProfileRequest } from "@/types/talent";

/**
 * 초기 프로필 생성 훅
 *
 * 기능:
 * - 프로필이 없을 때 자동으로 초기 프로필 생성
 * - 사용자 이름을 authStore에서 가져옴
 * - 생성된 프로필을 talentRegisterStore에 저장
 *
 * 사용법:
 * - 인재 등록 페이지에서 호출
 * - 프로필이 없으면 자동으로 초기 프로필 POST (한 번만 실행)
 */
export function useCreateInitialProfile() {
  const user = useAuthStore((state) => state.user);
  const profile = useTalentRegisterStore((state) => state.profile);
  const setProfile = useTalentRegisterStore((state) => state.setProfile);
  const hasAttemptedRef = useRef(false);

  const mutation = useMutation({
    mutationFn: (data: ProfileRequest) => createProfile(data),
    onSuccess: (newProfile) => {
      // 생성된 프로필을 store에 저장
      setProfile(newProfile);
    },
  });

  useEffect(() => {
    // 이미 시도했거나, 프로필이 있거나, 사용자 정보가 없으면 실행하지 않음
    if (hasAttemptedRef.current || profile || !user || mutation.isPending) {
      return;
    }

    // 한 번만 실행되도록 플래그 설정
    hasAttemptedRef.current = true;

    // 초기 프로필 생성
    const initialProfileData: ProfileRequest = {
      name: user.name || "이름",
      introduction: "",
      storageUrl: "",
      likelionCode: "",
      visibility: "PUBLIC",
    };

    mutation.mutate(initialProfileData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, user]);

  return {
    isCreating: mutation.isPending,
    error: mutation.error,
  };
}
