"use client";

import { EditDeleteButton } from "./EditDeleteButton";

type EditButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function EditButton({ ...props }: EditButtonProps) {
  return <EditDeleteButton variant="edit" {...props} />;
}
