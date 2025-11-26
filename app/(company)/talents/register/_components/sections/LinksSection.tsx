/**
 * 링크 섹션 컴포넌트
 * 필드: links[] (포트폴리오, 블로그 등 자유 입력 링크 배열)
 * 각 링크는 { id?: number, url: string } 형태
 * DELETE API: deleteProfileLink(id)
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";
import { FormContainer } from "@/components/form/FormContainer";
import { deleteProfileLink } from "@/lib/api/profileThumbnail";
import AddButton from "../AddButton";

export default function LinksSection() {
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const { control, getValues } = useFormContext<TalentRegisterFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  // 개별 항목의 포커스 상태 관리
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // 링크 삭제 핸들러
  const handleDeleteLink = async (index: number, linkId?: number) => {
    try {
      if (linkId) {
        await deleteProfileLink(linkId);
      }
      remove(index);
      setDeleteError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "링크 삭제에 실패했습니다";
      setDeleteError(errorMessage);
      console.error("링크 삭제 중 오류:", error);
    }
  };

  const handleAddLink = () => {
    append({ url: "" });
  };

  return (
    <section className="section section-links flex flex-col gap-6">
      <h2 className="text-lg md:text-xl font-bold text-text-primary">링크</h2>

      {deleteError && (
        <div className="error-message text-sm text-text-error bg-bg-error/10 p-3 rounded-lg">
          {deleteError}
        </div>
      )}

      <div className="links-list flex flex-col gap-4">
        {fields.map((field, index) => {
          const linkData = getValues("links")?.[index];
          const linkId = linkData?.id;

          return (
            <LinkItem
              key={field.id}
              index={index}
              linkId={linkId}
              onDelete={handleDeleteLink}
              isFocused={focusedIndex === index}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
            />
          );
        })}
      </div>

      <AddButton label="링크 추가" className="self-end" onClick={handleAddLink} />
    </section>
  );
}

interface LinkItemProps {
  index: number;
  linkId?: number; // 서버에서 받은 id (기존 데이터인 경우)
  onDelete?: (index: number, linkId?: number) => void | Promise<void>; // DELETE 핸들러
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

function LinkItem({ index, linkId, onDelete, isFocused, onFocus, onBlur }: LinkItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TalentRegisterFormValues>();

  // useWatch를 컴포넌트 최상위에서 호출 (Hook의 순서 유지)
  const linkUrl = useWatch({
    control,
    name: `links.${index}.url`,
  });

  const hasLinkValue = !!linkUrl;

  // DELETE 핸들러
  const handleDelete = async () => {
    console.log("DELETE 버튼 클릭됨:", { index, linkId });
    if (!onDelete) {
      console.warn("onDelete 핸들러가 없습니다");
      return;
    }

    try {
      setIsDeleting(true);
      console.log("삭제 시작...");
      await onDelete(index, linkId);
      console.log("삭제 완료");
    } catch (error) {
      console.error("링크 삭제 중 오류:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="link-item flex items-start gap-4">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-bg-tertiary rounded-lg flex items-center justify-center shrink-0">
        <Image src="/icons/outline-paper-clip.svg" alt="링크" width={24} height={24} />
      </div>

      <FormContainer
        className="flex-1 flex items-center gap-4"
        hasValue={hasLinkValue}
        isPressed={isFocused}
        onFocus={onFocus}
        onBlur={onBlur}
        onDelete={handleDelete}
        disabled={isDeleting}
      >
        <div className="field flex-1">
          <label htmlFor={`links-${index}-url`} className="sr-only">
            링크 {index + 1}
          </label>
          <input
            id={`links-${index}-url`}
            type="url"
            placeholder="link를 입력해주세요"
            className="lc-input w-full h-14 px-4 py-3 bg-bg-primary rounded-lg text-base text-text-primary placeholder:text-text-tertiary focus:outline-none transition-colors"
            {...register(`links.${index}.url`)}
          />
          {errors.links?.[index]?.url && (
            <p className="field-error text-sm text-text-error mt-1">
              {errors.links[index]?.url?.message}
            </p>
          )}
        </div>
      </FormContainer>
    </div>
  );
}
