"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/atoms/typography/typography";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/avatar-initials";
import { useGetProjectBySlug } from "@/api/project/queries";
import { useGetUserStoryByRefAndProjectId } from "@/api/backlog-us/queries";
import { useGetTaskByProjectIdAndUserStoryId } from "@/api/task/queries";
import { formatDate } from "@/utils";

export default function SlugBacklogContent() {
  const params = useParams();
  const slug = params.slug as string;
  const storyRef = params.id as string;

  const { data: project } = useGetProjectBySlug(slug);
  const { data: userStory, isLoading: isLoadingUserStory } =
    useGetUserStoryByRefAndProjectId(storyRef, project?.id?.toString() || "");

  const { data: tasksResponse, isLoading: isLoadingTasks } =
    useGetTaskByProjectIdAndUserStoryId(
      project?.id?.toString() || "",
      userStory?.id?.toString() || "",
    );

  // Extract tasks array from the response
  const tasks = Array.isArray(tasksResponse) ? tasksResponse : [];
  const taskCount = tasks.length;

  const isLoading = isLoadingUserStory || isLoadingTasks;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Typography>Loading user story details...</Typography>
      </div>
    );
  }

  if (!userStory) {
    return (
      <div className="flex items-center justify-center h-40">
        <Typography>User story not found</Typography>
      </div>
    );
  }

  return (
    <div className="grid auto-rows-min">
      <Card className="my-6">
        <CardHeader className="pb-0">
          <div className="flex items-center gap-2">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-md"
              style={{
                backgroundColor:
                  userStory.status_extra_info?.color || "#70728F",
              }}
            >
              <Typography className="font-bold text-white">
                #{userStory.ref}
              </Typography>
            </div>
            <div>
              <CardTitle className="line-clamp-1">
                {userStory.subject}
              </CardTitle>
              <CardContent className="p-0">
                <Typography className="flex gap-1 text-xs text-muted-foreground">
                  <span
                    style={{
                      color: userStory.status_extra_info?.color || "#70728F",
                    }}
                  >
                    {userStory.status_extra_info?.name || "New"}
                  </span>
                  <span>•</span>
                  <span className="font-medium">
                    {userStory.is_closed ? "Closed" : "Open"}
                  </span>
                </Typography>
              </CardContent>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>
                Created:{" "}
                {userStory.created_date
                  ? formatDate(userStory.created_date)
                  : "N/A"}
              </span>
              <span>•</span>
              <span>
                Modified:{" "}
                {userStory.modified_date
                  ? formatDate(userStory.modified_date)
                  : "N/A"}
              </span>
              <span>•</span>
              <span>
                Due:{" "}
                {userStory.due_date
                  ? formatDate(userStory.due_date)
                  : "Not available"}
              </span>
            </div>

            {userStory.owner_extra_info && (
              <div className="mt-2 flex items-center gap-2">
                <Avatar className="h-6 w-6 rounded-full">
                  <AvatarImage
                    src={userStory.owner_extra_info.photo || undefined}
                    alt={userStory.owner_extra_info.full_name_display}
                  />
                  <AvatarFallback>
                    {getInitials(userStory.owner_extra_info.full_name_display)}
                  </AvatarFallback>
                </Avatar>
                <Typography size="xs" className="text-primary">
                  by {userStory.owner_extra_info.full_name_display}
                </Typography>
              </div>
            )}

            <div className="prose mt-6 mb-6">
              {userStory.description || "No description available"}
            </div>

            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-primary text-2xl font-semibold tracking-tight scroll-m-20">
                  Tasks ({taskCount})
                </p>

                <Button className="inline-flex items-center justify-center gap-2">
                  <Plus />
                  Create Task
                </Button>
              </div>

              {tasks.length === 0 ? (
                <div className="rounded-md bg-muted/50 p-6 text-center">
                  <p className="text-primary leading-7 scroll-m-20">
                    No tasks found for this user story
                  </p>
                  <p className="text-primary scroll-m-20 mt-1 muted text-sm">
                    Click the &#34;Create Task&#34; button to add your first
                    task
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <Card key={task.id}>
                      <CardHeader className="pb-0">
                        <div className="flex items-center gap-2">
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-md"
                            style={{
                              backgroundColor:
                                task.status_extra_info?.color || "#70728F",
                            }}
                          >
                            <Typography className="font-bold text-white">
                              #{task.ref}
                            </Typography>
                          </div>
                          <div>
                            <CardTitle className="line-clamp-1">
                              {task.subject}
                            </CardTitle>
                            <CardContent className="p-0">
                              <Typography className="flex gap-1 text-xs text-muted-foreground">
                                <span
                                  style={{
                                    color:
                                      task.status_extra_info?.color ||
                                      "#70728F",
                                  }}
                                >
                                  {task.status_extra_info?.name || "New"}
                                </span>
                                <span>•</span>
                                <span className="font-medium">
                                  {task.is_closed ? "Closed" : "Open"}
                                </span>
                              </Typography>
                            </CardContent>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mt-2 text-xs text-muted-foreground">
                          <div className="mb-2 grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="font-semibold">Created:</span>{" "}
                              {formatDate(task.created_date)}
                            </div>
                            <div>
                              <span className="font-semibold">Owner:</span>{" "}
                              {task.owner_extra_info?.full_name_display ||
                                "N/A"}
                            </div>
                            <div>
                              <span className="font-semibold">Assigned:</span>{" "}
                              {task.assigned_to_extra_info?.full_name_display ||
                                "Unassigned"}
                            </div>
                            <div>
                              <span className="font-semibold">User Story:</span>{" "}
                              {task.user_story_extra_info?.subject || "N/A"}
                            </div>
                          </div>

                          <div className="mt-4 flex gap-2">
                            <Button
                              className="inline-flex items-center justify-center gap-2"
                              size="sm"
                            >
                              <Pencil className="size-4" />
                            </Button>
                            <Button
                              className="inline-flex items-center justify-center gap-2"
                              size="sm"
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
