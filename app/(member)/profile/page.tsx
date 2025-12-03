"use client";

import { ResumeList, Resume } from "./_components/ResumeList";
import { ResumeListHeader } from "./_components/ResumeListHeader";
import { useMyProfiles } from "@/hooks/talent/queries/useMyProfiles";

function ProfilePage() {
  // ✅ API 데이터 조회
  const { data: profiles, isLoading, error } = useMyProfiles();

  const handleRegister = () => {
    console.log("Register new resume");
  };

  const handleTogglePublic = (id: string) => {
    console.log("Toggle public:", id);
  };

  const handleEdit = (id: string) => {
    console.log("Edit:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete:", id);
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
        <ResumeListHeader onRegister={handleRegister} />
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
