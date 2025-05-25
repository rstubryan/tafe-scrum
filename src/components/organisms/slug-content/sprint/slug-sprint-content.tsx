"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/atoms/typography/typography";
import { formatDate } from "@/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CalendarClock, CheckSquare, Pencil, Plus, Users } from "lucide-react";
import { useGetSprintById } from "@/api/sprint/queries";
import SprintDialog from "@/components/organisms/sprint/sprint-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UserStoryProps } from "@/api/backlog-us/type";
import SlugSprintDialog from "@/components/organisms/slug-content/sprint/slug-sprint-dialog";

export default function SlugSprintContent() {
  const params = useParams();
  const sprintId = params.id as string;

  const { data: sprint, isLoading: isLoadingSprint } =
    useGetSprintById(sprintId);

  if (isLoadingSprint) {
    return (
      <div className="flex items-center justify-center h-40">
        <Typography>Loading sprint details...</Typography>
      </div>
    );
  }

  if (!sprint) {
    return (
      <div className="flex items-center justify-center h-40">
        <Typography>Sprint not found</Typography>
      </div>
    );
  }

  const calculateDuration = () => {
    if (!sprint.estimated_start || !sprint.estimated_finish)
      return { days: "N/A", weeks: "N/A" };

    const start = new Date(sprint.estimated_start);
    const finish = new Date(sprint.estimated_finish);
    const diffTime = Math.abs(finish.getTime() - start.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);

    return { days, weeks };
  };

  const userStoriesCount = sprint.user_stories?.length || 0;

  return (
    <div className="grid gap-6 my-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
                <Typography className="font-bold text-secondary">
                  #{sprint.id}
                </Typography>
              </div>
              <div>
                <CardTitle className="line-clamp-1">{sprint.name}</CardTitle>
                <CardContent className="p-0">
                  <Typography className="flex gap-1 text-xs text-muted-foreground">
                    <span className="font-medium">
                      {sprint.project_extra_info?.name}
                    </span>
                    <span>•</span>
                    <span
                      className={
                        sprint.closed ? "text-red-500" : "text-green-500"
                      }
                    >
                      {sprint.closed ? "Closed" : "Active"}
                    </span>
                  </Typography>
                </CardContent>
              </div>
            </div>
            <SprintDialog
              mode="edit"
              sprint={sprint}
              trigger={
                <Button variant="outline" size="sm">
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              }
            />
          </div>
        </CardHeader>

        <CardContent>
          <div className="text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>
                Created:{" "}
                {sprint.created_date ? formatDate(sprint.created_date) : "N/A"}
              </span>
              <span>•</span>
              <span>
                Modified:{" "}
                {sprint.modified_date
                  ? formatDate(sprint.modified_date)
                  : "N/A"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Duration Card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Sprint Duration</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <div className="text-3xl font-bold">
                {typeof calculateDuration().days === "number" ? (
                  <>
                    {calculateDuration().days} Days
                    <div className="text-lg font-nor mal text-muted-foreground">
                      ({calculateDuration().weeks}{" "}
                      {calculateDuration().weeks === 1 ? "Week" : "Weeks"})
                    </div>
                  </>
                ) : (
                  "N/A"
                )}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                <div>
                  Start:{" "}
                  {sprint.estimated_start
                    ? formatDate(sprint.estimated_start)
                    : "N/A"}
                </div>
                <div>
                  End:{" "}
                  {sprint.estimated_finish
                    ? formatDate(sprint.estimated_finish)
                    : "N/A"}
                </div>
              </div>
            </div>
          </CardContent>{" "}
        </Card>

        {/* User Stories Card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">User Stories</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <div className="text-3xl font-bold">{userStoriesCount}</div>
            </div>
          </CardContent>
        </Card>

        {/* Sprint Details Card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Sprint Details</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span
                  className={sprint.closed ? "text-red-500" : "text-green-500"}
                >
                  {sprint.closed ? "Closed" : "Active"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sprint #:</span>
                <span>{sprint.order}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-2" />

      {/* User Stories Associated with Sprint */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <Typography size="h3">User Stories</Typography>
          <SlugSprintDialog
            sprint={sprint}
            trigger={
              <Button variant="outline" size="sm">
                <Plus size={16} />
                Associate User Stories
              </Button>
            }
          />
        </div>

        {userStoriesCount === 0 ? (
          <Alert>
            <AlertTitle>No user stories found</AlertTitle>
            <AlertDescription>
              This sprint doesn&#39;t have any user stories assigned to it yet.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sprint.user_stories?.map((story: UserStoryProps) => (
              <Card key={story.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary">
                      <Typography className="font-bold text-primary">
                        #{story.ref}
                      </Typography>
                    </div>
                    <CardTitle className="line-clamp-1 text-base">
                      {story.subject}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    <div className="flex justify-between mb-2">
                      <span>
                        Status: {story.status_extra_info?.name || "New"}
                      </span>
                      <span
                        className={
                          story.is_closed ? "text-red-500" : "text-green-500"
                        }
                      >
                        {story.is_closed ? "Closed" : "Open"}
                      </span>
                    </div>
                    {story.due_date && (
                      <div>Due date: {formatDate(story.due_date)}</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
