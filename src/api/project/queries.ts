import { useQuery } from "@tanstack/react-query";
import { projectApi } from "@/api/project/api";

export const useGetAllProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => projectApi.getAllProjects(),
  });
};

export const useGetProjectBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["project-by-slug", slug],
    queryFn: () => projectApi.getProjectBySlug({ urlParams: { slug } }),
  });
};

export const useGetProjectById = (projectId: string) => {
  return useQuery({
    queryKey: ["project-by-id", projectId],
    queryFn: () => projectApi.getProjectById({ urlParams: { projectId } }),
  });
};

export const useGetProjectsByUser = (memberId: string) => {
  return useQuery({
    queryKey: ["projects-by-user", memberId],
    queryFn: () => projectApi.getProjectsByUser({ urlParams: { memberId } }),
  });
};

export const useGetProjectDiscover = () => {
  return useQuery({
    queryKey: ["projects-discover"],
    queryFn: () => projectApi.getProjectDiscover(),
  });
};
