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
    <div className={`bg-white p-6 rounded-lg ${className || ""}`}>
      <label className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-[#FF5C00]">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 focus:outline-none focus:border-black transition-colors"
        {...register(name)}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
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
    <div className="bg-white p-6 rounded-lg">
      <label className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-[#FF5C00]">*</span>}
      </label>
      <textarea
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 focus:outline-none focus:border-black transition-colors resize-none"
        {...register(name)}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
