import type {
  AuthResponseProps,
  LoginRequestProps,
  RegisterProps,
} from "./type";
import { createApiRequest } from "../base/api-factory";
import { redirect } from "next/navigation";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const BASE_URL = `auth`;

export const authApi = {
  login: createApiRequest<LoginRequestProps, AuthResponseProps>({
    endpoint: `${BASE_URL}`,
    method: "POST",
    withAuth: false,
    extraConfig: () => ({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    }),
  }),

  register: createApiRequest<RegisterProps, AuthResponseProps>({
    endpoint: `${BASE_URL}/register`,
    method: "POST",
    withAuth: false,
    extraConfig: () => ({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    }),
  }),
};

export const handleLogout = () => {
  document.cookie = "user_info=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie =
    "auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie =
    "refresh=; Path=/refresh_token; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
  queryClient.invalidateQueries({ queryKey: ["user-auth"] });
  redirect("/login");
};
