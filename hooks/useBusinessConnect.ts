"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { businessConnectSchema, BusinessConnectFormData } from "../lib/businessConnectSchema";
import { useCreateInquiry } from "./useCreateInquiry";
import { CreateInquiryRequest } from "@/types/inquiry";

export function useBusinessConnect() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BusinessConnectFormData>({
    resolver: zodResolver(businessConnectSchema),
    defaultValues: {
      companyName: "",
      managerName: "",
      department: "",
      email: "",
      contact: "",
      message: "",
      agreePrivacy: false,
    },
  });

  const { createInquiry, isLoading, isSuccess } = useCreateInquiry();

  const onSubmit = (data: BusinessConnectFormData) => {
    // 폼 데이터를 API 요청 형식으로 변환
    // department 필드는 "부서/직책" 형태로 입력되므로 분리
    const [department, position] = data.department.split("/").map((s) => s.trim());

    const requestData: CreateInquiryRequest = {
      companyName: data.companyName,
      contactPerson: data.managerName,
      department: department || data.department, // 분리 실패 시 원본 사용
      position: position || "", // 분리 실패 시 빈 문자열
      email: data.email,
      phoneNumber: data.contact,
      content: data.message,
      agreePrivacy: data.agreePrivacy,
    };

    // API 호출
    createInquiry(requestData, {
      onSuccess: () => {
        alert("문의가 성공적으로 접수되었습니다. 영업일 기준 2일 내에 연락 드리겠습니다.");
        reset(); // 폼 초기화
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : "문의 제출 중 오류가 발생했습니다.";
        alert(errorMessage);
      },
    });
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
    isSuccess,
  };
}
