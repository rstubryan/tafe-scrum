import MainContent from "@/components/templates/content/main-content";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { User, KeyRound, Users } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AccountSkeletonPage() {
  return (
    <MainContent>
      {/* Header */}
      <div>
        <Skeleton className="h-8 w-36 mb-2" />
        <Skeleton className="h-5 w-64" />
      </div>

      <div className="space-y-6 my-4">
        <div className="grid grid-cols-1 sm:gap-6 gap-0 md:grid-cols-[250px_1fr]">
          {/* Left sidebar with user info */}
          <div className="space-y-6">
            {/* User profile card */}
            <div className="rounded-lg border p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Skeleton className="h-24 w-24 rounded-full" />
                  <Skeleton className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full" />
                </div>
                <div className="space-y-2 w-full text-center">
                  <Skeleton className="h-5 w-32 mx-auto" />
                  <Skeleton className="h-4 w-40 mx-auto" />
                </div>
              </div>
            </div>

            {/* Mobile tabs */}
            <div className="md:hidden">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile" disabled>
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="password" disabled>
                    Password
                  </TabsTrigger>
                  <TabsTrigger value="users" disabled>
                    Users
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Desktop navigation */}
            <div className="hidden rounded-lg border p-3 md:block">
              <div className="space-y-1">
                <Button
                  variant="secondary"
                  className="w-full justify-start"
                  disabled
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  disabled
                >
                  <KeyRound className="mr-2 h-4 w-4" />
                  Password
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  disabled
                >
                  <Users className="mr-2 h-4 w-4" />
                  Users List
                </Button>
              </div>
            </div>
          </div>

          {/* Right content area - Profile Tab Card */}
          <div className="space-y-6">
            <Card className="rounded-xl border py-6 shadow-sm">
              <CardHeader className="px-6 pb-0">
                <Skeleton className="h-5 w-24 mb-1" />
                <Skeleton className="h-4 w-56" />
              </CardHeader>
              <CardContent className="px-6 mt-6">
                <div className="space-y-4">
                  {/* Username field */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-9 w-full" />
                    <Skeleton className="h-3 w-48" />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-9 w-full" />
                    <Skeleton className="h-3 w-56" />
                  </div>

                  {/* Full Name field */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-9 w-full" />
                    <Skeleton className="h-3 w-52" />
                  </div>

                  {/* Bio field */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-3 w-40" />
                  </div>

                  {/* Form Buttons */}
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-9 w-32 sm:w-36" />
                    <Skeleton className="h-9 w-32 sm:w-36" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainContent>
  );
}
