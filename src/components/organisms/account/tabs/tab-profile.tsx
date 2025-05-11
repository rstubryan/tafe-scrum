"use client";

import { AtSign, FileText, Mail, User } from "lucide-react";
import { useGetUserAuth } from "@/api/user/queries";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEditUserInfo } from "@/api/user/mutation";
import { LoaderCircle } from "lucide-react";
import { UserProps } from "@/api/user/type";

export default function TabProfile() {
  const { data, isLoading } = useGetUserAuth();
  const userData = data as unknown as UserProps;

  const { mutate: updateProfile, isPending: isUpdatingProfile } =
    useEditUserInfo();

  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    updateProfile({
      full_name: formData.get("full_name") as string,
      bio: formData.get("bio") as string,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Unable to load user data.
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>
          Update your personal information and public profile.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              <AtSign className="mr-2 h-4 w-4" />
              Username
            </label>
            <input
              type="text"
              name="username"
              className="w-full border rounded-md p-2 bg-muted"
              defaultValue={userData.username}
              disabled
            />
            <p className="text-xs text-muted-foreground">
              Your unique username (cannot be changed).
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full border rounded-md p-2 bg-muted"
              defaultValue={userData.email}
              disabled
            />
            <p className="text-xs text-muted-foreground">
              Your email address (cannot be changed).
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              <User className="mr-2 h-4 w-4" />
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              className="w-full border rounded-md p-2"
              defaultValue={userData.full_name}
            />
            <p className="text-xs text-muted-foreground">
              Your full name displayed on your profile.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Bio
            </label>
            <textarea
              name="bio"
              className="w-full border rounded-md p-2 min-h-[100px]"
              defaultValue={userData.bio}
            />
            <p className="text-xs text-muted-foreground">
              A brief description about yourself.
            </p>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isUpdatingProfile}>
              {isUpdatingProfile ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
