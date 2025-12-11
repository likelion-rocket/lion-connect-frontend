"use client";

import { useState } from "react";
import Image from "next/image";
import OrangeBgButton from "@/components/ui/OrangeBgButton";

interface Resume {
  id: string;
  name: string;
  isPublic: boolean;
}

interface JobApplicationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (resumeId: string) => void;
}

export default function JobApplicationPanel({
  isOpen,
  onClose,
  onSubmit,
}: JobApplicationPanelProps) {
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);

  // TODO: API 호출로 실제 이력서 목록 가져오기
  const mockResumes: Resume[] = [
    { id: "1", name: "김멋사", isPublic: true },
    { id: "2", name: "김멋사", isPublic: false },
    { id: "3", name: "김멋사", isPublic: false },
  ];

  const handleResumeSelect = (resumeId: string) => {
    setSelectedResumeId(resumeId);
  };

  const handleSubmit = () => {
    if (selectedResumeId) {
      onSubmit(selectedResumeId);
    }
  };

  const handleNewResume = () => {
    // TODO: 새 이력서 작성 페이지로 이동
    console.log("새 이력서 작성");
  };

  if (!isOpen) return null;

  return (
    <div
      data-type={selectedResumeId ? "opened_select" : "opened"}
      className="w-96 bg-white rounded-lg inline-flex flex-col justify-start items-start gap-8 lc-card-shadow outline outline-2 outline-offset-[-1px] outline-neutral-300"
    >
      {/* 헤더 */}
      <div className="self-stretch px-5 py-6 rounded-tl-lg rounded-tr-lg outline outline-[0.80px] outline-offset-[-0.80px] outline-neutral-200 flex flex-col justify-center items-start gap-2.5 overflow-hidden">
        <div className="self-stretch inline-flex justify-start items-center gap-28">
          <button
            onClick={onClose}
            className="w-6 h-6 relative flex items-center justify-center cursor-pointer"
            aria-label="닫기"
          >
            <Image
              src="/icons/solid-cheveron-left.svg"
              alt="닫기"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </button>
          <div className="justify-start text-neutral-800 text-xl font-bold font-['Pretendard'] leading-7">
            지원 하기
          </div>
        </div>
      </div>

      {/* 이력서 선택 영역 */}
      <div className="self-stretch p-5 flex flex-col justify-start items-start gap-12 overflow-hidden">
        <div className="justify-start text-black text-2xl font-bold font-['Pretendard'] leading-8">
          첨부 이력서 선택
        </div>

        {/* 이력서 목록 */}
        <div className="self-stretch flex flex-col justify-start items-start gap-8">
          {mockResumes.map((resume) => (
            <div
              key={resume.id}
              data-status={resume.isPublic ? "publicResume" : "notPublicResume"}
              className="w-80 px-4 py-6 bg-neutral-50 rounded-lg outline outline-[0.80px] outline-offset-[-0.80px] outline-neutral-200 flex flex-col justify-start items-start overflow-hidden cursor-pointer"
              onClick={() => handleResumeSelect(resume.id)}
            >
              <div className="self-stretch inline-flex justify-start items-start">
                <div className="flex-1 flex justify-start items-center gap-12">
                  {/* 체크박스 */}
                  <div
                    data-state={selectedResumeId === resume.id ? "on" : "off"}
                    data-type="enabled"
                    className="w-6 h-6 relative"
                  >
                    <div className="w-6 h-6 left-0 top-0 absolute" />
                    {selectedResumeId === resume.id ? (
                      <div className="w-4 h-4 left-[3px] top-[3px] absolute bg-orange-600 rounded-[3px] flex items-center justify-center">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 3L4.5 8.5L2 6"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-4 h-4 left-[3px] top-[3px] absolute rounded-[3px] border-2 border-neutral-500" />
                    )}
                  </div>

                  {/* 이력서 정보 */}
                  <div className="flex justify-start items-center gap-3">
                    <div className="justify-start text-black text-base font-normal font-['Pretendard'] leading-6">
                      {resume.name}
                    </div>
                    {resume.isPublic && (
                      <div className="px-2 py-0.5 bg-orange-50 rounded flex justify-center items-center gap-2.5">
                        <div className="justify-start text-orange-600 text-xs font-semibold font-['Pretendard'] leading-4">
                          공개 중
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {!resume.isPublic && <div className="w-6 h-6 relative" />}
              </div>
            </div>
          ))}
        </div>

        {/* 새 이력서 작성 버튼 */}
        <button
          data-state="default"
          onClick={handleNewResume}
          className="w-80 h-14 relative bg-white rounded-lg outline outline-[0.80px] outline-offset-[-0.80px] outline-neutral-300 overflow-hidden cursor-pointer hover:bg-neutral-50 transition-colors"
        >
          <div className="left-[121px] top-[17px] absolute justify-start text-orange-600 text-base font-bold font-['Pretendard'] leading-6">
            새 이력서 작성
          </div>
        </button>
      </div>

      {/* 제출하기 버튼 */}
      <div
        data-state={selectedResumeId ? "active" : "default_disable"}
        className="self-stretch px-5 py-6 rounded-bl-lg rounded-br-lg outline outline-[0.80px] outline-offset-[-0.80px] outline-neutral-200 flex flex-col justify-start items-start gap-2.5 overflow-hidden"
      >
        <OrangeBgButton isActive={!!selectedResumeId} onClick={handleSubmit} className="w-full">
          제출하기
        </OrangeBgButton>
      </div>
    </div>
  );
}
