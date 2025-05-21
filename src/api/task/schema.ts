import { z } from "zod";
import { FormFieldDefinition } from "@/api/base/global-type";

const baseTaskSchema = z.object({
  project_id: z.string(),
  user_story_id: z.string(),
  version: z.string().optional(),
});

export const taskFormSchema = baseTaskSchema.extend({
  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters long" })
    .max(50, { message: "Subject must be at most 50 characters long" }),
});

export type TaskFormSchema = typeof taskFormSchema;

export const taskFormSchemaStatus = baseTaskSchema.extend({
  status: z.enum([
    "new",
    "in_progress",
    "ready_for_test",
    "closed",
    "needs_info",
  ]),
  message: z.string(),
});

export type TaskFormSchemaStatus = typeof taskFormSchemaStatus;

export const taskFormFields: FormFieldDefinition<typeof taskFormSchema>[] = [
  { name: "subject", label: "Task Name", type: "text", required: true },
  {
    name: "project_id",
    label: "Project ID",
    type: "text",
    required: true,
    hidden: true,
  },
  {
    name: "user_story_id",
    label: "User Story ID",
    type: "text",
    required: true,
    hidden: true,
  },
  {
    name: "version",
    label: "Version",
    type: "text",
    required: false,
    hidden: true,
  },
];

export const taskFormFieldsStatus: FormFieldDefinition<
  typeof taskFormSchemaStatus
>[] = [
  {
    name: "project_id",
    label: "Project ID",
    type: "text",
    required: true,
    hidden: true,
  },
  {
    name: "user_story_id",
    label: "User Story ID",
    type: "text",
    required: true,
    hidden: true,
  },
  {
    name: "version",
    label: "Version",
    type: "text",
    required: false,
    hidden: true,
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
  },
];
