"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AtSign, FileText, Mail, User, LoaderCircle } from "lucide-react";
import { useGetUserAuth } from "@/api/user/queries";
import { useEditUserInfo } from "@/api/user/mutation";
import { profileFormFields, profileFormSchema } from "@/api/user/schema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResponseProps } from "@/api/base/global-type";
import { UserProps } from "@/api/user/type";

export default function TabProfile() {
  const { data, isLoading } = useGetUserAuth();
  const { mutate: updateProfile, isPending: isUpdatingProfile } =
    useEditUserInfo();

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
      email: "",
      full_name: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (data && !isLoading) {
      const userData = (data as ResponseProps<UserProps>).data || data;

      form.setValue("username", userData?.username || "");
      form.setValue("email", userData?.email || "");
      form.setValue("full_name", userData?.full_name || "");
      form.setValue("bio", userData?.bio || "");
    }
  }, [data, isLoading, form]);

  const onSubmit = (values: z.infer<typeof profileFormSchema>) => {
    const userData = (data as ResponseProps<UserProps>).data || data;

    updateProfile({
      id: userData?.id,
      full_name: values.full_name,
      bio: values.bio,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  if (!data) {
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {profileFormFields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: fieldProps }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="flex items-center">
                      {field.name === "username" && <AtSign />}
                      {field.name === "email" && <Mail />}
                      {field.name === "full_name" && <User />}
                      {field.name === "bio" && <FileText />}
                      {field.label}
                    </FormLabel>
                    <FormControl>
                      {field.type === "textarea" ? (
                        <Textarea
                          {...fieldProps}
                          disabled={
                            field.name === "username" || field.name === "email"
                          }
                          className={
                            field.name === "username" || field.name === "email"
                              ? "bg-muted"
                              : ""
                          }
                        />
                      ) : (
                        <Input
                          {...fieldProps}
                          disabled={
                            field.name === "username" || field.name === "email"
                          }
                          className={
                            field.name === "username" || field.name === "email"
                              ? "bg-muted"
                              : ""
                          }
                        />
                      )}
                    </FormControl>
                    {field.name === "username" && (
                      <p className="text-xs text-muted-foreground">
                        Your unique username (cannot be changed).
                      </p>
                    )}
                    {field.name === "email" && (
                      <p className="text-xs text-muted-foreground">
                        Your email address (cannot be changed).
                      </p>
                    )}
                    {field.name === "full_name" && (
                      <p className="text-xs text-muted-foreground">
                        Your full name displayed on your profile.
                      </p>
                    )}
                    {field.name === "bio" && (
                      <p className="text-xs text-muted-foreground">
                        A brief description about yourself.
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <div className="flex justify-end">
              <Button type="submit" disabled={isUpdatingProfile}>
                {isUpdatingProfile ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
