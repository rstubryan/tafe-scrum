import { z } from "zod";
import { FormFieldDefinition } from "@/api/base/global-type";

export const userStoryFormSchema = z.object({
  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters long" })
    .max(50, { message: "Subject must be at most 50 characters long" }),
  project_id: z.string(),
  version: z.string().optional(),
  due_date: z
    .string()
    .optional()
    .refine(
      (date) => {
        if (!date) return true;
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
      },
      { message: "Invalid date format" },
    ),
});

export type UserStoryFormSchema = typeof userStoryFormSchema;

export const userStoryFormFields: FormFieldDefinition<
  typeof userStoryFormSchema
>[] = [
  { name: "subject", label: "User Story Name", type: "text", required: true },
  {
    name: "project_id",
    label: "Project ID",
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
    name: "due_date",
    label: "Due Date",
    type: "date",
    required: false,
  },
];
