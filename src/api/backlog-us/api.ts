import { createApiRequest } from "../base/api-factory";
import type {
  UserStoryProps,
  CreateUserStoryProps,
  EditUserStoryProps,
} from "./type";
import type { ResponseProps } from "../base/global-type";

const BASE_URL = `/userstories`;

export const userStoryApi = {
  getAllUserStories: createApiRequest<void, ResponseProps<UserStoryProps[]>>({
    endpoint: `${BASE_URL}`,
    method: "GET",
  }),

  getUserStoryById: createApiRequest<
    { urlParams: { id: string } },
    ResponseProps<UserStoryProps>
  >({
    endpoint: `${BASE_URL}/{id}`,
    method: "GET",
    extraConfig: ({ urlParams }) => ({
      params: {
        id: urlParams?.id,
      },
    }),
  }),

  getUserStoryByProjectId: createApiRequest<
    { urlParams: { projectId: string } },
    ResponseProps<UserStoryProps[]>
  >({
    endpoint: `${BASE_URL}`,
    method: "GET",
    extraConfig: ({ urlParams }) => ({
      params: {
        project: urlParams?.projectId,
      },
    }),
  }),

  getUserStoryByRefAndProjectId: createApiRequest<
    { urlParams: { ref: string; projectId: string } },
    UserStoryProps
  >({
    endpoint: `${BASE_URL}/by_ref`,
    method: "GET",
    extraConfig: ({ urlParams }) => ({
      params: {
        project: urlParams?.projectId,
        ref: urlParams?.ref,
      },
    }),
  }),

  createUserStory: createApiRequest<
    CreateUserStoryProps,
    ResponseProps<UserStoryProps>
  >({
    endpoint: `${BASE_URL}`,
    method: "POST",
  }),

  updateUserStory: createApiRequest<
    Partial<EditUserStoryProps>,
    ResponseProps<UserStoryProps>
  >({
    endpoint: `${BASE_URL}/{id}`,
    method: "PATCH",
    extraConfig: ({ urlParams }) => ({
      url: `${BASE_URL}/${urlParams?.id}`,
    }),
  }),

  deleteUserStory: createApiRequest<void, ResponseProps<null>>({
    endpoint: `${BASE_URL}/{id}`,
    method: "DELETE",
    extraConfig: ({ urlParams }) => ({
      url: `${BASE_URL}/${urlParams?.id}`,
    }),
  }),
};
