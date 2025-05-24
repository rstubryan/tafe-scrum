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
import { Button } from "@/components/ui/button";
import { epicDetailRelatedUsFormSchema } from "@/api/epic/schema";
import { useCreateRelatedUserStory } from "@/api/epic/mutation";
import { z } from "zod";
import { EpicProps } from "@/api/epic/type";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useGetProjectBySlug } from "@/api/project/queries";
import { useGetUserStoryByProjectId } from "@/api/backlog-us/queries";
import type { UserStoryProps } from "@/api/backlog-us/type";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface SlugEpicRelatedUsFormProps {
  onSuccess?: () => void;
  epic: EpicProps;
}

type FormValues = z.infer<typeof epicDetailRelatedUsFormSchema>;

export default function SlugEpicRelatedUsForm({
  onSuccess,
  epic,
}: SlugEpicRelatedUsFormProps) {
  const params = useParams();
  const slug = params.slug as string;
  const { data: project } = useGetProjectBySlug(slug);
  const { data: userStories } = useGetUserStoryByProjectId(
    project?.id?.toString() || "",
  );
  const { mutate: createRelatedUserStory, isPending } =
    useCreateRelatedUserStory();

  const form = useForm<FormValues>({
    resolver: zodResolver(epicDetailRelatedUsFormSchema),
    defaultValues: {
      epic_id: epic?.id?.toString() || "",
      user_story_id: "",
    },
    mode: "onSubmit",
  });

  // Update form values when epic changes
  useEffect(() => {
    if (epic?.id) {
      form.setValue("epic_id", epic.id.toString());
    }
  }, [epic, form]);

  const onSubmit = form.handleSubmit((data) => {
    createRelatedUserStory(
      {
        epicId: data.epic_id,
        userStoryId: data.user_story_id,
      },
      {
        onSuccess: () => {
          form.reset({
            epic_id: epic?.id?.toString() || "",
            user_story_id: "",
          });

          if (onSuccess) {
            onSuccess();
          }
        },
      },
    );
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Epic ID field (hidden) */}
        <FormField
          control={form.control}
          name="epic_id"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <input type="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* User Story selection */}
        <FormField
          control={form.control}
          name="user_story_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Select User Story</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? (Array.isArray(userStories) ? userStories : []).find(
                            (userStory: UserStoryProps) =>
                              String(userStory.id) === field.value,
                          )?.subject || "Select user story"
                        : "Select a user story"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search user stories..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No user stories found.</CommandEmpty>
                      <CommandGroup>
                        {Array.isArray(userStories) &&
                          userStories.map((userStory: UserStoryProps) => (
                            <CommandItem
                              key={userStory.id}
                              value={
                                userStory.subject || `US #${userStory.ref}`
                              }
                              onSelect={() => {
                                field.onChange(String(userStory.id || ""));
                              }}
                            >
                              {userStory.subject || `US #${userStory.ref}`}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  String(userStory.id) === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage /> <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <LoaderCircle className="animate-spin mr-2" />
              Relating User Story...
            </>
          ) : (
            "Relate User Story"
          )}
        </Button>
      </form>
    </Form>
  );
}
