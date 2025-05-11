import { z } from "zod";
import { FormFieldDefinition } from "@/api/base/global-type";

export const profileFormSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  full_name: z.string().optional(),
  bio: z.string().optional(),
  photo: z.string().optional(),
  password: z.string().optional(),
});

export type ProfileFormSchema = typeof profileFormSchema;

export const profileFormFields: FormFieldDefinition<
  typeof profileFormSchema
>[] = [
  {
    name: "username",
    label: "Username",
    type: "text",
    required: false,
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    required: false,
  },
  {
    name: "full_name",
    label: "Full Name",
    type: "text",
    required: false,
  },
  {
    name: "bio",
    label: "Bio",
    type: "textarea",
    required: false,
  },
  {
    name: "photo",
    label: "Photo URL",
    type: "file",
    required: false,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: false,
  },
];
