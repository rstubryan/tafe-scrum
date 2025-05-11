import { createApiRequest } from "../base/api-factory";
import type {
  ProjectResponseProps,
  ProjectCreateProps,
  ProjectEditProps,
} from "./type";
import type { ResponseProps } from "../base/global-type";

const BASE_URL = `/projects`;

export const projectApi = {
  getAllProjects: createApiRequest<void, ResponseProps<ProjectResponseProps[]>>(
    {
      endpoint: `${BASE_URL}`,
      method: "GET",
    },
  ),

  getProjectDiscover: createApiRequest<
    void,
    ResponseProps<ProjectResponseProps[]>
  >({
    endpoint: `${BASE_URL}`,
    method: "GET",
    extraConfig: () => ({
      params: {
        discover_mode: true,
      },
    }),
  }),

  getProjectsByUser: createApiRequest<
    { urlParams: { memberId: string } },
    ResponseProps<ProjectResponseProps[]>
  >({
    endpoint: `${BASE_URL}`,
    method: "GET",
    extraConfig: ({ urlParams }) => ({
      params: {
        member: urlParams?.memberId,
      },
    }),
  }),

  getProjectBySlug: createApiRequest<
    { urlParams: { slug: string } },
    ResponseProps<ProjectResponseProps>
  >({
    endpoint: `${BASE_URL}/by_slug`,
    method: "GET",
    extraConfig: ({ urlParams }) => ({
      params: {
        slug: urlParams?.slug,
      },
    }),
  }),

  getProjectById: createApiRequest<
    { urlParams: { projectId: string } },
    ResponseProps<ProjectResponseProps>
  >({
    endpoint: `/timeline/project/{projectId}`,
    method: "GET",
    extraConfig: ({ urlParams }) => ({
      params: {
        only_relevant: true,
        project: urlParams?.projectId,
      },
    }),
  }),

  createProject: createApiRequest<
    ProjectCreateProps,
    ResponseProps<ProjectResponseProps>
  >({
    endpoint: `${BASE_URL}`,
    method: "POST",
  }),

  updateProject: createApiRequest<
    Partial<ProjectEditProps>,
    ResponseProps<ProjectResponseProps>
  >({
    endpoint: `${BASE_URL}/{id}`,
    method: "PATCH",
    extraConfig: ({ urlParams }) => ({
      url: `${BASE_URL}/${urlParams?.id}`,
    }),
  }),

  deleteProject: createApiRequest<void, ResponseProps<null>>({
    endpoint: `${BASE_URL}/{id}`,
    method: "DELETE",
    extraConfig: ({ urlParams }) => ({
      url: `${BASE_URL}/${urlParams?.id}`,
    }),
  }),
};
