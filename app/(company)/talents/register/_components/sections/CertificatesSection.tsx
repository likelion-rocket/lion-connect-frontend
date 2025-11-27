/**
 * 자격증 섹션 컴포넌트
 * 필드: certificates[].name, certificates[].issuer, certificates[].issueDate
 * 배열 구조로 여러 개 자격증 추가 가능
 * DELETE API: deleteCertification(id)
 */

"use client";

import { useState } from "react";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";
import { FormInput } from "@/components/form/FormInput";
import { FormContainer } from "@/components/form/FormContainer";
import { deleteCertification } from "@/lib/api/certifications";
import AddButton from "../AddButton";

export default function CertificatesSection() {
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const { control, getValues } = useFormContext<TalentRegisterFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "certificates",
  });

  // 개별 항목의 포커스 상태 관리
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // 자격증 삭제 핸들러
  const handleDeleteCertificate = async (index: number, certificateId?: number) => {
    try {
      if (certificateId) {
        await deleteCertification(certificateId);
      }
      remove(index);
      setDeleteError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "자격증 삭제에 실패했습니다";
      setDeleteError(errorMessage);
    }
  };

  // 자격증 추가
  const handleAddCertificate = () => {
    append({
      name: "",
      issuer: "",
      issueDate: "",
    });
  };

  return (
    <section className="section section-certificates flex flex-col gap-6">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">자격증</h2>

      {deleteError && (
        <div className="error-message text-sm text-text-error bg-bg-error/10 p-3 rounded-lg">
          {deleteError}
        </div>
      )}

      <div className="certificates-list flex flex-col gap-6">
        {fields.map((field, index) => {
          const certificateData = getValues("certificates")?.[index];
          const certificateId = certificateData?.id;

          return (
            <CertificateItem
              key={field.id}
              index={index}
              certificateId={certificateId}
              onDelete={handleDeleteCertificate}
              isFocused={focusedIndex === index}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
            />
          );
        })}
      </div>

      <AddButton label="자격증 추가" className="self-end" onClick={handleAddCertificate} />
    </section>
  );
}

interface CertificateItemProps {
  index: number;
  certificateId?: number; // 서버에서 받은 id (기존 데이터인 경우)
  onDelete?: (index: number, certificateId?: number) => void | Promise<void>; // DELETE 핸들러
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

function CertificateItem({
  index,
  certificateId,
  onDelete,
  isFocused,
  onFocus,
  onBlur,
}: CertificateItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { register, control } = useFormContext<TalentRegisterFormValues>();

  // useWatch를 컴포넌트 최상위에서 호출 (Hook의 순서 유지)
  const certificateFields = useWatch({
    control,
    name: `certificates.${index}`,
  });

  const hasCertificateValue =
    certificateFields?.name || certificateFields?.issuer || certificateFields?.issueDate;

  // DELETE 핸들러
  const handleDelete = async () => {
    if (!onDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      await onDelete(index, certificateId);
    } catch (error) {
      // Error handling
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="certificate-item flex items-start gap-4 md:gap-8">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            stroke="currentColor"
            className="text-icon-secondary"
            strokeWidth="2"
          />
          <path
            d="M3 10H21"
            stroke="currentColor"
            className="text-icon-secondary"
            strokeWidth="2"
          />
        </svg>
      </div>

      <FormContainer
        hasValue={!!hasCertificateValue}
        isPressed={isFocused}
        onFocus={onFocus}
        onBlur={onBlur}
        onDelete={handleDelete}
        disabled={isDeleting}
        className="flex-1 rounded-xl p-4 md:p-6 flex flex-col gap-4"
      >
        <div className="field">
          <label
            htmlFor={`certificates-${index}-name`}
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            자격증명
          </label>
          <FormInput
            id={`certificates-${index}-name`}
            type="text"
            placeholder="자격증을 입력해주세요"
            {...register(`certificates.${index}.name`)}
          />
        </div>

        <div className="field">
          <label
            htmlFor={`certificates-${index}-issuer`}
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            발급 기관
          </label>
          <FormInput
            id={`certificates-${index}-issuer`}
            type="text"
            placeholder="발급 기관을 입력해주세요"
            {...register(`certificates.${index}.issuer`)}
          />
        </div>

        <div className="field">
          <label
            htmlFor={`certificates-${index}-issue-date`}
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            취득일자
          </label>
          <FormInput
            id={`certificates-${index}-issue-date`}
            type="text"
            placeholder="YYYY.MM"
            {...register(`certificates.${index}.issueDate`)}
          />
        </div>
      </FormContainer>
    </div>
  );
}
