import type { HttpMethod } from "./api-factory";

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
