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
import { epicFormFields, epicFormSchema } from "@/api/epic/schema";
import { useCreateEpic, useEditEpic } from "@/api/epic/mutation";
import { z } from "zod";
import { CreateEpicProps, EpicProps, EditEpicProps } from "@/api/epic/type";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGetProjectBySlug } from "@/api/project/queries";
import { MultiSelect } from "@/components/ui/multiselect";
import { cn } from "@/lib/utils";

interface EpicFormProps {
  onSuccess?: () => void;
  epic?: EpicProps;
  mode: "create" | "edit";
}

export default function EpicForm({ onSuccess, epic, mode }: EpicFormProps) {
  const params = useParams();
  const slug = params.slug as string;
  const { data: project } = useGetProjectBySlug(slug);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const { mutate: createEpic, isPending: isCreating } = useCreateEpic();
  const { mutate: editEpic, isPending: isEditing } = useEditEpic();
  const isPending = isCreating || isEditing;

  const form = useForm<z.infer<typeof epicFormSchema>>({
    resolver: zodResolver(epicFormSchema),
    defaultValues: {
      subject: epic?.subject || "",
      project_id: project?.id?.toString() || "",
      assigned_to: epic?.assigned_to?.toString() || "",
      assigned_users: [],
      selectedMembers: [],
    },
    mode: "onSubmit",
  });

  // Update form values when project or epic changes
  useEffect(() => {
    if (project?.id) {
      form.setValue("project_id", project.id.toString());
    }

    if (epic) {
      if (epic.subject !== undefined) {
        form.setValue("subject", epic.subject || "");
      }

      // Initialize selected members from assigned_to
      const membersToSelect: string[] = [];

      if (epic.assigned_to) {
        membersToSelect.push(epic.assigned_to.toString());
      }

      setSelectedMembers(membersToSelect);
      form.setValue("selectedMembers", membersToSelect);
    }
  }, [project, epic, form]);

  // Handle member selection changes
  const handleMemberSelection = (values: string[]) => {
    setSelectedMembers(values);
    form.setValue("selectedMembers", values, { shouldValidate: true });
  };

  const onSubmit = form.handleSubmit((data) => {
    // Determine assigned_to based on selected members
    const assigned_to =
      selectedMembers.length > 0 ? parseInt(selectedMembers[0]) : null;

    if (mode === "create") {
      const epicData: CreateEpicProps = {
        subject: data.subject,
        project: parseInt(data.project_id),
        assigned_to,
        blocked_note: "",
        client_requirement: false,
        color: "#4e9a06",
        description: "",
        epics_order: Math.floor(Date.now() / 1000),
        is_blocked: false,
        status: 16, // Default status (New)
        tags: [],
        team_requirement: false,
        watchers: [],
      };

      createEpic(epicData, {
        onSuccess: () => {
          const resetValues: Partial<z.infer<typeof epicFormSchema>> = {
            subject: "",
            project_id: project?.id?.toString() || "",
            selectedMembers: [],
          };

          form.reset(resetValues);
          setSelectedMembers([]);

          if (onSuccess) {
            onSuccess();
          }
        },
      });
    } else if (mode === "edit" && epic?.id) {
      const epicData: EditEpicProps = {
        id: epic.id,
        subject: data.subject,
        project: parseInt(data.project_id),
        assigned_to,
        blocked_note: epic.blocked_note || "",
        client_requirement: epic.client_requirement || false,
        color: epic.color || "#4e9a06",
        description: epic.description || "",
        epics_order: epic.epics_order || Math.floor(Date.now() / 1000),
        is_blocked: epic.is_blocked || false,
        status: epic.status || 16,
        tags: epic.tags || [],
        team_requirement: epic.team_requirement || false,
        watchers: epic.watchers || [],
        version: epic.version,
      };

      editEpic(epicData, {
        onSuccess: () => {
          if (onSuccess) {
            onSuccess();
          }
        },
      });
    }
  });

  const filteredFormFields = epicFormFields.filter((field) => {
    // Hide these fields as they're handled automatically
    if (field.hidden) return false;

    // Hide the assigned_to and assigned_users fields as we'll handle them separately
    if (field.name === "assigned_to" || field.name === "assigned_users") {
      return false;
    }

    return true;
  });

  // Define all possible field names to avoid TypeScript errors
  type FieldName = keyof z.infer<typeof epicFormSchema>;

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
                <FormControl>
                  <Input
                    type={field.type}
                    required={field.required}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    {...fieldProps}
                    value={fieldProps.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Render custom assignment field with MultiSelect */}
        <FormItem className="flex flex-col">
          <FormLabel>Assign Member</FormLabel>
          <FormControl>
            <MultiSelect
              options={memberOptions}
              onValueChange={handleMemberSelection}
              defaultValue={selectedMembers}
              placeholder="Select a member to assign"
              className={cn("w-full")}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <LoaderCircle className="animate-spin mr-2" />
              {mode === "create" ? "Creating Epic..." : "Updating Epic..."}
            </>
          ) : mode === "create" ? (
            "Create Epic"
          ) : (
            "Update Epic"
          )}
        </Button>
      </form>
    </Form>
  );
}
