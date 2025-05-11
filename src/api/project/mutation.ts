import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { projectApi } from "@/api/project/api";
import { ProjectEditProps, ProjectResponseProps } from "@/api/project/type";
import type { ErrorResponse } from "@/api/base/global-type";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProjectResponseProps) =>
      projectApi.createProject({ data }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects-by-user"] });
      queryClient.invalidateQueries({ queryKey: ["projects-discover"] });
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
    mutationFn: (data: ProjectEditProps) => {
      if (!data.id) {
        throw new Error("Project ID is required for project update");
      }

      return projectApi.updateProject({
        data,
        urlParams: {
          id: data.id,
        },
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects-by-user"] });
      queryClient.invalidateQueries({ queryKey: ["projects-discover"] });
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
    mutationFn: (data: { id: string | number }) => {
      if (!data.id) {
        throw new Error("Project ID is required for project deletion");
      }

      return projectApi.deleteProject({
        urlParams: {
          id: data.id,
        },
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects-by-user"] });
      queryClient.invalidateQueries({ queryKey: ["projects-discover"] });
      toast.success("Project deleted successfully");
      return data;
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
          description: "Please check your input and try again.",
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
