"use client";

import Image from "next/image";
import { X } from "lucide-react";

interface CompanyViewingAlertProps {
  onClose?: () => void;
}

export function CompanyViewingAlert({ onClose }: CompanyViewingAlertProps) {
  return (
    <div className="self-stretch px-6 py-4 bg-brand-01 rounded-lg shadow-xs inline-flex justify-between items-center">
      <div className="flex justify-start items-center gap-4">
        <Image src="/icons/solid-chat.svg" alt="chat" width={20} height={20} />
        <p className="text-text-primary text-sm font-medium font-ko-body leading-5">
          기업이 해당 이력서를 열람하고 있습니다.
        </p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center hover:bg-tertiary rounded transition-colors"
          aria-label="알림 닫기"
        >
          <X className="w-4 h-4 text-primary" />
        </button>
      )}
    </div>
  );
}
