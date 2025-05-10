"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { loginFormFields, loginFormSchema } from "@/api/auth/schema";
import { useAuthLogin } from "@/api/auth/mutation";

export default function LoginForm() {
  const { mutate: login, isPending } = useAuthLogin();

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
      type: "normal",
    },
  });

  const onSubmit = (data: z.infer<typeof loginFormSchema>) => {
    login(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl font-medium">
          Login
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {loginFormFields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: fieldProps }) => (
                  <FormItem className={field.hidden ? "hidden" : undefined}>
                    {!field.hidden && <FormLabel>{field.label}</FormLabel>}
                    <FormControl>
                      <Input
                        {...fieldProps}
                        type={field.type}
                        required={field.required}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button
              type="submit"
              className="w-full"
              disabled={!form.formState.isValid || isPending}
            >
              {isPending ? (
                <LoaderCircle className="animate-spin mr-2" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>

        <p className="mt-6 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-primary">
            Register
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
