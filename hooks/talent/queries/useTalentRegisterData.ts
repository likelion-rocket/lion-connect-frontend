"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { useTalentRegisterStore } from "@/store/talentRegisterStore";
import { fetchTalentRegisterData } from "@/lib/api/talentRegister";
import { useEffect } from "react";

/**
 * 인재 등록 페이지 데이터 조회 훅
 *
 * 기능:
 * 1. 페이지 진입 시 모든 섹션 데이터 조회
 * 2. 조회한 데이터를 전역 상태(useTalentRegisterStore)에 자동 저장
 * 3. authStore에서 user 정보(전화번호, 이메일) 가져오기
 *
 * 사용법:
 * - page.tsx에서 호출하여 데이터 fetch 트리거
 * - 각 섹션 컴포넌트는 useTalentRegisterStore에서 필요한 데이터만 선택적으로 구독
 */
export function useTalentRegisterData() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const user = useAuthStore((s) => s.user);
  const userId = user?.id;

  const {
    setProfile,
    setEducations,
    setExperiences,
    setLanguages,
    setCertifications,
    setAwards,
    setExpTags,
    setJobCategories,
    setProfileLinks,
    setLoading,
    setError,
  } = useTalentRegisterStore();

  const enabled = !!accessToken && !!userId;

  const query = useQuery({
    queryKey: ["talentRegister", "me", userId],
    queryFn: fetchTalentRegisterData,
    enabled,
    retry: false, // apiClient가 401 자동 처리
    refetchOnMount: "always", // 최신 데이터 보장
    staleTime: 0, // 즉시 stale 처리
    gcTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });

  // React Query 데이터를 Zustand store에 자동 동기화
  useEffect(() => {
    if (query.data) {
      setProfile(query.data.profile);
      setEducations(query.data.educations);
      setExperiences(query.data.experiences);
      setLanguages(query.data.languages);
      setCertifications(query.data.certifications);
      setAwards(query.data.awards);
      setExpTags(query.data.expTags);
      setJobCategories(query.data.jobCategories);
      setProfileLinks(query.data.profileLinks);
    }
  }, [
    query.data,
    setProfile,
    setEducations,
    setExperiences,
    setLanguages,
    setCertifications,
    setAwards,
    setExpTags,
    setJobCategories,
    setProfileLinks,
  ]);

  // 로딩/에러 상태 동기화
  useEffect(() => {
    setLoading(query.isLoading);
  }, [query.isLoading, setLoading]);

  useEffect(() => {
    setError(query.error ? (query.error as Error).message : null);
  }, [query.error, setError]);

  return {
    // React Query 상태
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,

    // authStore에서 가져온 user 정보
    user,
  };
}
