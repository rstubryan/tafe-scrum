"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Typography } from "@/components/atoms/typography/typography";
import { PaginationLayout } from "@/components/templates/layout/pagination-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  CalendarClock,
  CheckSquare,
  Eye,
  Pencil,
  Plus,
  Users,
} from "lucide-react";
import { useGetSprintById } from "@/api/sprint/queries";
import SprintDialog from "@/components/organisms/sprint/sprint-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UserStoryProps } from "@/api/backlog-us/type";
import SlugSprintDialog from "@/components/organisms/slug-content/sprint/slug-sprint-dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils";
import { getInitials } from "@/utils/avatar-initials";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Unlink } from "lucide-react";
import { useDeleteAssociateUserStoriesFromSprint } from "@/api/backlog-us/mutation";
import { useGetProjectBySlug } from "@/api/project/queries";

export default function SlugSprintContent() {
  const params = useParams();
  const slug = params.slug as string;
  const sprintId = params.id as string;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: sprint, isLoading: isLoadingSprint } =
    useGetSprintById(sprintId);
  const { data: project } = useGetProjectBySlug(slug);
  const { mutate: unlinkUserStoryFromSprint } =
    useDeleteAssociateUserStoriesFromSprint();

  const handleUnlinkUserStory = (storyId?: number) => {
    if (!storyId || !project?.id) return;

    unlinkUserStoryFromSprint({
      projectId: parseInt(project.id.toString()),
      userStoryIds: [storyId],
    });
  };

  const userStoriesArray = sprint?.user_stories || [];
  const userStoriesCount = userStoriesArray.length;

  const paginatedStories = userStoriesArray.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(userStoriesCount / itemsPerPage);

  useEffect(() => {
    if (sprint?.user_stories) {
      setCurrentPage(1);
    }
  }, [sprint?.user_stories]);

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
                    <div className="text-lg font-normal text-muted-foreground">
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
          </CardContent>
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {paginatedStories.map((story: UserStoryProps) => (
              <Card key={story.id} className="flex h-full flex-col">
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-md"
                        style={{
                          backgroundColor:
                            story.status_extra_info?.color || "#70728F",
                        }}
                      >
                        <Typography className="font-bold text-white">
                          #{story.ref}
                        </Typography>
                      </div>
                      <div>
                        <CardTitle className="line-clamp-1">
                          {story.subject}
                        </CardTitle>
                        <CardContent className="p-0">
                          <Typography className="flex gap-1 text-xs text-muted-foreground">
                            <span
                              style={{
                                color:
                                  story.status_extra_info?.color || "#70728F",
                              }}
                            >
                              {story.status_extra_info?.name || "New"}
                            </span>
                            <span>•</span>
                            <span className="font-medium">
                              {story.is_closed ? "Closed" : "Open"}
                            </span>
                          </Typography>
                        </CardContent>
                      </div>
                    </div>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <span className="sr-only">Unlink</span>
                          <Unlink className="size-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Unlink User Story</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove{" "}
                            <span className="font-bold">
                              &quot;{story.subject}&quot;
                            </span>{" "}
                            from this sprint? This will not delete the user
                            story.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleUnlinkUserStory(story.id)}
                          >
                            Unlink
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardHeader>{" "}
                <CardContent className="flex-1">
                  <div className="mt-2 text-xs text-muted-foreground">
                    <div className="flex flex-wrap items-center gap-2">
                      <span>
                        Created:{" "}
                        {story.created_date
                          ? formatDate(story.created_date)
                          : "N/A"}
                      </span>
                      <span>•</span>
                      <span>
                        Modified:{" "}
                        {story.modified_date
                          ? formatDate(story.modified_date)
                          : "N/A"}
                      </span>
                      {story.due_date && (
                        <>
                          <span>•</span>
                          <span>Due: {formatDate(story.due_date)}</span>
                        </>
                      )}
                    </div>

                    {story.owner_extra_info && (
                      <div className="mt-2 flex items-center gap-2">
                        <Avatar className="h-6 w-6 rounded-full">
                          <AvatarImage
                            src={story.owner_extra_info.photo}
                            alt={story.owner_extra_info.full_name_display}
                          />
                          <AvatarFallback>
                            {getInitials(
                              story.owner_extra_info.full_name_display,
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <Typography size="xs" className="text-primary">
                          by {story.owner_extra_info.full_name_display}
                        </Typography>
                      </div>
                    )}

                    <div className="mt-2 flex items-center gap-2">
                      <Typography size="xs" className="text-primary">
                        Assigned to:{" "}
                        {story.assigned_to_extra_info
                          ? story.assigned_to_extra_info.full_name_display
                          : "Unassigned"}
                      </Typography>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1 items-center">
                      <Typography size="xs" className="text-primary mr-1">
                        Tags:
                      </Typography>
                      <div className="flex flex-wrap gap-1">
                        {story.tags && story.tags.length > 0 ? (
                          story.tags.map((tag, index) => (
                            <Badge key={index} className="text-xs">
                              {Array.isArray(tag) ? tag[0] : String(tag)}
                            </Badge>
                          ))
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            No tags available
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/dashboard/projects/${slug}/backlogs/${story.ref}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-3 py-2"
                  >
                    <Eye className="size-4 shrink-0" />
                    <span className="truncate">View Details</span>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-6">
            <PaginationLayout
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
