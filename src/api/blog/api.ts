import type { BlogAuthorProps, BlogPostProps } from "./type";
import { createApiRequest } from "../base/api-factory";

export const blogApi = {
  getBlogPost: createApiRequest<BlogPostProps>({
    endpoint: `/posts`,
    method: "GET",
    isBlog: true,
  }),

  getBlogAuthor: createApiRequest<
    { urlParams: { id: string } },
    BlogAuthorProps
  >({
    endpoint: `/users/{id}`,
    method: "GET",
    isBlog: true,
    extraConfig: ({ urlParams }) => ({
      params: {
        id: urlParams?.id,
      },
    }),
  }),
};
