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
import { MultiSelect } from "@/components/ui/multiselect";
import { cn } from "@/lib/utils";

interface SlugTaskFormProps {
  onSuccess?: () => void;
  task?: TaskProps;
  mode: "create" | "edit";
  userStoryId: string;
}

export default function SlugTaskForm({
  onSuccess,
  task,
  mode,
  userStoryId,
}: SlugTaskFormProps) {
  const params = useParams();
  const slug = params.slug as string;
  const { data: project } = useGetProjectBySlug(slug);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const { mutate: createTask, isPending: isCreating } = useCreateTask();
  const { mutate: editTask, isPending: isEditing } = useEditTask();
  const isPending = isCreating || isEditing;

  const form = useForm({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      subject: task?.subject || "",
      project_id: project?.id?.toString() || "",
      user_story_id: userStoryId,
      version: task?.version?.toString() || "",
      assigned_to: task?.assigned_to?.toString() || "",
      assigned_users: task?.assigned_users?.map(String) || [],
      selectedMembers: [] as string[],
    },
    mode: "onSubmit",
  });

  // Update form values when project or task changes
  useEffect(() => {
    if (project?.id) {
      form.setValue("project_id", project.id.toString());
    }

    if (userStoryId) {
      form.setValue("user_story_id", userStoryId);
    }

    if (task) {
      if (task.subject !== undefined) {
        form.setValue("subject", task.subject || "");
      }

      if (task.version !== undefined) {
        form.setValue("version", task.version.toString());
      }

      // Initialize selected members from both assigned_to and assigned_users
      const membersToSelect: string[] = [];

      if (task.assigned_to) {
        membersToSelect.push(task.assigned_to.toString());
      }

      if (task.assigned_users && task.assigned_users.length > 0) {
        task.assigned_users.forEach((id) => {
          const userId = id.toString();
          if (!membersToSelect.includes(userId)) {
            membersToSelect.push(userId);
          }
        });
      }

      setSelectedMembers(membersToSelect);
      form.setValue("selectedMembers", membersToSelect);
    }
  }, [project, task, userStoryId, form]);

  // Handle member selection changes
  const handleMemberSelection = (values: string[]) => {
    setSelectedMembers(values);
    form.setValue("selectedMembers", values, { shouldValidate: true });
  };

  const onSubmit = form.handleSubmit((data) => {
    if (mode === "create") {
      // Determine assigned_to and assigned_users based on selected members
      const assigned_to =
        selectedMembers.length > 0 ? parseInt(selectedMembers[0]) : null;

      const assigned_users =
        selectedMembers.length > 1
          ? selectedMembers.map((id) => parseInt(id))
          : selectedMembers.length === 1
            ? [parseInt(selectedMembers[0])]
            : [];

      createTask(
        {
          subject: data.subject,
          project: parseInt(data.project_id),
          user_story: parseInt(data.user_story_id),
          assigned_to,
          assigned_users,
        },
        {
          onSuccess: () => {
            form.reset({
              subject: "",
              project_id: project?.id?.toString() || "",
              user_story_id: userStoryId,
              version: "",
              selectedMembers: [],
            });
            setSelectedMembers([]);

            if (onSuccess) {
              onSuccess();
            }
          },
        },
      );
    } else if (mode === "edit" && task?.id) {
      // Determine assigned_to and assigned_users based on selected members
      const assigned_to =
        selectedMembers.length > 0 ? parseInt(selectedMembers[0]) : null;

      const assigned_users =
        selectedMembers.length > 1
          ? selectedMembers.map((id) => parseInt(id))
          : selectedMembers.length === 1
            ? [parseInt(selectedMembers[0])]
            : [];

      editTask(
        {
          id: task.id,
          subject: data.subject,
          project: parseInt(data.project_id),
          user_story: parseInt(data.user_story_id),
          version: data.version ? parseInt(data.version) : undefined,
          assigned_to,
          assigned_users,
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
  });

  // Filter fields based on mode
  const filteredFormFields = taskFormFields.filter((field) => {
    // Hide these fields as they're handled automatically
    if (field.hidden) return false;

    // Show version only in edit mode
    if (field.name === "version") return mode === "edit";

    // Hide the assigned_to and assigned_users fields as we'll handle them separately
    if (field.name === "assigned_to" || field.name === "assigned_users")
      return false;

    return true;
  });

  // Fix for TypeScript error - create a proper type for field names
  type FieldName = keyof z.infer<typeof taskFormSchema>;

  // Prepare member options for the MultiSelect component
  const memberOptions =
    project?.members?.map((member) => ({
      label: member.full_name_display || member.username,
      value: member.id.toString(),
    })) || [];

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        {filteredFormFields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name as FieldName}
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

        {/* Render custom assignment field with MultiSelect */}
        <FormItem className="flex flex-col">
          <FormLabel>Assign Members</FormLabel>
          <FormControl>
            <MultiSelect
              options={memberOptions}
              onValueChange={handleMemberSelection}
              defaultValue={selectedMembers}
              placeholder="Select members to assign"
              className={cn("w-full")}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <Button type="submit" className="w-full" disabled={isPending}>
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
