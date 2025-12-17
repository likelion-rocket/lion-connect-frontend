/**
 * JobForm - 채용 공고 등록/수정 폼 컴포넌트
 * React Hook Form + Zod를 사용한 채용 공고 폼
 */

"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/form/FormInput";
import { FormTextarea } from "@/components/form/FormTextarea";
import { FormField } from "@/components/form/FormField";
import { RadioGroup, RadioOption } from "@/components/form/RadioGroup";
import { ImageUpload } from "@/components/form/ImageUpload";
import { JobCategorySelect } from "@/components/job/JobCategorySelect";
import { JobFormData, JobImageMetadata } from "@/types/job";
import { jobFormSchema, jobFormEditSchema } from "@/lib/validations/job";
import { findJobRoleById } from "@/constants/jobMapping";
import { cn } from "@/utils/utils";

interface JobFormProps {
  initialData?: Partial<JobFormData> & { imageUrls?: string[] };
  onSubmit: (data: JobFormData) => Promise<void>;
  submitButtonText?: string;
}

const employmentTypeOptions: RadioOption[] = [
  { value: "FULL_TIME", label: "정규직" },
  { value: "INTERN", label: "인턴" },
];

export function JobForm({
  initialData,
  onSubmit,
  submitButtonText = "채용 공고 등록하기",
}: JobFormProps) {
  // 직군/직무 선택 상태 관리
  const initialJobRole = initialData?.jobRoleId ? findJobRoleById(initialData.jobRoleId) : null;
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialJobRole?.group.code || ""
  );
  const [selectedRoleId, setSelectedRoleId] = useState<number>(initialData?.jobRoleId || 0);

  // 수정 모드 여부 판단 (imageUrls가 있으면 수정 모드)
  const isEditMode = !!initialData?.imageUrls && initialData.imageUrls.length > 0;

  // 기존 이미지 메타데이터 관리 (수정 모드에서만 사용)
  const [existingImages, setExistingImages] = useState<JobImageMetadata[]>(
    initialData?.existingImages || []
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<JobFormData>({
    resolver: zodResolver(isEditMode ? jobFormEditSchema : jobFormSchema) as any,
    mode: "onChange",
    defaultValues: {
      images: [],
      title: "",
      employmentType: "FULL_TIME",
      jobRoleId: 0,
      description: "",
      responsibilities: "",
      requirements: "",
      preferredQualifications: "",
      benefits: "",
      hiringProcess: "",
      location: "",
      ...initialData,
    },
  });

  const handleCategoryChange = (categoryCode: string) => {
    setSelectedCategory(categoryCode);
    setSelectedRoleId(0);
    setValue("jobRoleId", 0, { shouldValidate: true, shouldDirty: true });
  };

  const handleRoleChange = (roleId: number) => {
    setSelectedRoleId(roleId);
  };

  const handleFormSubmit = async (data: JobFormData) => {
    // 수정 모드일 때 기존 이미지 메타데이터 포함
    const submitData: JobFormData = {
      ...data,
      existingImages: isEditMode ? existingImages : undefined,
    };
    await onSubmit(submitData);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-[1160px] inline-flex flex-col justify-start items-start gap-12"
    >
      {/* 헤더 */}
      <div className="self-stretch justify-start text-neutral-800 text-xl font-semibold font-['Pretendard'] leading-7">
        채용 공고 등록
      </div>

      <div className="self-stretch w-[1160px] inline-flex justify-between items-start">
        {/* 폼 영역 */}
        <div className="w-[767px] inline-flex flex-col justify-start items-start gap-16">
          {/* 이미지 섹션 */}
          <div className="self-stretch p-8 bg-white rounded-lg outline outline-[0.80px] outline-offset-[-0.80px] outline-neutral-200 flex flex-col justify-start items-start gap-12 overflow-hidden">
            <FormField
              label="공고 노출 이미지 (첫 번째 이미지 대표 이미지로 설정됩니다.)"
              required
              error={errors.images?.message}
            >
              <Controller
                name="images"
                control={control}
                render={({ field }) => (
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    existingImageUrls={initialData?.imageUrls}
                    existingImageMetadata={existingImages}
                    onExistingImagesChange={setExistingImages}
                    error={!!errors.images}
                  />
                )}
              />
            </FormField>
          </div>

          {/* 기본 정보 섹션 */}
          <div className="self-stretch p-8 bg-white rounded-lg outline outline-[0.80px] outline-offset-[-0.80px] outline-neutral-200 flex flex-col justify-start items-start gap-12 overflow-hidden">
            {/* 공고명 */}
            <FormField label="공고명" required error={errors.title?.message}>
              <FormInput {...register("title")} placeholder="공고명" error={!!errors.title} />
            </FormField>

            {/* 고용 형태 */}
            <FormField
              label="고용 형태"
              required
              error={errors.employmentType?.message}
              helperText="공고 등록 후 고용형태를 변경할 수 없습니다."
            >
              <Controller
                name="employmentType"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    options={employmentTypeOptions}
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.employmentType}
                  />
                )}
              />
            </FormField>

            {/* 직군 및 직무 선택 */}
            <JobCategorySelect
              control={control}
              errors={errors}
              selectedCategory={selectedCategory}
              selectedRoleId={selectedRoleId}
              onCategoryChange={handleCategoryChange}
              onRoleChange={handleRoleChange}
            />

            {/* 회사/직무 소개 */}
            <FormField
              label="회사/직무 소개"
              required
              error={errors.description?.message}
              helperText="텍스트만 입력 가능합니다. (홈페이지 url, 이모지, 이미지 등록불가)"
            >
              <FormTextarea
                {...register("description")}
                placeholder="회사/ 직무 소개를 입력해주세요."
                rows={8}
                error={!!errors.description}
              />
            </FormField>

            {/* 주요 업무 */}
            <FormField
              label="주요 업무"
              required
              error={errors.responsibilities?.message}
              helperText="텍스트만 입력 가능합니다. (홈페이지 url, 이모지, 이미지 등록불가)"
            >
              <FormTextarea
                {...register("responsibilities")}
                placeholder="적합한 후보자가 공고에 지원할 수 있도록 담당 업무를 자세하게 기재해주세요."
                rows={8}
                error={!!errors.responsibilities}
              />
            </FormField>

            {/* 자격요건 */}
            <FormField label="자격요건" required error={errors.requirements?.message}>
              <FormTextarea
                {...register("requirements")}
                placeholder={
                  "연차 스킬 등 지원자가 꼭 갖춰야 할 조건을 명확하게 기재해주세요\n예) 해당 직무 경력 2년 이상, Python 사용자"
                }
                rows={8}
                error={!!errors.requirements}
              />
            </FormField>

            {/* 우대사항 */}
            <FormField label="우대사항" required error={errors.preferredQualifications?.message}>
              <FormTextarea
                {...register("preferredQualifications")}
                placeholder={
                  "기대하는 인재상, 우대 조건(경험, 지식, 관심 등)을 안내해 주세요.\n많은 조건을 입력할수록 다양한 역량을 가진 지원자를 만나볼 가능성이 높아집니다."
                }
                rows={8}
                error={!!errors.preferredQualifications}
              />
            </FormField>

            {/* 혜택 및 복지 */}
            <FormField label="혜택 및 복지" required error={errors.benefits?.message}>
              <FormTextarea
                {...register("benefits")}
                placeholder={
                  "우리 회사의 다양한 혜택 및 복지 제도를 소개해 주세요.\n사람마다 기대하는 혜택이 다르므로, 최대한 많은 요소를 안내할수록 좋습니다."
                }
                rows={8}
                error={!!errors.benefits}
              />
            </FormField>

            {/* 채용 전형 */}
            <FormField
              label="채용 전형"
              required
              error={errors.hiringProcess?.message}
              helperText="채용 절차의 공정화 법률 제 8조에 따라 채용 전형 안내를 권고하고 있습니다."
            >
              <FormTextarea
                {...register("hiringProcess")}
                placeholder={
                  "채용 전형을 입력해주세요.\n예) 서류 전형 -1차 면접(직무 적합성) - 2차 면접(조직 적합성) - 레퍼런스 체크 - 처우협의&입사일 조정"
                }
                rows={8}
                error={!!errors.hiringProcess}
              />
            </FormField>

            {/* 근무지 */}
            <FormField
              label="근무지"
              required
              error={errors.location?.message}
              helperText="근무지가 해외인 경우, 해외 주소를 입력해주세요."
            >
              <FormTextarea
                {...register("location")}
                placeholder="근무지를 입력해주세요."
                rows={8}
                error={!!errors.location}
              />
            </FormField>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="inline-flex flex-col justify-center items-start gap-8">
          <button
            type="submit"
            disabled={isEditMode ? isSubmitting : !isValid || isSubmitting}
            data-state={
              isEditMode
                ? isSubmitting
                  ? "pressed"
                  : "active"
                : !isValid || isSubmitting
                  ? "default_disable"
                  : "active"
            }
            className={cn(
              "w-72 h-11 px-2.5 py-2 rounded-lg inline-flex justify-center items-center gap-2.5",
              "text-white text-lg font-bold font-['Pretendard'] leading-7",
              // 비활성화 상태 (등록 모드에서만)
              !isEditMode &&
                (!isValid || isSubmitting) &&
                "bg-neutral-200 text-neutral-400 cursor-not-allowed",
              // 활성화 상태 (active) - 기본 배경색
              (isEditMode ? !isSubmitting : isValid && !isSubmitting) &&
                "bg-orange-600 cursor-pointer",
              // 마우스로 누르고 있을 때 (active pseudo-class)
              (isEditMode ? !isSubmitting : isValid && !isSubmitting) &&
                "active:text-neutral-300 active:bg-orange-700",
              // 제출 중일 때 (pressed) - 텍스트 색상 변경
              isEditMode && isSubmitting && "bg-orange-600 text-neutral-300"
            )}
          >
            {isSubmitting ? (isEditMode ? "수정 중..." : "등록 중...") : submitButtonText}
          </button>
        </div>
      </div>
    </form>
  );
}
