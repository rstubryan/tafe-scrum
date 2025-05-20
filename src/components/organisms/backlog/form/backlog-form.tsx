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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  userStoryFormFields,
  userStoryFormSchema,
} from "@/api/backlog-us/schema";
import {
  useCreateUserStory,
  useEditUserStory,
} from "@/api/backlog-us/mutation";
import { z } from "zod";
import { UserStoryProps } from "@/api/backlog-us/type";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGetProjectBySlug } from "@/api/project/queries";

interface BacklogFormProps {
  onSuccess?: () => void;
  userStory?: UserStoryProps;
  mode: "create" | "edit";
}

export default function BacklogForm({
  onSuccess,
  userStory,
  mode,
}: BacklogFormProps) {
  const params = useParams();
  const slug = params.slug as string;
  const { data: project } = useGetProjectBySlug(slug);
  const [initialValuesSet, setInitialValuesSet] = useState(false);

  const { mutate: createUserStory, isPending: isCreating } =
    useCreateUserStory();
  const { mutate: editUserStory, isPending: isEditing } = useEditUserStory();
  const isPending = isCreating || isEditing;

  const form = useForm({
    resolver: zodResolver(userStoryFormSchema),
    defaultValues: {
      subject: "",
      project_id: "",
      version: "",
      due_date: "",
      assigned_to: "",
      assigned_users: [] as string[],
    },
  });

  // Watch the assigned_to field
  const watchedAssignedTo = form.watch("assigned_to");

  console.log("Watched assigned_to:", watchedAssignedTo);

  useEffect(() => {
    if (project?.id) {
      form.setValue("project_id", project.id.toString());
    }
  }, [project, form]);

  useEffect(() => {
    if (mode === "edit" && userStory && !initialValuesSet) {
      console.log("Setting edit form values:", userStory);

      form.setValue("subject", userStory.subject || "");

      if (userStory.project) {
        form.setValue("project_id", userStory.project.toString());
      }

      if (userStory.version !== undefined) {
        form.setValue("version", userStory.version.toString());
      }

      if (userStory.due_date) {
        form.setValue("due_date", userStory.due_date);
      }

      if (userStory.assigned_to !== undefined) {
        console.log("Setting assigned_to to", userStory.assigned_to);
        form.setValue(
          "assigned_to",
          userStory.assigned_to ? userStory.assigned_to.toString() : "null",
        );
      }

      if (userStory.assigned_users && userStory.assigned_users.length > 0) {
        form.setValue(
          "assigned_users",
          userStory.assigned_users.map((id) => id.toString()),
        );
      }

      setInitialValuesSet(true);
    }
  }, [userStory, mode, form, initialValuesSet]);

  const onSubmit = (data: z.infer<typeof userStoryFormSchema>) => {
    if (mode === "create") {
      const assignedTo =
        data.assigned_to && data.assigned_to !== "unassigned"
          ? parseInt(data.assigned_to)
          : undefined;

      createUserStory(
        {
          project: parseInt(data.project_id),
          subject: data.subject,
          assigned_to: assignedTo,
        },
        {
          onSuccess: () => {
            form.reset({
              subject: "",
              project_id: project?.id?.toString() || "",
              version: "",
              due_date: "",
              assigned_to: "",
              assigned_users: [],
            });

            if (onSuccess) {
              onSuccess();
            }
          },
        },
      );
    } else if (mode === "edit" && userStory?.id) {
      const assignedTo =
        data.assigned_to && data.assigned_to !== "null"
          ? parseInt(data.assigned_to)
          : null;

      const assignedUsers = assignedTo ? [assignedTo] : [];

      editUserStory(
        {
          id: userStory.id,
          project: parseInt(data.project_id),
          subject: data.subject,
          version: data.version ? parseInt(data.version) : undefined,
          due_date: data.due_date || undefined,
          assigned_to: assignedTo,
          assigned_users: assignedUsers,
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

  // Get the selected member name for display
  const getSelectedMemberName = () => {
    if (!watchedAssignedTo || watchedAssignedTo === "null") {
      return "Not assigned";
    }

    const selectedMember = project?.members?.find(
      (member) => member.id.toString() === watchedAssignedTo,
    );

    console.log("Finding member for value:", watchedAssignedTo);
    console.log("Found member:", selectedMember);

    return selectedMember
      ? selectedMember.full_name || selectedMember.username
      : "Select assigned to";
  };

  // Filter fields based on mode and exclude assigned_users from the form
  const filteredFormFields = userStoryFormFields.filter((field) => {
    if (field.name === "assigned_users") {
      return false;
    }

    if (!field.required && field.name !== "project_id") {
      return mode === "edit";
    }
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
                {field.type === "date" && (
                  <FormControl>
                    <Input
                      type="date"
                      required={field.required}
                      placeholder={`Select ${field.label.toLowerCase()}`}
                      {...fieldProps}
                      value={fieldProps.value || ""}
                    />
                  </FormControl>
                )}
                {field.type === "select" && field.name === "assigned_to" && (
                  <FormControl>
                    <Select
                      onValueChange={fieldProps.onChange}
                      value={fieldProps.value as string}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue>{getSelectedMemberName()}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="null">Not assigned</SelectItem>
                        {project?.members &&
                          project.members.map((member) => (
                            <SelectItem
                              key={member.id}
                              value={member.id.toString()}
                            >
                              {member.full_name || member.username}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
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
              {mode === "create"
                ? "Creating User Story..."
                : "Updating User Story..."}
            </>
          ) : mode === "create" ? (
            "Create User Story"
          ) : (
            "Update User Story"
          )}
        </Button>
      </form>
    </Form>
  );
}
