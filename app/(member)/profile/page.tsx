"use client";

import { ResumeList, Resume } from "./_components/ResumeList";
import { ResumeListHeader } from "./_components/ResumeListHeader";

// 임시 데이터
const mockResumes: Resume[] = [
  {
    id: "1",
    name: "김이름 1",
    status: "작성 완료",
    isPublic: true,
    isViewing: true,
  },
  {
    id: "2",
    name: "김이름 2",
    status: "작성 완료",
    isPublic: false,
    isViewing: false,
  },
  {
    id: "3",
    name: "김이름 3",
    status: "작성 미완료",
    isPublic: false,
    isViewing: false,
  },
];

function ProfilePage() {
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

  return (
    <div className="min-h-screen bg-page p-8 flex justify-center">
      <div className="w-full max-w-[1158px] flex flex-col gap-16">
        <ResumeListHeader onRegister={handleRegister} />
        <ResumeList
          resumes={mockResumes}
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
