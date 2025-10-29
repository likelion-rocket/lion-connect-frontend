import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { businessConnectSchema, BusinessConnectFormData } from "../lib/businessConnectSchema";

export function useBusinessConnect() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessConnectFormData>({
    resolver: zodResolver(businessConnectSchema),
    defaultValues: {
      companyName: "",
      department: "",
      email: "",
      contact: "",
      message: "",
      agreePrivacy: false,
    },
  });

  const onSubmit = (data: BusinessConnectFormData) => {
    // TODO: API 연동
    console.log("Form submitted:", data);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
  };
}
