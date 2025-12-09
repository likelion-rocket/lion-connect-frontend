"use client";

import { EditDeleteButton } from "@/components/ui/EditDeleteButton";

type DeleteButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function DeleteButton({ ...props }: DeleteButtonProps) {
  return <EditDeleteButton variant="delete" {...props} />;
}
