import { FieldError } from "react-hook-form";

type FormFieldProps = {
  label: string;
  name: string;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  type?: "text" | "email" | "tel";
  register: any;
  className?: string;
};

export function FormField({
  label,
  name,
  placeholder,
  error,
  required = false,
  type = "text",
  register,
  className,
}: FormFieldProps) {
  return (
    <div className={`px-6 py-4 bg-white rounded-lg flex flex-col gap-4 ${className || ""}`}>
      <div className="flex items-start gap-2">
        <label className="text-base font-semibold text-text-primary leading-6">{label}</label>
        {required && <div className="w-2 h-2 bg-text-error rounded-full" />}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full py-4 bg-white text-base text-text-primary placeholder:text-text-tertiary leading-6 focus:outline-none"
        {...register(name)}
      />
      {error && <p className="text-text-error text-sm mt-1">{error.message}</p>}
    </div>
  );
}

type FormTextareaProps = {
  label: string;
  name: string;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  rows?: number;
  register: any;
};

export function FormTextarea({
  label,
  name,
  placeholder,
  error,
  required = false,
  rows = 10,
  register,
}: FormTextareaProps) {
  return (
    <div className="px-6 py-4 bg-white rounded-lg flex flex-col gap-4">
      <div className="flex items-start gap-2">
        <label className="text-base font-semibold text-text-primary leading-6">{label}</label>
        {required && <div className="w-2 h-2 bg-text-error rounded-full" />}
      </div>
      <textarea
        placeholder={placeholder}
        rows={rows}
        className="w-full py-8 bg-white text-base text-text-primary placeholder:text-text-tertiary leading-6 focus:outline-none resize-none"
        {...register(name)}
      />
      {error && <p className="text-text-error text-sm mt-1">{error.message}</p>}
    </div>
  );
}
