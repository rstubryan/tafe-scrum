import { createApiRequest } from "../base/api-factory";
import type { UserStoryProps } from "./type";
import type { ResponseProps } from "../base/global-type";

const BASE_URL = `/user_stories`;

export const userStoryApi = {
  getAllUserStories: createApiRequest<void, ResponseProps<UserStoryProps[]>>({
    endpoint: `${BASE_URL}`,
    method: "GET",
  }),

  getUserStoryById: createApiRequest<
    { urlParams: { id: string } },
    ResponseProps<UserStoryProps>
  >({
    endpoint: `${BASE_URL}/{userStoryId}`,
    method: "GET",
    extraConfig: ({ urlParams }) => ({
      params: {
        id: urlParams?.id,
      },
    }),
  }),

  getUserStoryByRef: createApiRequest<
    { urlParams: { ref: string } },
    ResponseProps<UserStoryProps>
  >({
    endpoint: `${BASE_URL}/by_ref`,
    method: "GET",
    extraConfig: ({ urlParams }) => ({
      params: {
        ref: urlParams?.ref,
      },
    }),
  }),

  createUserStory: createApiRequest<ResponseProps<UserStoryProps>>({
    endpoint: `${BASE_URL}`,
    method: "POST",
  }),

  updateUserStory: createApiRequest<
    { urlParams: { id: string }; body: UserStoryProps },
    ResponseProps<UserStoryProps>
  >({
    endpoint: `${BASE_URL}/{userStoryId}`,
    method: "PUT",
    extraConfig: ({ urlParams }) => ({
      url: `${BASE_URL}/${urlParams?.id}`,
    }),
  }),

  deleteUserStory: createApiRequest<
    { urlParams: { id: string } },
    ResponseProps<UserStoryProps>
  >({
    endpoint: `${BASE_URL}/{userStoryId}`,
    method: "DELETE",
    extraConfig: ({ urlParams }) => ({
      url: `${BASE_URL}/${urlParams?.id}`,
    }),
  }),
};
