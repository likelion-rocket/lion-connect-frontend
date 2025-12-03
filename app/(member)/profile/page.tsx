"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ResumeList, Resume } from "./_components/ResumeList";
import { ResumeListHeader } from "./_components/ResumeListHeader";
import { useMyProfiles } from "@/hooks/talent/queries/useMyProfiles";
import { createEmptyProfile, updateProfile, deleteProfile } from "@/lib/api/profiles";
import { useToastStore } from "@/store/toastStore";

function ProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: profiles, isLoading, error } = useMyProfiles();
  const showToast = useToastStore((state) => state.showToast);

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
      queryClient.invalidateQueries({ queryKey: ["profiles", "me"] });
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
      queryClient.invalidateQueries({ queryKey: ["profiles", "me"] });
    },
    onError: () => {
      showToast("이력서 삭제에 실패했습니다.", "error");
    },
  });

  const handleRegister = () => {
    createMutation.mutate();
  };

  const handleTogglePublic = (id: string) => {
    const profile = profiles?.find((p) => String(p.id) === id);
    if (!profile) return;

    togglePublicMutation.mutate({ id: Number(id), profile });
  };

  const handleEdit = (id: string) => {
    router.push(`/profile/${id}`);
  };

  const handleDelete = (id: string) => {
    if (!confirm("정말 이 이력서를 삭제하시겠습니까?")) return;
    deleteMutation.mutate(Number(id));
  };

  const handleCloseAlert = (id: string) => {
    console.log("Close alert:", id);
  };

  // ✅ API 응답 데이터를 컴포넌트에 맞게 변환
  const resumes: Resume[] =
    profiles?.map((profile) => ({
      id: String(profile.id),
      name: profile.name || "이름 없음",
      status: profile.status === "COMPLETED" ? "작성 완료" : "작성 미완료",
      isPublic: profile.visibility === "PUBLIC",
      isViewing: false, // 필요시 로직 추가
    })) ?? [];

  // ✅ 로딩/에러 상태 처리
  if (isLoading) {
    return (
      <div className="min-h-screen bg-page p-8 flex justify-center items-center">
        <div>로딩 중...</div>
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
