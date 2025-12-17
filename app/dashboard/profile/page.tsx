"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ResumeList, Resume } from "./_components/ResumeList";
import { ResumeListHeader } from "./_components/ResumeListHeader";
import { ResumeCardSkeleton } from "./_components/ResumeCardSkeleton";
import { useMyProfiles } from "@/hooks/talent/queries/useMyProfiles";
import { createEmptyProfile, updateProfile, deleteProfile } from "@/lib/api/profiles";
import { useToastStore } from "@/store/toastStore";
import { useAuthStore } from "@/store/authStore";
import { useConfirm } from "@/contexts/ConfirmContext";

function ProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: profiles, isLoading, error } = useMyProfiles();
  const showToast = useToastStore((state) => state.showToast);
  const userId = useAuthStore((state) => state.user?.id);
  const confirm = useConfirm();

  // 신규 이력서 생성 mutation
  const createMutation = useMutation({
    mutationFn: () => createEmptyProfile("새 이력서"),
    onSuccess: (newProfile) => {
      router.push(`/profile/${newProfile.id}`);
    },
    onError: () => {
      showToast("이력서 생성에 실패했습니다.", "error");
    },
  });

  // 공개/비공개 토글 mutation
  const togglePublicMutation = useMutation({
    mutationFn: ({ id, profile }: { id: number; profile: any }) =>
      updateProfile(id, {
        ...profile,
        visibility: profile.visibility === "PUBLIC" ? "PRIVATE" : "PUBLIC",
      }),
    onSuccess: () => {
      showToast("공개 설정이 변경되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["profile", "list", userId] });
    },
    onError: () => {
      showToast("공개 설정 변경에 실패했습니다.", "error");
    },
  });

  // 이력서 삭제 mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteProfile(id),
    onSuccess: () => {
      showToast("이력서가 삭제되었습니다.");
      // useMyProfiles의 queryKey와 동일하게 설정하여 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["profile", "list", userId] });
    },
    onError: () => {
      showToast("이력서 삭제에 실패했습니다.", "error");
    },
  });

  const handleRegister = () => {
    createMutation.mutate();
  };

  const handleTogglePublic = async (id: string) => {
    const profile = profiles?.find((p) => String(p.id) === id);
    if (!profile) return;

    // 공개하기 → 공개 중으로 변경할 때만 confirm 모달 표시
    if (profile.visibility === "PRIVATE") {
      const ok = await confirm({
        title: `'${profile.title || "이력서"}'를 공개하시겠습니까?`,
        description: "확인을 누르면 기업이 해당 이력서를 확인할 수 있습니다.",
        confirmLabel: "공개하기",
        cancelLabel: "취소",
      });

      if (!ok) return;
    }

    togglePublicMutation.mutate({ id: Number(id), profile });
  };

  const handleEdit = (id: string) => {
    router.push(`/profile/${id}`);
  };

  const handleDelete = async (id: string) => {
    const ok = await confirm({
      title: "이력서를 삭제할까요?",
      description: "삭제 후에는 복구할 수 없습니다.",
      confirmLabel: "삭제하기",
      cancelLabel: "취소",
    });

    if (!ok) return;
    deleteMutation.mutate(Number(id));
  };

  const handleCloseAlert = (id: string) => {
    console.log("Close alert:", id);
  };

  // ✅ API 응답 데이터를 컴포넌트에 맞게 변환
  const resumes: Resume[] =
    profiles?.map((profile) => ({
      id: String(profile.id),
      title: profile.title || "제목 없음",
      status: profile.status === "COMPLETED" ? "작성 완료" : "작성 미완료",
      isPublic: profile.visibility === "PUBLIC",
      isViewing: false, // 필요시 로직 추가
    })) ?? [];

  // ✅ 로딩 중이거나 데이터가 아직 없는 경우 스켈레톤 표시
  if (isLoading || !profiles) {
    return (
      <div className="min-h-screen bg-page p-8 flex justify-center">
        <div className="w-full max-w-[1158px] flex flex-col gap-16">
          <ResumeListHeader onRegister={handleRegister} disabled={true} />
          <div className="w-full max-w-[1158px] inline-flex flex-col justify-start items-start gap-16">
            {Array.from({ length: 2 }).map((_, index) => (
              <ResumeCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-page p-8 flex justify-center items-center">
        <div>에러가 발생했습니다: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page p-8 flex justify-center">
      <div className="w-full max-w-[1158px] flex flex-col gap-16">
        <ResumeListHeader onRegister={handleRegister} disabled={createMutation.isPending} />
        <ResumeList
          resumes={resumes}
          onTogglePublic={handleTogglePublic}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCloseAlert={handleCloseAlert}
        />
      </div>
    </div>
  );
}

export default ProfilePage;
