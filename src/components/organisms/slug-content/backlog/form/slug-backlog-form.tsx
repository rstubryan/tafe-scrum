"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { taskFormFields, taskFormSchema } from "@/api/task/schema";
import { useCreateTask, useEditTask } from "@/api/task/mutation";
import { z } from "zod";
import { TaskProps } from "@/api/task/type";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGetProjectBySlug } from "@/api/project/queries";

interface SlugBacklogFormProps {
  onSuccess?: () => void;
  task?: TaskProps;
  mode: "create" | "edit";
  userStoryId: string;
}

export default function SlugBacklogForm({
  onSuccess,
  task,
  mode,
  userStoryId,
}: SlugBacklogFormProps) {
  const params = useParams();
  const slug = params.slug as string;
  const { data: project } = useGetProjectBySlug(slug);
  const [initialValuesSet, setInitialValuesSet] = useState(false);

  const { mutate: createTask, isPending: isCreating } = useCreateTask();
  const { mutate: editTask, isPending: isEditing } = useEditTask();
  const isPending = isCreating || isEditing;

  const form = useForm({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      subject: "",
      project_id: "",
      user_story_id: userStoryId,
      version: "",
    },
  });

  useEffect(() => {
    if (project?.id) {
      form.setValue("project_id", project.id.toString());
    }
    if (userStoryId) {
      form.setValue("user_story_id", userStoryId);
    }
  }, [project, userStoryId, form]);

  useEffect(() => {
    if (mode === "edit" && task && !initialValuesSet) {
      form.setValue("subject", task.subject || "");

      if (task.project) {
        form.setValue("project_id", task.project.toString());
      }

      if (task.user_story) {
        form.setValue("user_story_id", task.user_story.toString());
      }

      if (task.version !== undefined) {
        form.setValue("version", task.version.toString());
      }

      setInitialValuesSet(true);
    }
  }, [task, mode, form, initialValuesSet]);

  const onSubmit = (data: z.infer<typeof taskFormSchema>) => {
    if (mode === "create") {
      createTask(
        {
          project: parseInt(data.project_id),
          subject: data.subject,
          user_story: parseInt(data.user_story_id),
        },
        {
          onSuccess: () => {
            form.reset({
              subject: "",
              project_id: project?.id?.toString() || "",
              user_story_id: userStoryId,
              version: "",
            });

            if (onSuccess) {
              onSuccess();
            }
          },
        },
      );
    } else if (mode === "edit" && task?.id) {
      editTask(
        {
          id: task.id,
          project: parseInt(data.project_id),
          subject: data.subject,
          user_story: parseInt(data.user_story_id),
          version: data.version ? parseInt(data.version) : undefined,
        },
        {
          onSuccess: () => {
            if (onSuccess) {
              onSuccess();
            }
          },
        },
      );
    }
  };

  // Filter fields based on mode
  const filteredFormFields = taskFormFields.filter((field) => {
    // Always show subject field
    if (field.name === "subject") return true;

    // Hide these fields as they're handled automatically
    if (field.hidden) return false;

    // Show version only in edit mode
    if (field.name === "version") return mode === "edit";

    return true;
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {filteredFormFields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: fieldProps }) => (
              <FormItem className={field.hidden ? "hidden" : "flex flex-col"}>
                {!field.hidden && <FormLabel>{field.label}</FormLabel>}
                {field.type === "text" && (
                  <FormControl>
                    <Input
                      type={field.type}
                      required={field.required}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      {...fieldProps}
                      value={fieldProps.value || ""}
                      readOnly={field.name === "version"}
                    />
                  </FormControl>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid || isPending}
        >
          {isPending ? (
            <>
              <LoaderCircle className="animate-spin mr-2" />
              {mode === "create" ? "Creating Task..." : "Updating Task..."}
            </>
          ) : mode === "create" ? (
            "Create Task"
          ) : (
            "Update Task"
          )}
        </Button>
      </form>
    </Form>
  );
}
