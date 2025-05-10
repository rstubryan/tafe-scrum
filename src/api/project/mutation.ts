import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { projectApi } from "@/api/project/api";
import { ProjectResponseProps } from "@/api/project/type";
import type { ErrorResponse } from "@/api/base/global-type";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProjectResponseProps) =>
      projectApi.createProject({ data }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created successfully");
      return data;
    },
    onError: (error: AxiosError) => {
      if (error.response?.data) {
        const responseData = error.response.data as ErrorResponse;
        const errorMessage =
          responseData.detail ||
          responseData.error ||
          responseData.code ||
          "Project creation failed";

        toast.error(errorMessage, {
          description: "Please check your input and try again.",
        });
      } else if (error.request) {
        toast.error("Network error", {
          description: "Please check your connection.",
        });
      } else {
        toast.error("Project creation failed", {
          description: "Please try again later.",
        });
      }
    },
  });
};

export const useEditProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProjectResponseProps) =>
      projectApi.updateProject({ data }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project updated successfully");
      return data;
    },
    onError: (error: AxiosError) => {
      if (error.response?.data) {
        const responseData = error.response.data as ErrorResponse;
        const errorMessage =
          responseData.detail ||
          responseData.error ||
          responseData.code ||
          "Project update failed";

        toast.error(errorMessage, {
          description: "Please check your input and try again.",
        });
      } else if (error.request) {
        toast.error("Network error", {
          description: "Please check your connection.",
        });
      } else {
        toast.error("Project update failed", {
          description: "Please try again later.",
        });
      }
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) =>
      projectApi.deleteProject({ urlParams: { projectId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted successfully");
    },
    onError: (error: AxiosError) => {
      if (error.response?.data) {
        const responseData = error.response.data as ErrorResponse;
        const errorMessage =
          responseData.detail ||
          responseData.error ||
          responseData.code ||
          "Project deletion failed";

        toast.error(errorMessage, {
          description: "Please try again later.",
        });
      } else if (error.request) {
        toast.error("Network error", {
          description: "Please check your connection.",
        });
      } else {
        toast.error("Project deletion failed", {
          description: "Please try again later.",
        });
      }
    },
  });
};
