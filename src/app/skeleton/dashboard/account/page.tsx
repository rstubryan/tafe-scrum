import MainContent from "@/components/templates/content/main-content";
import { Button } from "@/components/ui/button";
import {
  User,
  KeyRound,
  Users,
  AtSign,
  Mail,
  FileText,
  Save,
  Trash2,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AccountSkeletonPage() {
  return (
    <MainContent>
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Page Title</h1>
        <p className="text-muted-foreground">Page Description</p>
      </div>

      <div className="space-y-6 my-4">
        <div className="grid grid-cols-1 sm:gap-6 gap-0 md:grid-cols-[250px_1fr]">
          {/* Left sidebar with user info */}
          <div className="space-y-6">
            {/* User profile card */}
            <div className="rounded-lg border p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full p-0"
                  >
                    Edit
                  </Button>
                </div>
                <div className="space-y-2 w-full text-center">
                  <h3 className="font-medium">User Name</h3>
                  <p className="text-sm text-muted-foreground">User Email</p>
                </div>
              </div>
            </div>

            {/* Mobile tabs */}
            <div className="md:hidden">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="users">Users</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Desktop navigation */}
            <div className="hidden rounded-lg border p-3 md:block">
              <div className="space-y-1">
                <Button variant="secondary" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <KeyRound className="mr-2 h-4 w-4" />
                  Password
                </Button>
                <Button variant="ghost" className="w-full justify-start">
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
                <h2 className="font-semibold">Card Title</h2>
                <p className="text-sm text-muted-foreground">
                  Card Description
                </p>
              </CardHeader>
              <CardContent className="px-6 mt-6">
                <div className="space-y-4">
                  {/* Username field */}
                  <div className="space-y-2">
                    <Label htmlFor="username" className="flex items-center">
                      <AtSign className="mr-2 h-4 w-4" />
                      Field Label
                    </Label>
                    <Input id="username" defaultValue="Field Value" disabled />
                    <p className="text-xs text-muted-foreground">Help Text</p>
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      Field Label
                    </Label>
                    <Input id="email" defaultValue="Field Value" disabled />
                    <p className="text-xs text-muted-foreground">Help Text</p>
                  </div>

                  {/* Full Name field */}
                  <div className="space-y-2">
                    <Label htmlFor="full_name" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Field Label
                    </Label>
                    <Input id="full_name" defaultValue="Field Value" />
                    <p className="text-xs text-muted-foreground">Help Text</p>
                  </div>

                  {/* Bio field */}
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Field Label
                    </Label>
                    <Textarea id="bio" className="min-h-16" />
                    <p className="text-xs text-muted-foreground">Help Text</p>
                  </div>

                  {/* Form Buttons */}
                  <div className="flex justify-end gap-2">
                    <Button variant="destructive" className="w-full sm:w-max">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Button Text
                    </Button>
                    <Button className="w-full sm:w-max">
                      <Save className="h-4 w-4 mr-2" />
                      Button Text
                    </Button>
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
