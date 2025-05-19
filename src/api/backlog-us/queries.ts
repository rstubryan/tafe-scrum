import { useQuery } from "@tanstack/react-query";
import { userStoryApi } from "@/api/backlog-us/api";

export const useGetAllUserStories = () => {
  return useQuery({
    queryKey: ["user-stories"],
    queryFn: () => userStoryApi.getAllUserStories(),
  });
};

export const useGetUserStoryById = (id: string) => {
  return useQuery({
    queryKey: ["user-story", id],
    queryFn: () => userStoryApi.getUserStoryById({ urlParams: { id } }),
    enabled: !!id,
  });
};

export const useGetUserStoryByProjectId = (projectId: string) => {
  return useQuery({
    queryKey: ["user-stories-by-project", projectId],
    queryFn: () =>
      userStoryApi.getUserStoryByProjectId({ urlParams: { projectId } }),
    enabled: !!projectId,
  });
};

export const useGetUserStoryByRef = (ref: string) => {
  return useQuery({
    queryKey: ["user-story-by-ref", ref],
    queryFn: () => userStoryApi.getUserStoryByRef({ urlParams: { ref } }),
    enabled: !!ref,
  });
};
