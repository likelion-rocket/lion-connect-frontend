/**
 * 링크 섹션 컴포넌트
 * 필드: links[] (포트폴리오, 블로그 등 자유 입력 링크 배열)
 * 각 링크는 { type: string, url: string } 형태
 *
 * API:
 * - GET /api/profile/me/links : 모든 링크 조회
 * - PUT /api/profile/me/links/{type} : 링크 저장/수정
 * - DELETE /api/profile/me/links/{type} : 링크 삭제
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import type { TalentRegisterFormValues } from "@/schemas/talent/talentRegisterSchema";
import { FormContainer } from "@/components/form/FormContainer";
import { deleteMyProfileLink } from "@/lib/api/profileThumbnail";
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

  // 링크 삭제 핸들러 (type 기반)
  const handleDeleteLink = async (index: number, linkType?: string) => {
    try {
      if (linkType) {
        await deleteMyProfileLink(linkType);
      }
      remove(index);
      setDeleteError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "링크 삭제에 실패했습니다";
      setDeleteError(errorMessage);
    }
  };

  const handleAddLink = () => {
    // 현재 존재하는 LINK 타입들을 가져와서 다음 번호 찾기
    const currentLinks = getValues("links") || [];
    const existingTypes = currentLinks.map((link) => link.type).filter(Boolean);

    // LINK, LINK2, LINK3, ... 중 다음 번호 찾기
    let nextType = "LINK";
    let counter = 2;

    // "LINK"가 이미 있으면 LINK2부터 시작
    if (existingTypes.includes("LINK")) {
      while (existingTypes.includes(`LINK${counter}`)) {
        counter++;
      }
      nextType = `LINK${counter}`;
    }

    append({ type: nextType, url: "" });
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
          const linkType = linkData?.type;

          return (
            <LinkItem
              key={field.id}
              index={index}
              linkType={linkType}
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
  linkType?: string; // 링크 타입 (LINK, LINK2, LINK3, ...)
  onDelete?: (index: number, linkType?: string) => void | Promise<void>; // DELETE 핸들러
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

function LinkItem({ index, linkType, onDelete, isFocused, onFocus, onBlur }: LinkItemProps) {
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
    if (!onDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      await onDelete(index, linkType);
    } catch (error) {
      // Error handling
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
