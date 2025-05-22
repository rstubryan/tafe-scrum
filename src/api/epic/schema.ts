import { z } from "zod";
import { FormFieldDefinition } from "@/api/base/global-type";

const baseEpicSchema = z.object({
  project_id: z.string(),
  assigned_to: z.string().optional(),
  assigned_users: z.array(z.string()).optional(),
  selectedMembers: z.array(z.string()).optional(),
});

export const epicFormSchema = baseEpicSchema.extend({
  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters long" })
    .max(50, { message: "Subject must be at most 50 characters long" }),
});

export type EpicFormSchema = typeof epicFormSchema;

export const epicDetailFormSchema = baseEpicSchema.extend({
  description: z.string().optional(),
});

export type EpicDetailFormSchema = typeof epicDetailFormSchema;

export const epicFormFields: FormFieldDefinition<typeof epicFormSchema>[] = [
  { name: "subject", label: "Epic Name", type: "text", required: true },
  {
    name: "assigned_to",
    label: "Assigned To",
    type: "select",
    required: false,
  },
  {
    name: "assigned_users",
    label: "Assigned Users",
    type: "multi-select",
    required: false,
  },
  {
    name: "project_id",
    label: "Project ID",
    type: "text",
    required: true,
    hidden: true,
  },
];

export const epicDetailFormFields: FormFieldDefinition<
  typeof epicDetailFormSchema
>[] = [
  {
    name: "description",
    label: "Description",
    type: "textarea",
    required: false,
  },
  {
    name: "project_id",
    label: "Project ID",
    type: "text",
    required: true,
    hidden: true,
  },
];
