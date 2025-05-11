import { createApiRequest } from "../base/api-factory";
import type {
  UserProps,
  UserEditProfileProps,
  ChangePasswordProps,
} from "./type";
import type { ResponseProps } from "../base/global-type";

const BASE_URL = `/users`;

export const userApi = {
  getAllUsers: createApiRequest<void, ResponseProps<UserProps[]>>({
    endpoint: `${BASE_URL}`,
    method: "GET",
  }),

  getUserAuth: createApiRequest<void, ResponseProps<UserProps>>({
    endpoint: `${BASE_URL}/me`,
    method: "GET",
  }),

  updateUserProfile: createApiRequest<
    UserEditProfileProps,
    ResponseProps<UserProps>
  >({
    endpoint: `${BASE_URL}/me`,
    method: "PATCH",
  }),

  changeProfilePicture: createApiRequest<FormData, ResponseProps<UserProps>>({
    endpoint: `${BASE_URL}/change_avatar`,
    method: "POST",
  }),

  changePassword: createApiRequest<ChangePasswordProps, ResponseProps<null>>({
    endpoint: `${BASE_URL}/change_password`,
    method: "POST",
  }),
};
