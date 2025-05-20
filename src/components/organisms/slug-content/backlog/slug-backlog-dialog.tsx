"use client";

import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SlugBacklogForm from "@/components/organisms/slug-content/backlog/form/slug-backlog-form";
import { TaskProps } from "@/api/task/type";

interface SlugBacklogDialogProps {
  trigger: ReactNode;
  title?: string;
  description?: string;
  mode: "create" | "edit";
  task?: TaskProps;
  userStoryId: string;
  onSuccess?: () => void;
}

export default function SlugBacklogDialog({
  trigger,
  title,
  description,
  mode,
  task,
  userStoryId,
  onSuccess,
}: SlugBacklogDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    if (onSuccess) {
      onSuccess();
    }
  };

  const defaultDescription =
    mode === "create"
      ? "Fill in the details below to create a new task."
      : "Update the details of your task.";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {title || (mode === "create" ? "Create Task" : "Edit Task")}
          </DialogTitle>
          <DialogDescription>
            {description || defaultDescription}
          </DialogDescription>
        </DialogHeader>
        <SlugBacklogForm
          onSuccess={handleSuccess}
          task={task}
          mode={mode}
          userStoryId={userStoryId}
        />
      </DialogContent>
    </Dialog>
  );
}
