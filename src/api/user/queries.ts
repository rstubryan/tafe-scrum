import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/api/user/api";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => userApi.getAllUsers(),
  });
};

export const useGetUserAuth = () => {
  return useQuery({
    queryKey: ["user-auth"],
    queryFn: () => userApi.getUserAuth(),
  });
};
