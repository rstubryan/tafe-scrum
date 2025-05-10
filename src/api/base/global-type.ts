import type { HttpMethod } from "./api-factory";
import { z } from "zod";

export interface SelectOptionProps {
  label: string;
  value: string;
}

export interface ResponseProps<T> {
  status_code: number;
  status: boolean;
  message: string;
  data: T;
}

export interface FormDialogProps {
  onDialogClose?: () => void;
}

export interface ApiOptions<ResponseData = unknown> {
  endpoint: string;
  method: HttpMethod;
  withAuth?: boolean;
  transformResponse?: (data: unknown) => ResponseData;
  extraConfig?: Record<string, unknown>;
}

export interface FormFieldDefinition<T extends z.ZodType> {
  name: keyof z.infer<T>;
  label: string;
  type: string;
  required?: boolean;
  hidden?: boolean;
}

export interface ErrorResponse {
  code?: string;
  detail?: string;
  error?: string;
}
