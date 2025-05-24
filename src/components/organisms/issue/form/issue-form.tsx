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
import { issueFormFields, issueFormSchema } from "@/api/issue/schema";
import { useCreateIssue, useEditIssue } from "@/api/issue/mutation";
import { z } from "zod";
import { IssueProps } from "@/api/issue/type";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGetProjectBySlug } from "@/api/project/queries";
import { MultiSelect } from "@/components/ui/multiselect";

interface IssueFormProps {
  onSuccess?: () => void;
  issue?: IssueProps;
  mode: "create" | "edit";
}

export default function IssueForm({ onSuccess, issue, mode }: IssueFormProps) {
  const params = useParams();
  const slug = params.slug as string;
  const { data: project } = useGetProjectBySlug(slug);
  const [initialValuesSet, setInitialValuesSet] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const { mutate: createIssue, isPending: isCreating } = useCreateIssue();
  const { mutate: editIssue, isPending: isEditing } = useEditIssue();
  const isPending = isCreating || isEditing;

  const form = useForm({
    resolver: zodResolver(issueFormSchema),
    defaultValues: {
      subject: "",
      project_id: "",
      assigned_to: "",
      assigned_users: [],
      selectedMembers: [],
    },
  });

  useEffect(() => {
    if (project?.id) {
      form.setValue("project_id", project.id.toString());
    }
  }, [project, form]);

  useEffect(() => {
    if (mode === "edit" && issue && !initialValuesSet) {
      form.setValue("subject", issue.subject || "");

      if (issue.project) {
        form.setValue("project_id", issue.project.toString());
      }

      // Initialize selected members from assigned_to
      if (issue.assigned_to) {
        const membersToSelect = [issue.assigned_to.toString()];
        setSelectedMembers(membersToSelect);
        form.setValue("selectedMembers", membersToSelect);
        form.setValue("assigned_to", issue.assigned_to.toString());
      }

      setInitialValuesSet(true);
    }
  }, [issue, mode, form, initialValuesSet]);

  const handleMemberSelection = (values: string[]) => {
    setSelectedMembers(values);
    form.setValue("selectedMembers", values, { shouldValidate: true });

    // Also update assigned_to field when members change
    if (values.length > 0) {
      form.setValue("assigned_to", values[0], { shouldValidate: true });
    } else {
      form.setValue("assigned_to", "", { shouldValidate: true });
    }
  };

  const onSubmit = (data: z.infer<typeof issueFormSchema>) => {
    // Get assigned_to value directly from selectedMembers
    const assigned_to =
      selectedMembers.length > 0 ? parseInt(selectedMembers[0]) : null;

    if (mode === "create") {
      createIssue(
        {
          project: parseInt(data.project_id),
          subject: data.subject,
          assigned_to: assigned_to,
        },
        {
          onSuccess: () => {
            form.reset({
              subject: "",
              project_id: project?.id?.toString() || "",
              assigned_to: "",
              assigned_users: [],
              selectedMembers: [],
            });
            setSelectedMembers([]);

            if (onSuccess) {
              onSuccess();
            }
          },
        },
      );
    } else if (mode === "edit" && issue?.id) {
      // Explicitly include assigned_to in the payload
      const editData = {
        id: issue.id,
        project: parseInt(data.project_id),
        subject: data.subject,
        version: issue.version,
        assigned_to: assigned_to,
      };

      editIssue(editData, {
        onSuccess: () => {
          if (onSuccess) {
            onSuccess();
          }
        },
      });
    }
  };

  const filteredFormFields = issueFormFields.filter((field) => {
    if (!field.required && field.name !== "project_id") {
      return mode === "edit";
    }
    return true;
  });

  // Prepare member options for the MultiSelect component
  const memberOptions =
    project?.members?.map((member) => ({
      label: member.full_name_display || member.username,
      value: member.id.toString(),
    })) || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {filteredFormFields.map((field) => {
          if (field.name === "assigned_to" || field.name === "assigned_users") {
            return null; // Skip these fields as we'll handle them with MultiSelect
          }

          return (
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
                      />
                    </FormControl>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}

        {/* Assign Member field */}
        <FormItem className="flex flex-col">
          <FormLabel>Assign Member</FormLabel>
          <FormControl>
            <MultiSelect
              options={memberOptions}
              onValueChange={handleMemberSelection}
              defaultValue={selectedMembers}
              placeholder="Select a member to assign"
              className="w-full"
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <Button
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid || isPending}
        >
          {isPending ? (
            <>
              <LoaderCircle className="animate-spin mr-2" />
              {mode === "create" ? "Creating Issue..." : "Updating Issue..."}
            </>
          ) : mode === "create" ? (
            "Create Issue"
          ) : (
            "Update Issue"
          )}
        </Button>
      </form>
    </Form>
  );
}
