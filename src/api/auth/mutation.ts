import { useMutation } from "@tanstack/react-query";
import type { LoginProps, RegisterProps, AuthResponseProps } from "./type";
import { AxiosError } from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { authApi } from "./api";

interface ErrorResponse {
  code?: string;
  detail?: string;
  error?: string;
}

export const useAuthLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["auth-login"],
    mutationFn: (formData: LoginProps) => authApi.login({ data: formData }),
    onSuccess: (data: AuthResponseProps) => {
      Cookies.set("auth_token", data.auth_token);
      Cookies.set("refresh", data.refresh, { path: "/refresh_token" });
      Cookies.set("user_info", JSON.stringify(data));

      toast.success(data.message, {
        description: "You have successfully logged in.",
      });

      router.push("/dashboard");
    },
    onError: (error: AxiosError) => {
      if (error.response?.data) {
        const responseData = error.response.data as ErrorResponse;
        const errorMessage =
          responseData.detail ||
          responseData.error ||
          responseData.code ||
          "Authentication failed";

        toast.error(errorMessage, {
          description: "Please check your credentials and try again.",
        });
      } else if (error.request) {
        toast.error("Network error", {
          description: "Please check your connection.",
        });
      } else {
        toast.error("Authentication failed", {
          description: "Please try again later.",
        });
      }
    },
  });
};

export const useAuthRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["auth-register"],
    mutationFn: (formData: RegisterProps) =>
      authApi.register({ data: formData }),
    onSuccess: (data: AuthResponseProps) => {
      Cookies.set("auth_token", data.auth_token, { sameSite: "strict" });
      Cookies.set("refresh", data.refresh, {
        sameSite: "strict",
        path: "/refresh_token",
      });
      Cookies.set("user_info", JSON.stringify(data), {
        sameSite: "strict",
      });

      toast.success(data.message, {
        description:
          "You have successfully signed up, redirecting to dashboard.",
      });

      router.push("/dashboard");
    },
    onError: (error: AxiosError) => {
      if (error.response?.data) {
        const responseData = error.response.data as ErrorResponse;
        const errorMessage =
          responseData.detail ||
          responseData.error ||
          responseData.code ||
          "Registration failed";

        toast.error(errorMessage, {
          description: "Please check your information and try again.",
        });
      } else if (error.request) {
        toast.error("Network error", {
          description: "Please check your connection.",
        });
      } else {
        toast.error("Registration failed", {
          description: "Please try again later.",
        });
      }
    },
  });
};
