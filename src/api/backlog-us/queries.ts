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
    queryKey: ["user-story-by-id", id],
    queryFn: () => userStoryApi.getUserStoryById({ urlParams: { id } }),
  });
};

export const useGetUserStoryByRef = (ref: string) => {
  return useQuery({
    queryKey: ["user-story-by-ref", ref],
    queryFn: () => userStoryApi.getUserStoryByRef({ urlParams: { ref } }),
  });
};
