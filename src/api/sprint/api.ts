import { createApiRequest } from "../base/api-factory";
import type { ResponseProps } from "../base/global-type";
import type { SprintProps, CreateSprintProps, EditSprintProps } from "./type";

const BASE_URL = `/sprints`;

export const sprintApi = {
  getAllSprints: createApiRequest<void, ResponseProps<SprintProps[]>>({
    endpoint: `${BASE_URL}`,
    method: "GET",
  }),

  getSprintById: createApiRequest<
    { urlParams: { id: string } },
    ResponseProps<SprintProps>
  >({
    endpoint: `${BASE_URL}/{id}`,
    method: "GET",
    extraConfig: ({ urlParams }) => ({
      params: {
        id: urlParams?.id,
      },
    }),
  }),

  getSprintByProjectId: createApiRequest<
    { urlParams: { projectId: string } },
    ResponseProps<SprintProps[]>
  >({
    endpoint: `${BASE_URL}/{projectId}`,
    method: "GET",
    extraConfig: ({ urlParams }) => ({
      params: {
        project_id: urlParams?.projectId,
      },
    }),
  }),

  createSprint: createApiRequest<CreateSprintProps, ResponseProps<SprintProps>>(
    {
      endpoint: `${BASE_URL}`,
      method: "POST",
    },
  ),

  updateSprint: createApiRequest<
    Partial<EditSprintProps>,
    ResponseProps<SprintProps>
  >({
    endpoint: `${BASE_URL}/{id}`,
    method: "PUT",
    extraConfig: ({ urlParams }) => ({
      params: {
        id: urlParams?.id,
      },
    }),
  }),

  deleteSprint: createApiRequest<void, ResponseProps<null>>({
    endpoint: `${BASE_URL}/{id}`,
    method: "DELETE",
    extraConfig: ({ urlParams }) => ({
      params: {
        id: urlParams?.id,
      },
    }),
  }),
};
