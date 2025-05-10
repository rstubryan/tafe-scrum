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
import { registerFormSchema } from "@/api/auth/schema";
import { useAuthRegister } from "@/api/auth/mutation";
import { FormFieldDefinition } from "@/api/base/global-type";

export default function RegisterForm() {
  const { mutate: register, isPending } = useAuthRegister();

  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      full_name: "",
      email: "",
      password: "",
      type: "public",
      accepted_terms: "true",
    },
  });

  const onSubmit = (data: z.infer<typeof registerFormSchema>) => {
    register(data);
  };

  const fields: FormFieldDefinition<typeof registerFormSchema>[] = [
    { name: "username", label: "Username", type: "text", required: true },
    { name: "full_name", label: "Full Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true },
    { name: "type", label: "Type", type: "hidden", hidden: true },
    {
      name: "accepted_terms",
      label: "Accepted Terms",
      type: "hidden",
      hidden: true,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl font-medium">
          Register
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field) => (
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
                "Register"
              )}
            </Button>
          </form>
        </Form>

        <p className="mt-6 text-center">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary">
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
