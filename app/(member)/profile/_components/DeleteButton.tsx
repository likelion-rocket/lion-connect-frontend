"use client";

import { EditDeleteButton } from "./EditDeleteButton";

type DeleteButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function DeleteButton({ ...props }: DeleteButtonProps) {
  return <EditDeleteButton variant="delete" {...props} />;
}
