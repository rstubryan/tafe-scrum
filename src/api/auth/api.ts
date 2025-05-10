import type {
  AuthResponseProps,
  LoginRequestProps,
  RegisterProps,
} from "./type";
import { createApiRequest } from "../base/api-factory";
import { redirect } from "next/navigation";

const BASE_URL = `/auth`;

export const authApi = {
  login: createApiRequest<LoginRequestProps, AuthResponseProps>({
    endpoint: `${BASE_URL}`,
    method: "POST",
  }),

  register: createApiRequest<RegisterProps, AuthResponseProps>({
    endpoint: `${BASE_URL}/register`,
    method: "POST",
  }),
};

export const handleLogout = () => {
  document.cookie = "username=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "role=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
  redirect("/login");
};
