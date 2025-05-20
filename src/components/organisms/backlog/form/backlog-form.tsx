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
  userStoryFormFields,
  userStoryFormSchema,
} from "@/api/backlog-us/schema";
import {
  useCreateUserStory,
  useEditUserStory,
} from "@/api/backlog-us/mutation";
import { z } from "zod";
import { UserStoryProps } from "@/api/backlog-us/type";
import { useEffect } from "react";
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
    },
  });

  useEffect(() => {
    if (project?.id) {
      form.setValue("project_id", project.id.toString());
    }
  }, [project, form]);

  useEffect(() => {
    if (mode === "edit" && userStory) {
      form.setValue("subject", userStory.subject || "");
      if (userStory.project) {
        form.setValue("project_id", userStory.project.toString());
      }
      if (userStory.version !== undefined) {
        form.setValue("version", userStory.version.toString());
      }
    }
  }, [userStory, mode, form]);

  const onSubmit = (data: z.infer<typeof userStoryFormSchema>) => {
    if (mode === "create") {
      createUserStory(
        {
          project: parseInt(data.project_id),
          subject: data.subject,
        },
        {
          onSuccess: () => {
            form.reset({
              subject: "",
              project_id: project?.id?.toString() || "",
              version: "",
            });

            if (onSuccess) {
              onSuccess();
            }
          },
        },
      );
    } else if (mode === "edit" && userStory?.id) {
      editUserStory(
        {
          id: userStory.id,
          project: parseInt(data.project_id),
          subject: data.subject,
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

  const filteredFormFields = userStoryFormFields.filter((field) => {
    if (field.name === "version") {
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
              <LoaderCircle className="animate-spin" />
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
