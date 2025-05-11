"use client";

import { useState } from "react";
import { LoaderCircle, User, FileText, Camera } from "lucide-react";
import { useGetUserAuth } from "@/api/user/queries";
import { UserProps } from "@/api/user/type";
import { Typography } from "@/components/atoms/typography/typography";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabProfile from "@/components/organisms/account/tabs/tab-profile";
import TabPassword from "@/components/organisms/account/tabs/tab-password";

export default function EditForm() {
  const { data, isLoading: isLoadingUserData } = useGetUserAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const userData = data as unknown as UserProps;

  function getInitials(name: string | undefined) {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  }

  if (isLoadingUserData) {
    return (
      <div className="flex justify-center py-8">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Unable to load user information.
      </div>
    );
  }

  return (
    <div className="space-y-6 my-4">
      <div className="grid grid-cols-1 sm:gap-6 gap-0 md:grid-cols-[250px_1fr]">
        {/* Left sidebar with user info */}
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 text-center">
            <div className="relative">
              <Avatar className="h-24 w-24">
                {userData.photo ? (
                  <AvatarImage
                    src={userData.photo}
                    alt={userData.full_name_display || userData.username || ""}
                  />
                ) : (
                  <AvatarFallback className="text-lg">
                    {getInitials(
                      userData.full_name_display || userData.username,
                    )}
                  </AvatarFallback>
                )}
              </Avatar>

              {/* Avatar change button */}
              <Button
                variant="outline"
                size="icon"
                className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full shadow-md"
                // onClick={openFileSelector}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-1">
              <Typography className="font-medium">
                {userData.full_name_display || userData.username}
              </Typography>
              <Typography className="text-muted-foreground break-words">
                {userData.email}
              </Typography>
            </div>
          </div>

          {/* Account navigation tabs (for mobile/smaller screens) */}
          <div className="md:hidden">
            <Tabs
              defaultValue={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Account navigation (for larger screens) */}
          <div className="hidden rounded-lg border p-3 md:block">
            <div className="space-y-1">
              <Button
                variant={activeTab === "profile" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button
                variant={activeTab === "preferences" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("preferences")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Preferences
              </Button>
            </div>
          </div>
        </div>

        {/* Right content area */}
        <div className="space-y-6">
          {activeTab === "profile" ? <TabProfile /> : <TabPassword />}
        </div>
      </div>
    </div>
  );
}
