"use client";

import { useState } from "react";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useChangePassword } from "@/api/user/mutation";

export default function TabPassword() {
  const [formError, setFormError] = useState<string | null>(null);
  const { mutate: changePassword, isPending } = useChangePassword();

  const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("current_password") as string;
    const newPassword = formData.get("password") as string;
    const confirmPassword = formData.get("password_confirmation") as string;

    if (newPassword !== confirmPassword) {
      setFormError("New passwords don't match");
      return;
    }

    changePassword({
      current_password: currentPassword,
      password: newPassword,
      password_confirmation: confirmPassword,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your password to keep your account secure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          {formError && (
            <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
              {formError}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              <KeyRound className="mr-2 h-4 w-4" />
              Current Password
            </label>
            <input
              type="password"
              name="current_password"
              required
              className="w-full border rounded-md p-2"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              <KeyRound className="mr-2 h-4 w-4" />
              New Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full border rounded-md p-2"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              <KeyRound className="mr-2 h-4 w-4" />
              Confirm New Password
            </label>
            <input
              type="password"
              name="password_confirmation"
              required
              className="w-full border rounded-md p-2"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
