import { z } from "zod";
import { FormFieldDefinition } from "@/api/base/global-type";

export const taskFormSchema = z.object({
  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters long" })
    .max(50, { message: "Subject must be at most 50 characters long" }),
  project_id: z.string(),
  user_story_id: z.string(),
  version: z.string().optional(),
});

export type TaskFormSchema = typeof taskFormSchema;

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
