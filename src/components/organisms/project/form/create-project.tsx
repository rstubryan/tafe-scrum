"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { projectFormFields, projectFormSchema } from "@/api/project/schema";
import { useCreateProject } from "@/api/project/mutation";
import { z } from "zod";
import { Label } from "@/components/ui/label";

export default function CreateProjectForm() {
  const { mutate: createProject, isPending } = useCreateProject();

  const form = useForm({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      description: "",
      is_private: false,
      is_epics_activated: true,
    },
  });

  const onSubmit = (data: z.infer<typeof projectFormSchema>) => {
    createProject(data, {
      onSuccess: () => {
        form.reset({
          name: "",
          description: "",
          is_private: false,
          is_epics_activated: true,
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
        {projectFormFields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: fieldProps }) => (
              <FormItem className={field.hidden ? "hidden" : "flex flex-col"}>
                {!field.hidden && <FormLabel>{field.label}</FormLabel>}
                {field.type === "text" && (
                  <FormControl>
                    <Input
                      type={field.type}
                      required={field.required}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      {...fieldProps}
                      value={fieldProps.value as string}
                    />
                  </FormControl>
                )}
                {field.type === "textarea" && (
                  <FormControl>
                    <Textarea
                      required={field.required}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      {...fieldProps}
                      value={fieldProps.value as string}
                    />
                  </FormControl>
                )}
                {field.type === "checkbox" && (
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        id={field.name}
                        checked={fieldProps.value as boolean}
                        onCheckedChange={fieldProps.onChange}
                      />
                    </FormControl>
                    <Label
                      htmlFor={field.name}
                      className="!text-sm !font-normal"
                    >
                      {field.label}
                    </Label>
                  </div>
                )}
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
            <>
              <LoaderCircle className="animate-spin" />
              Creating Project...
            </>
          ) : (
            "Create Project"
          )}
        </Button>
      </form>
    </Form>
  );
}
