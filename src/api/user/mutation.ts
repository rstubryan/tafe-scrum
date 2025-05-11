import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { userApi } from "@/api/user/api";
import { UserEditProfileProps, ChangePasswordProps } from "@/api/user/type";
import type { ErrorResponse } from "@/api/base/global-type";

export const useEditUserInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserEditProfileProps) => {
      if (!data.id) {
        throw new Error("User ID is required for profile update");
      }

      return userApi.updateUserProfile({
        data,
        urlParams: {
          id: data.id,
        },
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user-auth"] });
      toast.success("Profile updated successfully");
      return data;
    },
    onError: (error: AxiosError) => {
      if (error.response?.data) {
        const responseData = error.response.data as ErrorResponse;
        const errorMessage =
          responseData.detail ||
          responseData.error ||
          responseData.code ||
          "Profile update failed";

        toast.error(errorMessage, {
          description: "Please check your input and try again.",
        });
      } else if (error.request) {
        toast.error("Network error", {
          description: "Please check your connection.",
        });
      } else {
        toast.error("Profile update failed", {
          description: "Please try again later.",
        });
      }
    },
  });
};

export const useChangeProfilePicture = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) =>
      userApi.changeProfilePicture({ data: formData }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user-auth"] });
      toast.success("Profile picture updated successfully");
      return data;
    },
    onError: (error: AxiosError) => {
      if (error.response?.data) {
        const responseData = error.response.data as ErrorResponse;
        const errorMessage =
          responseData.detail ||
          responseData.error ||
          responseData.code ||
          "Profile picture update failed";

        toast.error(errorMessage, {
          description: "Please check your image and try again.",
        });
      } else if (error.request) {
        toast.error("Network error", {
          description: "Please check your connection.",
        });
      } else {
        toast.error("Profile picture update failed", {
          description: "Please try again later.",
        });
      }
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordProps) => userApi.changePassword({ data }),
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error: AxiosError) => {
      if (error.response?.data) {
        const responseData = error.response.data as ErrorResponse;
        const errorMessage =
          responseData.detail ||
          responseData.error ||
          responseData.code ||
          "Password change failed";

        toast.error(errorMessage, {
          description: "Please check your input and try again.",
        });
      } else if (error.request) {
        toast.error("Network error", {
          description: "Please check your connection.",
        });
      } else {
        toast.error("Password change failed", {
          description: "Please try again later.",
        });
      }
    },
  });
};
